import { NextRequest, NextResponse } from 'next/server'
import { getToken, type JWT } from 'next-auth/jwt'
import { encode } from 'next-auth/jwt' // Ensure this is imported if needed for encoding tokens

import { refreshAccessToken } from '@/api/requests/auth/refreshAccessToken'
import { signOut } from '@/api/requests/auth/signOut'

const AUTH_SECRET = process.env.AUTH_SECRET!
const SECURE_COOKIE = process.env.NEXTAUTH_URL?.startsWith('https://')
const SESSION_COOKIE = SECURE_COOKIE ? '__Secure-authjs.session-token' : 'authjs.session-token'
const TOKEN_REFRESH_BUFFER_SECONDS = 30

function shouldUpdateToken(token: JWT) {
  const timeInSeconds = Math.floor(Date.now() / 1000)
  const isExpiring = token?.expires_at && timeInSeconds >= token.expires_at - TOKEN_REFRESH_BUFFER_SECONDS

  console.log(
    '🔔 Access Token needs updating ?',
    isExpiring,
    '=> Now:',
    timeInSeconds,
    '(',
    new Date(timeInSeconds * 1000).toUTCString(),
    ')',
    'expires_at:',
    token.expires_at,
    '(',
    token.expires_at ? new Date(token.expires_at * 1000).toUTCString() : 'N/A',
    ')'
  )

  return isExpiring
}

// https://github.com/nextauthjs/next-auth/issues/8254#issuecomment-1690474377
export async function validateAndRenewSession(req: NextRequest, res: NextResponse) {
  // Filter out next-auth API requests
  if (req.nextUrl.pathname.startsWith('/api/auth/')) {
    return res
  }

  const token = await getToken({
    req,
    secret: AUTH_SECRET,
    secureCookie: SECURE_COOKIE,
    salt: SESSION_COOKIE,
  })

  if (!token) {
    await signOut()
    return res
  }

  if (shouldUpdateToken(token)) {
    console.log('♻️ Token is expiring soon - refreshing...')
    const newToken = await refreshAccessToken(token)

    console.log('⚠️ Old expiry:', {
      old_exp: token.expires_at,
      old_exp_hr: token.expires_at ? new Date(token.expires_at * 1000).toUTCString() : undefined,
    })

    console.log('✅ New expiry:', {
      new_exp: newToken.expires_at,
      new_exp_hr: new Date(newToken.expires_at! * 1000).toUTCString(),
    })

    const newSessionToken = await encode({
      salt: SESSION_COOKIE,
      secret: AUTH_SECRET,
      token: {
        ...token,
        ...newToken,
        exp: newToken.expires_at,
      },
    })

    console.log('🔑 New Session Token:', newSessionToken)

    // Store token in cookies
    res.headers.set('Set-Cookie', `${SESSION_COOKIE}=${newSessionToken}; Path=/; HttpOnly; Secure; SameSite=Lax;`)

    console.log('✅ Cookie Set:', res.headers.get('Set-Cookie'))

    // Handle large tokens by splitting into chunks if needed
    const CHUNK_SIZE = 3000
    const chunks = newSessionToken.match(new RegExp(`.{1,${CHUNK_SIZE}}`, 'g'))

    if (chunks) {
      console.log(`🔹 Storing token in ${chunks.length} chunks`)
      chunks.forEach((chunk, index) => {
        res.cookies.set(`${SESSION_COOKIE}.${index}`, chunk, {
          httpOnly: true,
          secure: SECURE_COOKIE,
          sameSite: 'lax',
          path: '/',
        })
      })
    }

    console.log('✅ Token chunks stored in cookies.')

    return res
  }

  return res
}
