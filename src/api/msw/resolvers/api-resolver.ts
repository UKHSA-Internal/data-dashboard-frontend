import { ResponseResolver, RestContext, RestRequest } from 'msw'

/**
 * MSW resolver that handles common error scenarios in the API
 */
type Resolver = ResponseResolver<RestRequest, RestContext>

export const apiResolver = (resolver: Resolver): Resolver => {
  return (req, res, ctx) => {
    if (req.headers.get('Authorization') !== process.env.API_KEY) {
      return res(ctx.status(403), ctx.json({ detail: 'You do not have permission to perform this action' }))
    }
    return resolver(req, res, ctx)
  }
}
