import type { NextApiRequest, NextApiResponse } from 'next'
import { getDownloads, requestSchema } from '@/api/requests/downloads/getDownloads'
import { logger } from '@/lib/logger'
import { initMocks } from '@/api/msw'

/**
 * This is a temporary API route to simulate the download functionality that will
 * eventually come from the backend service
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await initMocks()
  }

  if (req.method !== 'POST') {
    logger.error(`Unsupported request method ${req.method} sent to export endpoint`)
    return res.status(405)
  }

  const plots = Array.isArray(req.body.plots) ? req.body.plots : [JSON.parse(req.body.plots)]

  const params = requestSchema.safeParse({
    file_format: req.body.format,
    plots,
  })

  if (params.success) {
    const { plots, file_format: fileFormat } = params.data

    const response = await getDownloads(plots, fileFormat)

    if (!response) {
      logger.error('Proxied request to /api/downloads/v2 failed')
      return res.status(500)
    }

    if (params.data.file_format === 'csv') {
      logger.info('successful csv download')
      return res
        .status(200)
        .setHeader('Content-Type', 'text/csv')
        .setHeader('Content-Disposition', `attachment; filename=data.csv`)
        .send(response)
    }

    if (params.data.file_format === 'json') {
      logger.info('successful json download')
      return res
        .status(200)
        .setHeader('Content-Type', 'text/json')
        .setHeader('Content-Disposition', `attachment; filename=data.json`)
        .send(response)
    }
  } else {
    logger.error(params.error)
  }

  return res.status(500)
}
