import { rest } from 'msw'
import { getApiBaseUrl } from '@/api/requests/helpers'
import { requestSchema } from '@/api/requests/charts/getCharts'
import { apiResolver } from '@/api/msw/resolvers/api-resolver'
import { chartSizes } from '@/styles/Theme'
import * as path from 'path'
import * as fs from 'fs'

export const handlers = [
  rest.post(
    `${getApiBaseUrl()}/charts/v2`,
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

      const fixturesDirectory = path.resolve(process.cwd(), 'src/api/mocks/charts/fixtures')

      const narrowFixture = path.join(fixturesDirectory, `narrow.svg`)

      if (chart_height === chartSizes.narrow.height && chart_width === chartSizes.narrow.width) {
        const imageBuffer = fs.readFileSync(narrowFixture)
        return res(
          ctx.set('Content-Length', imageBuffer.byteLength.toString()),
          ctx.set('Content-Type', 'image/svg'),
          ctx.body(fs.readFileSync(narrowFixture))
        )
      }

      const wideFixture = path.join(fixturesDirectory, `wide.svg`)

      if (chart_height === chartSizes.wide.height && chart_width === chartSizes.wide.width) {
        const imageBuffer = fs.readFileSync(wideFixture)
        return res(
          ctx.set('Content-Length', imageBuffer.byteLength.toString()),
          ctx.set('Content-Type', 'image/svg'),
          ctx.body(fs.readFileSync(wideFixture))
        )
      }
    })
  ),
]
