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
 * Fetch the authentication token
 * @returns The authentication token or undefined
 * Only import auth at runtime, not at build time
 */
async function getAuthToken(): Promise<string | undefined> {
  if (globalThis.window === undefined) {
    try {
      const { auth } = await import('@/auth')
      const session = await auth()
      return session?.accessToken
    } catch (error) {
      console.error('Failed to get auth token:', error)
      return undefined
    }
  }
}

function clientBuildFetchOptions({
  body,
  isPublic,
  customConfig,
  headers,
  accessToken,
}: {
  body?: unknown
  isPublic: boolean
  customConfig: any
  headers: Record<string, string>
  accessToken?: string
}): RequestInit & { next?: { revalidate: number; tags: string[] } } {
  return {
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
      //passing authorization header only if access token is available, to avoid sending
      // "Authorization: Bearer undefined" in the headers which might cause issues with some APIs
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  }
}

// Utility to read preview info from cookies (SSR and CSR)
export function getPreviewInfoFromCookie() {
  let isPreview = false
  let draftAuthToken: string | undefined = undefined
  if (typeof globalThis.window === 'undefined') {
    // --- Server-side ---
    try {
      // Dynamically import next/headers only on the server
      const { cookies } = require('next/headers')
      const cookieStore = cookies()
      const queryStringParams = cookieStore.get('queryStringParams')?.value
      if (queryStringParams) {
        const params = JSON.parse(queryStringParams)
        draftAuthToken = params['t']
        isPreview = params['isPreview'] === 'true'
      }
    } catch {}
  } else {
    // --- Client-side ---
    const isPreviewCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('isPreview='))
      ?.split('=')[1]
    isPreview = isPreviewCookie === 'true'
    const queryStringParams = document.cookie
      .split('; ')
      .find((row) => row.startsWith('queryStringParams='))
      ?.split('=')[1]
    if (queryStringParams) {
      try {
        const params = JSON.parse(decodeURIComponent(queryStringParams))
        draftAuthToken = params['t']
      } catch {}
    }
  }
  return { isPreview, draftAuthToken }
}

export async function clientHandleSwitchboardBranch(headers: Record<string, string>): Promise<Record<string, string>> {
  // Send the local mock overrides with all requests
  if (!isWellKnownEnvironment() && isSSR) {
    // Import cookies dynamically only in node environment to not trigger nextjs warnings
    // TODO: Investigate the above. It means currently any client-side requests won't receive dynamically mocked responses
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const switchBoardCookie = cookieStore.get(UKHSA_SWITCHBOARD_COOKIE_NAME)
    if (switchBoardCookie) {
      headers.cookie = switchBoardCookie.value
    }
  }
  return headers
}

export function clientHandlePreviewBranch(
  endpoint: string,
  headers: Record<string, string>,
  customConfig: any
): {
  endpoint: string
  headers: Record<string, string>
  customConfig: any
  isPublic: boolean
} {
  const { isPreview, draftAuthToken } = getPreviewInfoFromCookie()
  const isPublic = false

  if (isPreview && endpoint.startsWith('pages')) {
    endpoint = endpoint.replace(/^pages/, 'drafts')
    if (draftAuthToken) {
      headers['x-draft-auth'] = `Bearer ${draftAuthToken}`
    }
    customConfig.cache = 'no-store'
    customConfig.next = { revalidate: 0 }
  }

  return { endpoint, headers, customConfig, isPublic }
}

export async function clientGetClientAccessToken(isPublic: boolean): Promise<string | undefined> {
  // read access token only if request is not public
  if (isPublic) return undefined
  return await getAuthToken()
}

export function clientBuildApiUrl({
  baseUrl,
  endpoint,
  searchParams,
}: {
  baseUrl?: string
  endpoint?: string
  searchParams?: URLSearchParams
}) {
  let url = baseUrl || ''
  if (baseUrl && endpoint) {
    if (!url.endsWith('/') && !endpoint.startsWith('/')) {
      url += '/'
    }
    url += endpoint
  } else if (endpoint) {
    url = endpoint
  }
  if (searchParams) {
    url += `?${searchParams.toString()}`
  }
  return url
}

export async function handleApiResponse(response: Response, url: string, fetchOptions: RequestInit) {
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
    } catch (_error) {
      return Promise.reject(JSON.stringify(response))
    }
  } else {
    console.debug('API Request:', { url, options: fetchOptions })
    const error = new Error(response.statusText)
    // @ts-ignore
    error.code = status
    return Promise.reject(error)
  }
}

/**
 * Fetch client instance
 * This is the fetch instance which all requests should be initiated from.
 * It handles automatic retries, pae previews (drafts) and auth headers
 */
export async function client<T>(
  endpoint: string,
  { body, isPublic, searchParams, baseUrl = getApiBaseUrl(), ...customConfig }: Options = {}
): Promise<{ data: T | null; status: number; error?: Error; headers?: Headers }> {
  let headers: Record<string, string> = {
    Authorization: process.env.API_KEY ?? '',
    'content-type': 'application/json',
  }

  const previewResult = clientHandlePreviewBranch(endpoint, headers, customConfig)
  endpoint = previewResult.endpoint

  // Defaulting all requests to public (non-authenticated) for now.
  // This may change to an opt-in approach as we build out the authenticated dashboard.
  isPublic = previewResult.isPublic
  headers = previewResult.headers

  const accessToken = await clientGetClientAccessToken(isPublic)

  const switchResult = await clientHandleSwitchboardBranch(headers)
  headers = switchResult

  const fetchOptions = clientBuildFetchOptions({
    body,
    isPublic,
    customConfig,
    headers,
    accessToken,
  })

  const url = clientBuildApiUrl({ baseUrl, endpoint, searchParams })

  return fetch(url, fetchOptions).then((response) => handleApiResponse(response, url, fetchOptions))
}
