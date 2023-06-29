import axios from 'axios'

/**
 * This is the API instance which all requests should be initiated from.
 * The Authorization headers and any other common configuration can be set below.
 */
export const api = axios.create({
  headers: { Authorization: process.env.API_KEY },
  responseType: 'json',
  timeout: 180000,
})

/**
 * Type guards to check the status of individual requests and narrow the type
 */
export const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult =>
  input.status === 'rejected'

export const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> =>
  input.status === 'fulfilled'
