import { rest } from 'msw'

import { apiResolver } from '@/api/msw/resolvers/api-resolver'
import { getApiBaseUrl } from '@/api/requests/helpers'

export const handlers = [
  rest.post(
    `${getApiBaseUrl()}/suggestions/v1`,
    apiResolver(async (req, res, ctx) => {
      return res(ctx.status(200))
    })
  ),
]
