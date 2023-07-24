import fetchRetry from 'fetch-retry'

import { getApiBaseUrl } from './requests/helpers'

const fetch = fetchRetry(global.fetch)

interface Options {
  body?: unknown
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
  { body, baseUrl = getApiBaseUrl(), ...customConfig }: Options = {}
): Promise<{ data: T | null; status: number; error?: Error }> {
  const headers = { Authorization: process.env.API_KEY ?? '', 'content-type': 'application/json' }

  return fetch(`${baseUrl}${baseUrl && '/'}${endpoint}`, {
    retries: 3,
    method: body ? 'POST' : 'GET',
    body: body ? JSON.stringify(body) : undefined,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }).then(async (response) => {
    const { status, ok } = response

    if (ok) {
      try {
        const type = response.headers.get('Content-Type')
        if (type && !type.includes('application/json')) {
          const data = await response.text()
          return { data, status }
        }
        const data = await response.json()
        return { data, status }
      } catch (error) {
        console.error(error)
        return { data: null, status }
      }
    } else {
      const errorMessage = await response.text()
      return Promise.reject({ data: null, status, error: new Error(errorMessage) })
    }
  })
}

/**
 * Type guards to check the status of individual requests and narrow the type
 */
export const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult =>
  input.status === 'rejected'

export const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> =>
  input.status === 'fulfilled'
