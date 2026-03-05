import { notFound } from 'next/navigation'
import { type NextMiddleware, type NextRequest, NextResponse } from 'next/server'

import { getPages } from './api/requests/cms/getPages'
import { getPageBySlug } from './api/requests/getPageBySlug'
import { validateAndRenewSession } from './lib/auth/middleware'
import { logger } from './lib/logger'

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

export const middleware: NextMiddleware = async (request: NextRequest) => {
  let response = NextResponse.next()
  // const pathname = request.nextUrl.pathname

  // Rewrite /preview requests into the catch-all CMS route so draft pages can be
  // resolved using query-provided slug/token without exposing a separate preview page.
  if (request.nextUrl.pathname === '/preview') {
    const slug = request.nextUrl.searchParams.get('slug')
    const token = request.nextUrl.searchParams.get('t')

    if (!slug || !token) {
      return NextResponse.json(
        {
          message: 'Missing required preview params: slug and t',
        },
        { status: 400 }
      )
    }

    const normalizedSlug = slug
      .split('/')
      .map((segment) => segment.trim())
      .filter(Boolean)
      .map((segment) => encodeURIComponent(segment))
      .join('/')

    if (!normalizedSlug) {
      return NextResponse.json(
        {
          message: 'Preview slug must contain at least one non-empty path segment',
        },
        { status: 400 }
      )
    }

    const rewriteUrl = new URL(`/${normalizedSlug}`, request.url)

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-cms-draft-token', token)
    requestHeaders.set('x-cms-cache-bypass', 'true')

    return NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    })
  }

  // Add x-url header for debugging or legacy usage
  response.headers.set('x-url', request.url)
  // Handle auth first if enabled
  if (process.env.AUTH_ENABLED === 'true') {
    const unauthenticatedPaths = ['/api/health', '/robots.txt']

    if (unauthenticatedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
      return response
    }

    try {
      // const token = await auth()
      // const excludePaths = ['/start', '/auth/error', '/auth/signin', '/auth/signout']

      // Uncomment to force redirect to the start page.
      // Check if the pathname is in the exclude list
      // if (!token && !excludePaths.some((path) => pathname.includes(path))) {
      //   return NextResponse.redirect(new URL('/start', request.url))
      // }
      response = await validateAndRenewSession(request, response)
    } catch (error) {
      logger.error('Auth middleware error:', error)
      return NextResponse.redirect(new URL('/start', request.url))
    }
  }

  // Access our data redirects
  if (request.nextUrl.pathname === '/access-our-data') {
    try {
      const { id } = await getPageBySlug('access-our-data')

      const pages = await getPages({ child_of: id.toString() })

      if (pages.success) {
        // Extract first child page as the page to redirect to
        const {
          data: {
            items: [
              {
                meta: { slug },
              },
            ],
          },
        } = pages

        return NextResponse.rewrite(new URL(`/access-our-data/${slug}`, request.url))
      }
      notFound()
    } catch (error) {
      logger.error('Access our data middleware error:', error)
      notFound()
    }
  }

  return response
}
