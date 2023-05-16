import { rest } from 'msw'
import { getApiBaseUrl } from '@/api/requests/helpers'
import { requestSchema } from '@/api/requests/charts/getCharts'
import { apiResolver } from '@/api/msw/resolvers/api-resolver'
import { chartSizes } from '@/styles/Theme'
import * as path from 'path'
import * as fs from 'fs'

const fixturesDirectory = path.resolve(process.cwd(), 'src/api/mocks/charts/fixtures')
const narrowFixture = fs.readFileSync(path.join(fixturesDirectory, `narrow.svg`))
const wideFixture = fs.readFileSync(path.join(fixturesDirectory, `wide.svg`))

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

      if (chart_height === chartSizes.narrow.height && chart_width === chartSizes.narrow.width) {
        return res(
          ctx.set('Content-Length', narrowFixture.byteLength.toString()),
          ctx.set('Content-Type', 'image/svg'),
          ctx.body(narrowFixture)
        )
      }

      if (chart_height === chartSizes.wide.height && chart_width === chartSizes.wide.width) {
        return res(
          ctx.set('Content-Length', wideFixture.byteLength.toString()),
          ctx.set('Content-Type', 'image/svg'),
          ctx.body(wideFixture)
        )
      }
    })
  ),
]
