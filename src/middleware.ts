import { type NextMiddleware, type NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

import { validateAndRenewSession } from './lib/auth/middleware'
import { logger } from './lib/logger'

const AUTH_SECRET = process.env.AUTH_SECRET!
const SECURE_COOKIE = process.env.NEXTAUTH_URL?.startsWith('https://')
const SESSION_COOKIE = SECURE_COOKIE ? '__Secure-authjs.session-token' : 'authjs.session-token'

export const config = {
  matcher: [
    // Skip static files and internals
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

export const middleware: NextMiddleware = async (request: NextRequest) => {
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname

  // Debug header
  response.headers.set('x-url', request.url)

  if (process.env.AUTH_ENABLED === 'true') {
    if (pathname.startsWith('/api/auth/') || pathname.startsWith('/api/health')) {
      return response
    }

    const token = await getToken({
      req: request,
      secret: AUTH_SECRET,
      secureCookie: SECURE_COOKIE,
      salt: SESSION_COOKIE,
    })

    if (!token && !pathname.includes('/start')) {
      logger.info(`No session. Redirecting to /start from ${pathname}`)
      return NextResponse.redirect(new URL('/start', request.url))
    }

    return await validateAndRenewSession(request, response)
  }

  return response
}
