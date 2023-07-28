import axios from 'axios'
import axiosRetry from 'axios-retry'

import { getApiBaseUrl } from './requests/helpers'

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
const instance = axios.create({
  baseURL: getApiBaseUrl(),
  headers: { Authorization: process.env.API_KEY },
  responseType: 'json',
  timeout: 90000,
})

axiosRetry(instance, { retries: 3 })

export async function client<T>(endpoint: string, { body }: Options = {}) {
  if (body) {
    return instance.post<T>(endpoint, body).then((result) => {
      return result
    })
  }

  return instance.get<T>(endpoint).then((result) => {
    return result
  })
}

// export async function client<T>(endpoint: string, { body, baseUrl = getApiBaseUrl(), ...customConfig }: Options = {}) {
//   const headers = { Authorization: process.env.API_KEY ?? '', 'content-type': 'application/json' }

//   const fetchOptions: Record<string, unknown> = {
//     retries: 3,
//     method: body ? 'POST' : 'GET',
//     keepalive: true,
//     next: {
//       revalidate: getStaticPropsRevalidateValue(),
//     },
//     body: body ? JSON.stringify(body) : undefined,
//     ...customConfig,
//     headers: {
//       ...headers,
//       ...customConfig.headers,
//     },
//   }

//   const url = `${baseUrl}${baseUrl && '/'}${endpoint}`

//   return fetch(url, fetchOptions).then(async (response) => {
//     const { status, ok } = response

//     if (ok) {
//       try {
//         const type = response.headers.get('Content-Type')
//         if (type && !type.includes('application/json')) {
//           const data = await response.text()
//           return { data, status }
//         }
//         const data = await response.json()
//         return { data, status }
//       } catch (error) {
//         return Promise.reject(JSON.stringify(response))
//       }
//     } else {
//       return Promise.reject({ path: url, status, error: response.statusText })
//     }
//   })
// }

/**
 * Type guards to check the status of individual requests and narrow the type
 */
export const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult =>
  input.status === 'rejected'

export const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> =>
  input.status === 'fulfilled'
