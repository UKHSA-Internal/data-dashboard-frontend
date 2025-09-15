import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'
import { isSSR, isWellKnownEnvironment } from '@/app/utils/app.utils'
import {
  authEnabled,
  cacheFetchTags,
  ISRCachingEnabled,
  nonPublicCacheRevalidationInterval,
  publicCacheRevalidationInterval,
} from '@/config/constants'

import { getApiBaseUrl } from '../requests/helpers'

// TODO: Refactor to extend RequestInit
interface Options {
  body?: unknown
  searchParams?: URLSearchParams
  isPublic?: boolean
  baseUrl?: string
  headers?: Record<string, string>
  cache?: RequestInit['cache']
  next?: { revalidate: number }
}

function getRevalidateInterval(isPublic: boolean, customConfig: Pick<Options, 'next'>) {
  if (ISRCachingEnabled) {
    return publicCacheRevalidationInterval
  }

  if (authEnabled && isPublic) {
    return customConfig.next?.revalidate ?? nonPublicCacheRevalidationInterval
  }

  return 0
}

/**
 * Fetch client instance
 * This is the fetch instance which all requests should be initiated from.
 * It handles automatic retries and auth headers
 */

export async function client<T>(
  endpoint: string,
  {
    body,
    // Defaulting all requests to public (non-authenticated) for now.
    // This may change to an opt-in approach as we build out the authenticated dashboard.
    isPublic = true,
    searchParams,
    baseUrl = getApiBaseUrl(),
    ...customConfig
  }: Options = {}
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

  const fetchOptions: RequestInit & { next?: { revalidate: number; tags: string[] } } = {
    method: body ? 'POST' : 'GET',
    body: body ? JSON.stringify(body) : undefined,
    ...customConfig,
    next: {
      // The public dashboard is behind a CDN so doesn't rely on any Next.js caching
      // However, the auth instance is not, so we rely on Next.js caching for unauthenticated requests
      revalidate: getRevalidateInterval(isPublic, customConfig),
      tags: authEnabled && isPublic ? [cacheFetchTags.public] : [],
    },
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
