import { rest } from 'msw'
import { getApiBaseUrl } from '@/api/requests/helpers'
import { requestSchema } from '@/api/requests/charts/getCharts'
import { apiResolver } from '@/api/msw/resolvers/api-resolver'
import fs from 'fs'
import path from 'path'

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
        console.log('Unhandled msw handler for chart with multiple plots')
        return res(ctx.status(500))
      }

      // Read the image from the file system
      const fixturePath = `./src/api/mocks/charts/fixtures/${plots[0].topic}/${plots[0].metric}.svg`

      // Check file exists
      if (!fs.existsSync(fixturePath)) {
        console.log('charts msw handler fixture not found for path: ', fixturePath)
        return res(ctx.status(500))
      }

      // Load file
      const imageBuffer = fs.readFileSync(path.resolve(fixturePath))

      // Return response
      return res(
        ctx.set('Content-Length', imageBuffer.byteLength.toString()),
        ctx.set('Content-Type', 'image/svg'),
        ctx.body(imageBuffer)
      )
    })
  ),
]
