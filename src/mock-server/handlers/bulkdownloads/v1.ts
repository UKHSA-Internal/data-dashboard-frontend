import { Request, Response } from 'express'

import { logger } from '@/lib/logger'

import { bulkDownloadZip } from './fixtures/bulk-download-zip'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    // Return a fixture based on the chosen file format
    if (req.query.file_format === 'csv') {
      return res.send(bulkDownloadZip)
    }

    if (req.query.file_format === 'json') {
      return res.json(bulkDownloadZip)
    }
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
