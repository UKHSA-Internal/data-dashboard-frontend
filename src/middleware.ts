import { type NextMiddleware, type NextRequest, NextResponse } from 'next/server'

import { auth } from './auth'
import { validateAndRenewSession } from './lib/auth/middleware'

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

export const middleware: NextMiddleware = async (request: NextRequest) => {
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname

  // Add x-url header for debugging or legacy usage
  response.headers.set('x-url', request.url)

  if (process.env.AUTH_ENABLED === 'true') {
    // Filter out next-auth API requests
    if (request.nextUrl.pathname.startsWith('/api/auth/')) {
      return response
    }

    // Ensure the health check endpoint is always reachable
    if (request.nextUrl.pathname.startsWith('/api/health/')) {
      return response
    }

    const token = await auth()
    if (!token && !pathname.includes('/start')) {
      return NextResponse.redirect(new URL('/start', request.url))
    }
    return await validateAndRenewSession(request, response)
  }

  return response
}
