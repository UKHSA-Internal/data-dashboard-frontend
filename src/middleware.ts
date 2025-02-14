import { type NextMiddleware, type NextRequest, NextResponse } from 'next/server'

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

  // Add x-url header for debugging or legacy usage
  response.headers.set('x-url', request.url)

  if (process.env.AUTH_ENABLED === 'true') {
    return await validateAndRenewSession(request, response)
  }

  return response
}
