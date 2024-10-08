import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'
import { isSSR, isWellKnownEnvironment } from '@/app/utils/app.utils'

import { getApiBaseUrl } from '../requests/helpers'

interface Options extends RequestInit {
  searchParams?: URLSearchParams
  baseUrl?: string
  headers?: Record<string, string>
}

/**
 * Fetch client instance
 * This is the fetch instance which all requests should be initiated from.
 * It handles automatic retries and auth headers
 */

export async function client<T>(
  endpoint: string,
  { body, searchParams, baseUrl = getApiBaseUrl(), ...customConfig }: Options = {}
): Promise<{ data: T | null; status: number; error?: Error; headers?: Headers }> {
  const headers: HeadersInit = { Authorization: process.env.API_KEY ?? '', 'content-type': 'application/json' }

  // Send the local mock overrides with all requests
  if (!isWellKnownEnvironment() && isSSR) {
    // Import cookies dynamically only in node environment to not trigger nextjs warnings
    // TODO: Investigate the above. It means currently any client-side requests won't receive dynamically mocked responses
    const cookies = async () => (await import('next/headers')).cookies
    const cookieStore = await cookies()
    const switchBoardCookie = cookieStore().get(UKHSA_SWITCHBOARD_COOKIE_NAME)
    if (switchBoardCookie) {
      headers.cookie = switchBoardCookie.value
    }
  }

  const fetchOptions: RequestInit = {
    method: body ? 'POST' : 'GET',
    body: body ? body : undefined,
    next: {
      // Revalidate the cache every 5 minutes
      revalidate: 300,
    },
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  const url = `${baseUrl}${baseUrl && '/'}${endpoint}${searchParams ? `?${searchParams.toString()}` : ''}`

  return fetch(url, fetchOptions).then(async (response) => {
    const { status, ok, headers } = response

    if (ok) {
      try {
        const type = response.headers.get('Content-Type')

        if (type && !type.includes('application/json')) {
          if (type.includes('application/zip')) {
            const arrayBuffer = await response.arrayBuffer()
            const data = Buffer.from(arrayBuffer)
            return { data, status, headers }
          }
          const data = await response.text()
          return { data, status, headers }
        }
        const data = await response.json()
        return { data, status, headers }
      } catch (error) {
        return Promise.reject(JSON.stringify(response))
      }
    } else {
      const error = new Error(response.statusText)
      error.code = status
      return Promise.reject(error)
    }
  })
}
