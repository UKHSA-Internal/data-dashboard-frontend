import { NextRequest, NextResponse } from 'next/server'
import { encode, getToken, type JWT } from 'next-auth/jwt'

import { refreshAccessToken } from '@/api/requests/auth/refreshAccessToken'
import { logger } from '@/lib/logger'

const AUTH_SECRET = process.env.AUTH_SECRET!
const SECURE_COOKIE = process.env.NEXTAUTH_URL?.startsWith('https://')
const SESSION_COOKIE = SECURE_COOKIE ? '__Secure-authjs.session-token' : 'authjs.session-token'
const TOKEN_REFRESH_BUFFER_SECONDS = 30

function shouldUpdateToken(token: JWT) {
  const timeInSeconds = Math.floor(Date.now() / 1000)
  return token?.expires_at && timeInSeconds >= token.expires_at - TOKEN_REFRESH_BUFFER_SECONDS
}

export async function validateAndRenewSession(req: NextRequest, res: NextResponse) {
  const token = await getToken({
    req,
    secret: AUTH_SECRET,
    secureCookie: SECURE_COOKIE,
    salt: SESSION_COOKIE,
  })

  if (!token) return res

  if (shouldUpdateToken(token)) {
    logger.info(`Token is expiring soon (exp: ${token.expires_at}); triggering refresh.`)

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

    // Store token in cookie
    res.cookies.set(SESSION_COOKIE, newSessionToken, {
      httpOnly: true,
      secure: SECURE_COOKIE,
      sameSite: 'lax',
      path: '/',
    })

    // Chunking for large cookie support
    const CHUNK_SIZE = 3000
    const chunks = newSessionToken.match(new RegExp(`.{1,${CHUNK_SIZE}}`, 'g'))

    if (chunks && chunks.length > 1) {
      logger.info(`Storing token in ${chunks.length} chunks`)
      chunks.forEach((chunk, index) => {
        res.cookies.set(`${SESSION_COOKIE}.${index}`, chunk, {
          httpOnly: true,
          secure: SECURE_COOKIE,
          sameSite: 'lax',
          path: '/',
        })
      })
    }
  }

  return res
}
