import { Request, Response } from 'express'

import { requestSchema } from '@/api/requests/downloads/getDownloads'
import { logger } from '@/lib/logger'

import { downloadsCsvFixture } from './fixtures/downloads-csv'
import { downloadsJsonFixture } from './fixtures/downloads-json'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'POST') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    // Validate query parameters
    const parsedRequestBody = requestSchema.safeParse(req.body)

    // Return a 500 if the query parameters provided aren't valid
    if (!parsedRequestBody.success) {
      logger.error(`Downloads Handler Schema parse error: ${parsedRequestBody.error}`)
      return res.status(500)
    }

    // Pick out the format query parameter
    const {
      data: { file_format },
    } = parsedRequestBody

    // Return a fixtured based on the chosen file format
    if (file_format === 'csv') {
      return res.send(downloadsCsvFixture)
    }

    if (file_format === 'json') {
      return res.json(downloadsJsonFixture)
    }
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
