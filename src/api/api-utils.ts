import axios from 'axios'
import axiosRetry from 'axios-retry'

import { getApiBaseUrl } from './requests/helpers'

/**
 * AXIOS CLIENT (Legacy pages dir)
 * This is the API instance which all requests should be initiated from.
 * The Authorization headers and any other common configuration can be set below.
 */
export const api = axios.create({
  headers: { Authorization: process.env.API_KEY },
  responseType: 'json',
  timeout: 90000,
})

axiosRetry(api, { retries: 3 })

/**
 * FETCH CLIENT (New app dir)
 * This is the API instance which all requests should be initiated from.
 * The Authorization headers and any other common configuration can be set below.
 */
type Options = { body?: unknown; headers?: Record<string, string> }

export function client<T>(
  endpoint: string,
  { body, ...customConfig }: Options = {}
): Promise<{ data: T | null; status: number; error?: Error }> {
  const headers = { Authorization: process.env.API_KEY ?? '', 'content-type': 'application/json' }

  return global
    .fetch(`${getApiBaseUrl()}/${endpoint}`, {
      method: body ? 'POST' : 'GET',
      body: body ? JSON.stringify(body) : undefined,
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig.headers,
      },
    })
    .then(async (response) => {
      const { status, ok } = response

      if (ok) {
        try {
          const data = await response.json()
          return { data, status }
        } catch (error) {
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
