import fetchRetry, { RequestInitRetryParams } from 'fetch-retry'

import { getStaticPropsRevalidateValue } from '@/config/app-utils'
import { logger } from '@/lib/logger'

import { getApiBaseUrl } from '../requests/helpers'

const fetch = fetchRetry(global.fetch)

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
): Promise<{ data: T | null; status: number; error?: Error }> {
  const headers = { Authorization: process.env.API_KEY ?? '', 'content-type': 'application/json' }

  const fetchOptions: RequestInitRetryParams & Record<string, unknown> = {
    retries: 3,
    method: body ? 'POST' : 'GET',
    retryOn(attempt, error, response) {
      if (response?.status === 504 && attempt < 3) {
        logger.info(`504 gateway timeout - ${endpoint} - ${JSON.stringify(body)}`)
        return true
      }
      return false
    },
    next: {
      revalidate: getStaticPropsRevalidateValue(),
    },
    body: body ? JSON.stringify(body) : undefined,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  const url = `${baseUrl}${baseUrl && '/'}${endpoint}${searchParams ? `?${searchParams.toString()}` : ''}`

  return fetch(url, fetchOptions).then(async (response) => {
    const { status, ok } = response

    if (ok) {
      try {
        const type = response.headers.get('Content-Type')

        if (type && !type.includes('application/json')) {
          if (type.includes('application/zip')) {
            const data = await response.blob()
            return { data, status }
          }
          const data = await response.text()
          return { data, status }
        }
        const data = await response.json()
        return { data, status }
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
