import { headers } from 'next/headers'

import { useSearchParams } from './useSearchParams'

/**
 * Constructs a return URL pathname with optional parameters based on certain conditions.
 * Uses the current URL from headers and search parameters to construct the returned pathname & params.
 *
 * @returns A function that takes a path and constructs a pathname with optional return URL parameter.
 */

export const useReturnPathWithParams = () => {
  const searchParams = useSearchParams()
  const headersList = headers()
  const url = headersList.get('x-url') || ''

  return (path: string) => {
    const newUrl = new URL(path, url)

    if (searchParams.has('page')) {
      newUrl.searchParams.set('returnUrl', encodeURI(url))
    }

    return `${newUrl.pathname}${newUrl.search}`
  }
}
