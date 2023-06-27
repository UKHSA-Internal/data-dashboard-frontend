import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const config = {
  matcher: '/charts/:path*',
}

/**
 * Middleware to proxy chart requests to the backend along with the secret token header
 */
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('Authorization', process.env.API_KEY ?? '')

  request.nextUrl.href = `${process.env.API_URL}${request.nextUrl.pathname}`

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  })
}
