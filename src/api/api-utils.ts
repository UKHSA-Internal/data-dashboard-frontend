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
type Options = Omit<RequestInit, 'body'> & { body?: unknown }

export function client<T>(endpoint: string, { body, ...customConfig }: Options = {}): Promise<T> {
  const headers = { Authorization: process.env.API_KEY, 'content-type': 'application/json' }

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }
  if (body) {
    config.body = JSON.stringify(body)
  }

  return global.fetch(`${getApiBaseUrl()}/${endpoint}`, config).then(async (response) => {
    if (response.ok) {
      return await response.json()
    } else {
      const errorMessage = await response.text()
      return Promise.reject(new Error(errorMessage))
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
