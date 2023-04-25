import ky from 'ky-universal'

/**
 * This is the API instance which all requests should be initiated from.
 * The Authorization headers and any other common configuration can be set below.
 */
export const api = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('Authorization', process.env.API_KEY)
      },
    ],
  },
})

/**
 * Type guards to check the status of individual requests and narrow the type
 */
export const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult =>
  input.status === 'rejected'

export const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> =>
  input.status === 'fulfilled'
