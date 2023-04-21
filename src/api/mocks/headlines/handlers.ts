import { rest } from 'msw'
import { getApiBaseUrl } from '@/api/requests/helpers'
import { requestSchema } from '@/api/requests/headlines/getHeadlines'
import { apiResolver } from '@/api/msw/resolvers/api-resolver'
import { fixtures } from './fixtures'

const paths: Record<string, string> = {
  getHeadlines: `${getApiBaseUrl()}/headlines`,
}

export const handlers = [
  rest.get(
    paths.getHeadlines,
    apiResolver((req, res, ctx) => {
      // Extract query parameters
      const queryParams = req.url.searchParams

      // Validate query parameters
      const parsedQueryParams = requestSchema.safeParse(Object.fromEntries(queryParams))

      // Return a 500 if the query parameters provided aren't valid
      if (!parsedQueryParams.success) {
        return res(ctx.status(500))
      }

      // Pick out the metric query parameter
      const {
        data: { metric, topic },
      } = parsedQueryParams

      // Return a json fixture identified by the topic & metric provided
      return res(ctx.json(fixtures[topic][metric]))
    })
  ),
]
