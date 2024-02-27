import { Request, Response } from 'express'

import { logger } from '@/lib/logger'

import { bulkDownloadCsv, bulkDownloadJson } from './fixtures/bulk-download-zip'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    res.setHeader('content-type', 'application/zip')

    // Return a fixture based on the chosen file format
    if (req.query.file_format === 'csv') {
      res.setHeader('content-disposition', 'attachment; filename=ukhsa-mock-download-csv.zip')
      return res.send(bulkDownloadCsv)
    }

    if (req.query.file_format === 'json') {
      res.setHeader('content-disposition', 'attachment; filename=ukhsa-mock-download-json.zip')
      return res.json(bulkDownloadJson)
    }
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
