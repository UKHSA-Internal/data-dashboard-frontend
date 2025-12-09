// @ts-nocheck
import { headers } from 'next/headers'

/**
 * Extracts and returns the URL pathname from the current page in a Next.js Server component.
 *
 * This function is specifically designed for use within Next.js Server components. It utilizes the 'next/headers'
 * module to access the HTTP headers. The function then retrieves the full URL of the page from the 'x-url'
 * header, which should be injected via a middleware in the Next.js application. The URL's pathname is
 * extracted and returned.
 *
 * The 'x-url' header is expected to contain the complete URL of the current page, which is not directly
 * accessible in server components.
 *
 * Example:
 * ```
 * const pathname = getPathname();
 * ```
 *
 * @returns {string} An string containing the URL pathname
 */

export const getPathname = () => {
  const headersList = headers() as unknown as UnsafeUnwrappedHeaders
  const headersUrl = headersList.get('x-url') || ''

  const pathname = headersUrl ? new URL(headersUrl).pathname : ''

  return pathname
}
