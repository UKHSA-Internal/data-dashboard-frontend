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
