import { NextRequest, NextResponse } from 'next/server'
import { getToken, type JWT } from 'next-auth/jwt'
import { encode } from 'next-auth/jwt'

import { refreshAccessToken } from '@/api/requests/auth/refreshAccessToken'

const AUTH_SECRET = process.env.AUTH_SECRET!
const SECURE_COOKIE = process.env.NEXTAUTH_URL?.startsWith('https://')
const SESSION_COOKIE = SECURE_COOKIE ? '__Secure-authjs.session-token' : 'authjs.session-token'
const TOKEN_REFRESH_BUFFER_SECONDS = 30

function shouldUpdateToken(token: JWT) {
  const timeInSeconds = Math.floor(Date.now() / 1000)
  const isExpiring = token?.expires_at && timeInSeconds >= token.expires_at - TOKEN_REFRESH_BUFFER_SECONDS
  return isExpiring
}

// https://github.com/nextauthjs/next-auth/issues/8254#issuecomment-1690474377
export async function validateAndRenewSession(req: NextRequest, res: NextResponse) {
  const token = await getToken({
    req,
    secret: AUTH_SECRET,
    secureCookie: SECURE_COOKIE,
    salt: SESSION_COOKIE,
  })

  if (!token) {
    // await signOut()
    return res
  }

  if (shouldUpdateToken(token)) {
    const newToken = await refreshAccessToken(token)

    const newSessionToken = await encode({
      salt: SESSION_COOKIE,
      secret: AUTH_SECRET,
      token: {
        ...token,
        ...newToken,
        exp: newToken.expires_at,
      },
    })

    // Store token in cookies
    res.headers.set('Set-Cookie', `${SESSION_COOKIE}=${newSessionToken}; Path=/; HttpOnly; Secure; SameSite=Lax;`)

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

    return res
  }

  return res
}
