import { getApiBaseUrl } from '../requests/helpers'

interface Options {
  body?: unknown
  searchParams?: URLSearchParams
  baseUrl?: string
  headers?: Record<string, string>
}

/**
 * Fetch client instance
 * This is the fetch instance which all requests should be initiated from.
 * It handles automatic retries and auth headers
 */

export function client<T>(
  endpoint: string,
  { body, searchParams, baseUrl = getApiBaseUrl(), ...customConfig }: Options = {}
): Promise<{ data: T | null; status: number; error?: Error; headers?: Headers }> {
  const headers = { Authorization: process.env.API_KEY ?? '', 'content-type': 'application/json' }

  const fetchOptions: Record<string, unknown> = {
    retries: 3,
    method: body ? 'POST' : 'GET',
    body: body ? JSON.stringify(body) : undefined,
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
            const data = await response.blob()
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
