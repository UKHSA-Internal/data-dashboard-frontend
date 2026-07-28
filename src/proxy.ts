import { notFound } from 'next/navigation'
import { connection } from 'next/server'
import { type NextProxy, NextRequest, NextResponse } from 'next/server'

import { getPages } from './api/requests/cms/getPages'
import { getPageBySlug } from './api/requests/getPageBySlug'
import { pagePreviewsEnabled } from './config/constants'
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

// Each step must return a StepResult
// which defines whether the middleware
// should continue further processing ('continue')
//  or return the response ('done')
export interface StepResult {
  response: NextResponse
  action: 'continue' | 'done'
}

// Type definition for a middleware step
export type Step = (request: NextRequest, response: NextResponse) => Promise<StepResult>

// Helper to rewrite response url
// While rewriting x-url header for downchain steps
// Also, it preserves response headers and cookies already set
// Always call the helper rather than just NextResponse.rewrite(url)
export function rewriteUrl(response: NextResponse, url: URL): NextResponse {
  const rewriteResponse = NextResponse.rewrite(url)

  // clone cookies
  response.cookies.getAll().forEach((cookie) => {
    const { name, value, ...options } = cookie
    rewriteResponse.cookies.set(name, value, options)
  })

  // clone only x-* headers
  response.headers.forEach((value, key) => {
    if (key.startsWith('x-')) {
      rewriteResponse.headers.set(key, value)
    }
  })

  // rewrite the x-url header for downchain use
  rewriteResponse.headers.set('x-url', url.toString())

  return rewriteResponse
}

export function setNoCacheHeaders(response: NextResponse): NextResponse {
  // Signal to downstream systems
  // (CloudFront, browsers if bypassing CDN)
  // that this response must not be cached
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  return response
}

export function resolvePath(request: NextRequest, response: Response): string {
  const headerValue = response.headers.get('x-url')

  if (!headerValue) {
    return request.nextUrl.pathname
  }

  try {
    return new URL(headerValue, request.url).pathname
  } catch {
    return request.nextUrl.pathname
  }
}

export async function processNoCacheRoute(request: NextRequest, response: NextResponse): Promise<StepResult> {
  // exit if not a preview request path
  const resolvedPath = resolvePath(request, response)
  if (!resolvedPath.startsWith('/nocache')) {
    return {
      response: response,
      action: 'continue',
    }
  }

  response = setNoCacheHeaders(response)

  const token = request.nextUrl.searchParams.get('t')

  if (!token) {
    return {
      response: NextResponse.json({ message: 'Missing required preview param: t' }, { status: 400 }),
      action: 'done',
    }
  }

  response.cookies.set({
    name: 'cmsAuthToken',
    value: token,
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: process.env.PAGE_PREVIEWS_CMS_AUTH_TOKEN_TTL ? Number(process.env.PAGE_PREVIEWS_CMS_AUTH_TOKEN_TTL) : 30,
  })

  return {
    response: response,
    action: 'continue',
  }
}

export async function processPreviewRoute(request: NextRequest, response: NextResponse): Promise<StepResult> {
  // exit if not a preview request path
  const resolvedPath = resolvePath(request, response)
  if (!resolvedPath.startsWith('/preview')) {
    return {
      response: response,
      action: 'continue',
    }
  }

  // error if previews not enabled for this server instance
  if (!pagePreviewsEnabled) {
    return {
      response: NextResponse.json(
        {
          message:
            'Preview mode is disabled on this server.  Please contact your site administrator for more information.',
        },
        { status: 400 } // Bad Request, since the client is trying to access a valid route but previews are disabled
      ),
      action: 'done',
    }
  }

  // validate preview params
  const token = request.nextUrl.searchParams.get('t')

  if (!token) {
    return {
      response: NextResponse.json({ message: 'Missing required preview param: t' }, { status: 400 }),
      action: 'done',
    }
  }

  // set the query params in a cookie for downchain use
  response.cookies.set({
    name: 'path',
    value: resolvedPath,
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
  })

  response.cookies.set({
    name: 'cmsAuthToken',
    value: token,
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: process.env.PAGE_PREVIEWS_CMS_AUTH_TOKEN_TTL ? Number(process.env.PAGE_PREVIEWS_CMS_AUTH_TOKEN_TTL) : 30,
  })

  response = setNoCacheHeaders(response)

  return {
    response: response,
    action: 'continue',
  }
}

export async function processAccessOurData(request: NextRequest, response: NextResponse): Promise<StepResult> {
  // if this is a preview route, skip this step
  // if this slug is not 'access-our-data', skip this step
  if (!request.nextUrl.pathname.endsWith('access-our-data') || resolvePath(request, response).startsWith('/preview')) {
    return {
      response: response,
      action: 'continue',
    }
  }

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

      const rewriteResponse = rewriteUrl(
        response,
        new URL(`${request.nextUrl.pathname.replace(/\/$/, '')}/${slug}`, request.url)
      )

      return { response: rewriteResponse, action: 'continue' }
    }

    notFound()
  } catch (error) {
    logger.error('Access our data middleware error:', error)
    notFound()
  }

  return {
    response: response,
    action: 'continue',
  }
}

export async function processAuth(request: NextRequest, response: NextResponse): Promise<StepResult> {
  // Handle auth first if enabled
  if (process.env.AUTH_ENABLED !== 'true') {
    return {
      response: response,
      action: 'continue',
    }
  }

  const unauthenticatedPaths = ['/api/health', '/robots.txt']

  if (unauthenticatedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return {
      response: response,
      action: 'continue',
    }
  }

  try {
    // const token = await auth()
    // const excludePaths = ['/start', '/auth/error', '/auth/signin', '/auth/signout']

    // Uncomment to force redirect to the start page.
    // Check if the pathname is in the exclude list
    // if (!token && !excludePaths.some((path) => pathname.includes(path))) {
    //   return NextResponse.redirect(new URL('/start', request.url))
    // }
    await validateAndRenewSession(request, response)
  } catch (error) {
    logger.error('Auth middleware error:', error)
    const redirectResponse = NextResponse.redirect(new URL('/start', request.url))
    return { response: redirectResponse, action: 'done' }
  }

  return { response: response, action: 'continue' }
}

export async function processDefaultRoutes(request: NextRequest, response: NextResponse): Promise<StepResult> {
  // set isPreview:false as we are on a non-preview route
  response.cookies.set({
    name: 'path',
    value: resolvePath(request, response),
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
  })

  // could delete the cookie but this creates
  // the possibility of timing issues (as we soon set it again)
  // and could surface bugs
  // safest is to just set it to 'unset'
  response.cookies.set({
    name: 'cmsAuthToken',
    value: 'unset',
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: process.env.PAGE_PREVIEWS_CMS_AUTH_TOKEN_TTL ? Number(process.env.PAGE_PREVIEWS_CMS_AUTH_TOKEN_TTL) : 30,
  })

  response.headers.set('x-url', request.url)

  return { response: response, action: 'continue' }
}

export const proxy: NextProxy = async (request: NextRequest) => {
  connection()

  let response = NextResponse.next()

  const steps: Step[] = [
    processDefaultRoutes,
    processAuth,
    processAccessOurData,
    processPreviewRoute,
    processNoCacheRoute,
  ]

  // Call all steps and break to return response if the StepResult.action is 'done'
  for (const step of steps) {
    const result: StepResult = await step(request, response)

    response = result.response
    if (result.action === 'done') {
      break
    }
  }

  return response
}
