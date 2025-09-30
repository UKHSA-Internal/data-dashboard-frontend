import { Request, Response } from 'express'

import { logger } from '@/lib/logger'

import { downloadsSubplotCsvFixture } from './fixtures/downloads-csv'
import { downloadsSubplotJsonFixture } from './fixtures/downloads-json'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'POST') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405).send({ error: 'Unsupported request' })
    }

    const parsedRequestBody = req.body

    console.log(parsedRequestBody)

    const { file_format } = parsedRequestBody

    if (file_format === 'csv') {
      return res.status(200).send(downloadsSubplotCsvFixture)
    }

    if (file_format === 'json') {
      return res.status(200).send(downloadsSubplotJsonFixture)
    }
  } catch (error) {
    logger.error(error)
    return res.status(500).send({ error: `Unknown error: ${error}` })
  }
}
