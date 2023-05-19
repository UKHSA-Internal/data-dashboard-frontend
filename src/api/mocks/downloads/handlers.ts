import { rest } from 'msw'
import { getApiBaseUrl } from '@/api/requests/helpers'
import { requestSchema } from '@/api/requests/downloads/getDownloads'
import { apiResolver } from '@/api/msw/resolvers/api-resolver'

import { downloadsCsvFixture } from './fixtures/downloads-csv'
import { downloadsJsonFixture } from './fixtures/downloads-json'

export const handlers = [
  rest.post(
    `${getApiBaseUrl()}/downloads/v2`,
    apiResolver(async (req, res, ctx) => {
      // Extract request body
      const requestBody = await req.json()

      // Validate request body
      const parsedRequestBody = requestSchema.safeParse(requestBody)

      // Return a 500 if the request body provided aren't valid
      if (!parsedRequestBody.success) {
        return res(ctx.status(500))
      }

      // Pick out the format query parameter
      const {
        data: { file_format },
      } = parsedRequestBody

      // Return a fixtured based on the chosen file format
      if (file_format === 'csv') {
        return res(ctx.text(downloadsCsvFixture))
      }

      if (file_format === 'json') {
        return res(ctx.json(downloadsJsonFixture))
      }
    })
  ),
]
