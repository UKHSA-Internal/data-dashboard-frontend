import { type NextMiddleware, type NextRequest, NextResponse } from 'next/server'
import { encode, getToken, type JWT } from 'next-auth/jwt'

let isRefreshing = false

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  if (isRefreshing) {
    console.log('🔁 Already refreshing; returning existing token.')
    return token
  }

  const timeInSeconds = Math.floor(Date.now() / 1000)
  isRefreshing = true

  try {
    console.log('🔄 Refreshing access token via endpoint:', `${process.env.AUTH_DOMAIN}/oauth2/token`)

    // Log current token expiry (human-readable)
    if (token.expires_at) {
      console.log(
        `🕗 Current token expiry: ${token.expires_at} (unix:seconds) =>`,
        new Date(token.expires_at * 1000).toUTCString()
      )
    }

    const response = await fetch(`${process.env.AUTH_DOMAIN}/oauth2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.AUTH_CLIENT_ID!,
        client_secret: process.env.AUTH_CLIENT_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: token?.refresh_token ?? '',
      }),
    })

    const tokensOrError = await response.json()
    if (!response.ok) {
      console.log('❌ Error response from token endpoint:', tokensOrError)
      throw new Error(`Token refresh failed with status: ${response.status}`)
    }

    // Calculate new expiry in seconds
    const newExpiresAt = tokensOrError?.expires_in + timeInSeconds
    console.log(
      '🕗 New expires_in:',
      tokensOrError?.expires_in,
      'seconds => newExpiresAt:',
      newExpiresAt,
      '=>',
      new Date(newExpiresAt * 1000).toUTCString()
    )

    const newToken = {
      ...token,
      access_token: tokensOrError?.access_token ?? token?.access_token,
      expires_at: newExpiresAt,
      refresh_token: tokensOrError?.refresh_token ?? token?.refresh_token,
    }

    // Log final token info
    console.log('✅ Token refreshed successfully!', {
      old_exp: token.expires_at,
      old_exp_readable: token.expires_at ? new Date(token.expires_at * 1000).toUTCString() : undefined,
      new_exp: newToken.expires_at,
      new_exp_readable: new Date(newToken.expires_at * 1000).toUTCString(),
    })

    return newToken
  } catch (e) {
    console.error('Error refreshing token in middleware:', e)
  } finally {
    isRefreshing = false
  }

  // If something goes wrong, return the old token so we at least have something
  return token
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}

const SECURE_COOKIE = process.env.NEXTAUTH_URL?.startsWith('https://')
const SESSION_COOKIE = SECURE_COOKIE ? '__Secure-authjs.session-token' : 'authjs.session-token'
const SIGNIN_SUB_URL = '/api/auth/signin'
const TOKEN_REFRESH_BUFFER_SECONDS = 30

function signOut(request: NextRequest) {
  const response = NextResponse.redirect(new URL(SIGNIN_SUB_URL, request.url))

  request.cookies.getAll().forEach((cookie) => {
    if (cookie.name.includes('authjs.session-token')) {
      response.cookies.delete(cookie.name)
    }
  })

  return response
}

function shouldUpdateToken(token: JWT) {
  const timeInSeconds = Math.floor(Date.now() / 1000)
  const isExpiring = token?.expires_at && timeInSeconds >= token.expires_at - TOKEN_REFRESH_BUFFER_SECONDS

  console.log(
    '🔔 Should Update ??',
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
export const middleware: NextMiddleware = async (request: NextRequest) => {
  if (process.env.AUTH_ENABLED !== 'true') {
    return NextResponse.next()
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET!,
    secureCookie: SECURE_COOKIE,
    salt: SESSION_COOKIE,
  })

  if (!token) return signOut(request)

  // Add x-url header for debugging or legacy usage
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', request.url)
  const response = NextResponse.next({ request: { headers: requestHeaders } })

  if (shouldUpdateToken(token)) {
    console.log('♻️ Token is expiring soon - refreshing...')
    const newToken = await refreshAccessToken(token)

    // Log the old vs new token expiry (human readable)
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
      secret: process.env.AUTH_SECRET as string,
      token: {
        ...token,
        ...newToken,
        exp: newToken.expires_at, // keep exp in sync
      },
      maxAge: 30 * 24 * 60 * 60, // e.g. 30 days
    })

    // We'll chunk the token in pieces if it's large
    const size = 3933
    const regex = new RegExp('.{1,' + size + '}', 'g')
    const tokenChunks = newSessionToken.match(regex)

    if (tokenChunks) {
      tokenChunks.forEach((tokenChunk, index) => {
        response.cookies.set(`${SESSION_COOKIE}.${index}`, tokenChunk)
      })
    }
  }

  return response
}
