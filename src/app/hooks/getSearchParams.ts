// @ts-nocheck
import { headers } from 'next/headers'

/**
 * Extracts and returns the URL search parameters from the current page in a Next.js Server component.
 *
 * This function is specifically designed for use within Next.js Server components. It utilizes the 'next/headers'
 * module to access the HTTP headers. The function then retrieves the full URL of the page from the 'x-url'
 * header, which should be injected via a middleware in the Next.js application. The URL's search parameters
 * are extracted and returned.
 *
 * The 'x-url' header is expected to contain the complete URL of the current page, which is not directly
 * accessible in server components. This approach allows server components to access URL query parameters,
 * which are typically available only on the client-side in standard Next.js setups.
 *
 * Example:
 * ```
 * const searchParams = getSearchParams();
 * const value = searchParams.get('paramName');
 * ```
 *
 * @returns {URLSearchParams} An instance of URLSearchParams containing the search parameters of the current page URL.
 */

export const getSearchParams = async () => {
  const headersList = (await headers() as unknown as UnsafeUnwrappedHeaders)
  const headersUrl = headersList.get('x-url')

  const searchParams = headersUrl ? new URL(headersUrl).searchParams : new URLSearchParams()

  return searchParams
}
