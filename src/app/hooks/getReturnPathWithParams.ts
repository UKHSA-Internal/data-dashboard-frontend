import { headers } from 'next/headers'

import { getSearchParams } from './getSearchParams'

/**
 * Constructs a return URL pathname with optional parameters based on certain conditions.
 * Uses the current URL from headers and search parameters to construct the returned pathname & params.
 *
 * @returns A function that takes a path and constructs a pathname with optional return URL parameter.
 */

export const getReturnPathWithParams = () => {
  const searchParams = getSearchParams()
  const headersList = headers()
  const currentUrl = new URL(headersList.get('x-url') || '')

  return (path: string) => {
    const newUrl = new URL(path, currentUrl)

    if (searchParams.has('page')) {
      newUrl.searchParams.set('returnUrl', encodeURI(`${currentUrl.pathname}${currentUrl.search}`))
    }

    return `${newUrl.pathname}${newUrl.search}`
  }
}
