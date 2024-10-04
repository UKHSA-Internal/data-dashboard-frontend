import archiver from 'archiver'
import { Request, Response } from 'express'

import { logger } from '@/lib/logger'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405).end()
    }

    // Set headers for ZIP file
    res.setHeader('content-type', 'application/zip')

    const archive = archiver('zip', {
      zlib: { level: 9 }, // Compression level
    })

    // Archive error handling
    archive.on('error', (err) => {
      throw err
    })

    if (req.query.file_format === 'csv') {
      res.setHeader('content-disposition', 'attachment; filename=ukhsa-mock-download-csv.zip')

      // Stream the zip data back to the response
      archive.pipe(res)

      // Add a file to the ZIP (simulated CSV content)
      archive.append('mocked,file,csv', { name: 'mock.csv' })

      await archive.finalize()
    } else if (req.query.file_format === 'json') {
      res.setHeader('content-disposition', 'attachment; filename=ukhsa-mock-download-json.zip')

      // Stream the zip data back to the response
      archive.pipe(res)

      // Add a file to the ZIP (simulated JSON content)
      archive.append(JSON.stringify({ file: 'mocked file json' }, null, 2), { name: 'mock.json' })

      await archive.finalize()
    } else {
      res.status(400).json({ error: 'Invalid file format' })
    }
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
