import { type NextMiddleware, type NextRequest, NextResponse } from 'next/server'
import { encode, getToken, type JWT } from 'next-auth/jwt'
import { z } from 'zod'

const wellKnownEndpointsSchema = z.object({
  token_endpoint: z.string(),
  revocation_endpoint: z.string(),
})

let isRefreshing = false

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  if (isRefreshing) {
    return token
  }

  const timeInSeconds = Math.floor(Date.now() / 1000)
  isRefreshing = true

  try {
    console.log('⏳ Fetching OIDC well-known endpoints...')
    const wkeResponse = await fetch(`${process.env.AUTH_CLIENT_URL}/.well-known/openid-configuration`)
    const { token_endpoint: tokenEndpoint } = await wellKnownEndpointsSchema.parse(await wkeResponse.json())
    console.log('🔄 Refreshing access token via endpoint:', tokenEndpoint)

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.AUTH_CLIENT_ID!,
        client_secret: process.env.AUTH_CLIENT_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: token?.refresh_token!,
      }),
    })

    const tokensOrError = await response.json()
    if (!response.ok) {
      console.log('❌ Error')
      throw new Error(`Token refresh failed with status: ${response.status}`)
    }

    return {
      ...token,
      access_token: tokensOrError?.access_token ?? token?.access_token,
      expires_at: tokensOrError?.expires_in + timeInSeconds,
      refresh_token: tokensOrError?.refresh_token ?? token?.refresh_token,
    }
  } catch (e) {
    console.error('Error refreshing token in middleware:', e)
  } finally {
    isRefreshing = false
  }

  return token
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}

const SECURE_COOKIE = process.env.NEXTAUTH_URL?.startsWith('https://')
const SESSION_COOKIE = SECURE_COOKIE ? '__Secure-authjs.session-token' : 'authjs.session-token'
const SESSION_TIMEOUT = 5 * 60 // 5 minutes (in seconds)
const SIGNIN_SUB_URL = '/api/auth/'
const TOKEN_REFRESH_BUFFER_SECONDS = 30 // 30 seconds

function signOut(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/api/auth/signin', request.url))

  request.cookies.getAll().forEach((cookie) => {
    if (cookie.name.includes('authjs.session-token')) response.cookies.delete(cookie.name)
  })

  return response
}

function shouldUpdateToken(token: JWT) {
  const timeInSeconds = Math.floor(Date.now() / 1000)
  console.log('⁇ Should Update ??', timeInSeconds >= token?.expires_at - TOKEN_REFRESH_BUFFER_SECONDS)
  return timeInSeconds >= token?.expires_at - TOKEN_REFRESH_BUFFER_SECONDS
}

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

  // TODO: Refactor this x-url legacy hack out
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', request.url)
  const response = NextResponse.next({ request: { headers: requestHeaders } })

  if (shouldUpdateToken(token)) {
    const newToken = await refreshAccessToken(token)

    const newSessionToken = await encode({
      salt: SESSION_COOKIE,
      secret: process.env.AUTH_SECRET as string,
      token: {
        ...token,
        ...newToken,
        exp: newToken.exp,
      },
      maxAge: 30 * 24 * 60 * 60, // TODO: Constant
    })

    const size = 3933 // maximum size of each chunk
    const regex = new RegExp('.{1,' + size + '}', 'g')

    // split the string into an array of strings
    const tokenChunks = newSessionToken.match(regex)

    if (tokenChunks) {
      tokenChunks.forEach((tokenChunk, index) => {
        response.cookies.set(`${SESSION_COOKIE}.${index}`, tokenChunk)
      })
    }
  }

  return response
}
