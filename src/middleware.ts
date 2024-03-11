import { notFound } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getPages, PageType } from './api/requests/cms/getPages'
import { getPageBySlug } from './api/requests/getPageBySlug'

/**
 * This file contains Next.js middleware.
 * Due to testing complexities, it's excluded from Jest coverage.
 * Ensure Playwright tests cover middleware behavior.
 */

const paths = {
  accessOurData: 'access-our-data',
}

export async function middleware(request: NextRequest) {
  // Access our data redirects
  if (request.nextUrl.pathname === `/${paths.accessOurData}`) {
    try {
      const { id } = await getPageBySlug(paths.accessOurData, PageType.Composite)

      const pages = await getPages(undefined, { child_of: id.toString() })

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

        return NextResponse.redirect(new URL(`/${paths.accessOurData}/${slug}`, request.url))
      }
      notFound()
    } catch (error) {
      notFound()
    }
  }

  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', request.url)

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  })
}
