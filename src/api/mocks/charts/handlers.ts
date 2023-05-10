import { rest } from 'msw'
import { getApiBaseUrl } from '@/api/requests/helpers'
import { requestSchema } from '@/api/requests/charts/getCharts'
import { apiResolver } from '@/api/msw/resolvers/api-resolver'
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

      // Pick out the metric & topic values
      const {
        data: { plots },
      } = parsedRequestBody

      if (plots.length > 1) {
        // TODO: Handle msw multiple plots
        console.log('Warning: Unhandled msw handler for chart with multiple plots')
        // return res(ctx.status(500))
      }

      const fixturesDirectory = path.resolve(process.cwd(), 'src/api/mocks/charts/fixtures')

      const filePath = path.join(fixturesDirectory, `${plots[0].topic}/${plots[0].metric}/${plots[0].chart_type}.svg`)

      // Read file
      if (!fs.existsSync(filePath)) {
        console.log('charts msw handler fixture not found for path: ', filePath)
        return res(ctx.status(500))
      }

      // Load file
      const imageBuffer = fs.readFileSync(filePath)

      // Return response
      return res(
        ctx.set('Content-Length', imageBuffer.byteLength.toString()),
        ctx.set('Content-Type', 'image/svg'),
        ctx.body(imageBuffer)
      )
    })
  ),
]
