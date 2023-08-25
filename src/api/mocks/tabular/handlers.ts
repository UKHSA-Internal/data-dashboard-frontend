import { rest } from 'msw'

import { apiResolver } from '@/api/msw/resolvers/api-resolver'
import { getApiBaseUrl } from '@/api/requests/helpers'
import { requestSchema } from '@/api/requests/tables/getTables'
import { fixtures } from '@/mock-server/handlers/tables/fixtures/fixtures'

export const handlers = [
  rest.post(
    `${getApiBaseUrl()}/tables/v2`,
    apiResolver(async (req, res, ctx) => {
      // Extract request body
      const requestBody = await req.json()

      // Validate query parameters
      const parsedQueryParams = requestSchema.safeParse(requestBody)

      // Return a 500 if the query parameters provided aren't valid
      if (!parsedQueryParams.success) {
        return res(ctx.status(500))
      }

      const {
        data: {
          plots: [{ metric, topic }],
        },
      } = parsedQueryParams

      const mockedMetric = metric as
        | 'new_cases_daily'
        | 'new_deaths_daily'
        | 'weekly_hospital_admissions_rate'
        | 'weekly_positivity'

      // Return a json fixture identified by the topic & metric provided
      return res(ctx.json(fixtures[topic][mockedMetric]))
    })
  ),
]
