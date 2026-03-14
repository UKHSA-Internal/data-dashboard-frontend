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
  // PREVIEW ROUTES
  if (request.nextUrl.pathname === '/preview') {
    const pagePreviewsEnabled = process.env.PAGE_PREVIEWS_ENABLED === 'true'
    if (!pagePreviewsEnabled) {
      return NextResponse.json(
        {
          message:
            'Preview mode is disabled on this server.  Please contact your site administrator for more information.',
        },
        { status: 400 } // Bad Request, since the client is trying to access a valid route but previews are disabled
      )
    }

    const slug = request.nextUrl.searchParams.get('slug')
    const token = request.nextUrl.searchParams.get('t')

    if (!slug || !token) {
      return NextResponse.json({ message: 'Missing required preview params: slug and t' }, { status: 400 })
    }

    // Capture query params for downchain use (e.g. in getPageBySlug) by storing them in a cookie,
    // This is is the 'least touch' way to get this data down to where it's needed
    // without refactoring the entire page-rendering interface
    const queryStringParams: Record<string, string | undefined> = {}
    request.nextUrl.searchParams.forEach((value, key) => {
      queryStringParams[key] = value
    })
    queryStringParams['isPreview'] = 'true'

    // Normalize the slug to ensure consistent formatting
    // (e.g. remove extra slashes, trim whitespace)
    const normalizedSlug = slug
      .split('/')
      .map((segment) => segment.trim())
      .filter(Boolean)
      .map((segment) => encodeURIComponent(segment))
      .join('/')

    // Validate the normalized slug is non-empty
    if (!normalizedSlug) {
      return NextResponse.json(
        { message: 'Preview slug must contain at least one non-empty path segment' },
        { status: 400 }
      )
    }

    // Rewrite to the normalized slug path, which will trigger the normal page rendering flow
    // The presence of the isPreview param in the cookie will signal to getPageBySlug
    // to fetch the draft version of the page using the provided token
    const rewriteUrl = new URL(`/preview/${normalizedSlug}`, request.url)
    const response = NextResponse.rewrite(rewriteUrl)

    // Set the query params in a cookie for downchain use
    // in getPageBySlug and other functions
    // that need to know we're in preview mode
    response.cookies.set({
      name: 'queryStringParams',
      value: encodeURIComponent(JSON.stringify(queryStringParams)),
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
    })

    response.headers.set('x-url', request.url)

    return response
  }

  // NON-PREVIEW ROUTES
  // Default response for non-preview requests
  let response = NextResponse.next()
  response.headers.set('x-url', request.url)
  // Ensure isPreview is false for published pages.
  // This MUST be set for each request because the same client
  // may be used to access both preview and non-preview pages,
  // and we don't want stale preview params affecting non-preview page rendering
  response.cookies.set({
    name: 'queryStringParams',
    value: encodeURIComponent(JSON.stringify({ isPreview: 'false' })),
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
  })

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
