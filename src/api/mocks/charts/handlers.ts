import * as fs from 'fs'
import { rest } from 'msw'
import * as path from 'path'

import { apiResolver } from '@/api/msw/resolvers/api-resolver'
import { requestSchema } from '@/api/requests/charts/getCharts'
import { getApiBaseUrl } from '@/api/requests/helpers'
import { chartSizes } from '@/styles/Theme'

const fixturesDirectory = path.resolve(process.cwd(), 'src/api/mocks/charts/fixtures')
const narrowFixture = fs.readFileSync(path.join(fixturesDirectory, `narrow.svg`))
const wideFixture = fs.readFileSync(path.join(fixturesDirectory, `wide.svg`))

export const handlers = [
  rest.post(
    `${getApiBaseUrl()}/charts/v3`,
    apiResolver(async (req, res, ctx) => {
      // Extract request body
      const requestBody = await req.json()

      // Validate request body
      const parsedRequestBody = requestSchema.safeParse(requestBody)

      // Return a 500 if the request body provided aren't valid
      if (!parsedRequestBody.success) {
        return res(ctx.status(500))
      }

      const {
        data: { chart_height, chart_width },
      } = parsedRequestBody

      if (chart_height === chartSizes.narrow.height && chart_width === chartSizes.narrow.width) {
        return res(
          ctx.json({
            chart: narrowFixture.toString(),
            last_updated: '2023-05-10T15:18:06.939535+01:00',
          })
        )
      }

      if (chart_height === chartSizes.wide.height && chart_width === chartSizes.wide.width) {
        return res(
          ctx.json({
            chart: wideFixture.toString(),
            last_updated: '2023-05-10T15:18:06.939535+01:00',
          })
        )
      }
    })
  ),
]
