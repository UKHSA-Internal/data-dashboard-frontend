import { Request, Response } from 'express'

import { requestSchema } from '@/api/requests/downloads/getDualCategoryDownloads'
import { logger } from '@/lib/logger'

import { downloadsCsvFixture } from '../fixtures/downloads-csv'
import { downloadsJsonFixture } from '../fixtures/downloads-json'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'POST') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    const parsedRequestBody = requestSchema.safeParse(req.body)

    if (!parsedRequestBody.success) {
      logger.error(`Dual Category Downloads Handler Schema parse error: ${parsedRequestBody.error}`)
      return res.status(500)
    }

    const {
      data: { file_format },
    } = parsedRequestBody

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
