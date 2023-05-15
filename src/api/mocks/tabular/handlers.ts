import { rest } from 'msw'
import { getApiBaseUrl } from '@/api/requests/helpers'
import { apiResolver } from '@/api/msw/resolvers/api-resolver'
import { fixtures } from './fixtures/fixtures'
import { requestSchema } from '@/api/requests/tabular/getTabular'

export const handlers = [
  rest.get(
    `${getApiBaseUrl()}/tabular/:topic/:metric`,
    apiResolver((req, res, ctx) => {
      // Validate query parameters
      const parsedQueryParams = requestSchema.safeParse(req.params)

      // Return a 500 if the query parameters provided aren't valid
      if (!parsedQueryParams.success) {
        return res(ctx.status(500))
      }

      // Pick out the metric query parameter
      const {
        data: { metric, topic },
      } = parsedQueryParams

      const mockedMetric = metric as
        | 'new_cases_daily'
        | 'new_deaths_daily'
        | 'weekly_hospital_admissions_rate'
        | 'weekly_positivity_latest'

      // Return a json fixture identified by the topic & metric provided
      return res(ctx.json(fixtures[topic][mockedMetric]))
    })
  ),
]
