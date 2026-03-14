import { cookies as nextCookies } from 'next/headers'

/**
 * Retrieves search parameters from the 'queryStringParams' cookie, set in middleware.ts.
 *
 * Example:
 *   Cookie: { queryStringParams: '{"t":"abc123","isPreview":"true"}' }
 *   Output: { t: "abc123", isPreview: "true" }
 *
 * Parses the cookie value as JSON and returns a key-value map of parameters.
 * Returns an empty object if the cookie is missing or invalid.
 */
export const getSearchParamsFromCookie = async (): Promise<Record<string, string | undefined>> => {
  let params: Record<string, string | undefined> = {}

  try {
    const cookieStore = await nextCookies()
    const cookieValue = cookieStore?.get('queryStringParams')?.value

    if (cookieValue) {
      params = JSON.parse(cookieValue) as Record<string, string | undefined>
    }
  } catch {
    params = {}
  }

  return params
}
