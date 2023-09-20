import { Request, Response } from 'express'

import { requestSchema } from '@/api/requests/tables/getTables'
import { logger } from '@/lib/logger'

import { fixtures } from './fixtures/fixtures'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'POST') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    // Validate query parameters
    const parsedQueryParams = requestSchema.safeParse(req.body)

    // Return a 500 if the query parameters provided aren't valid
    if (!parsedQueryParams.success) {
      return res.status(500)
    }

    const {
      data: {
        plots: [{ metric, topic }],
      },
    } = parsedQueryParams

    // Return a json fixture identified by the topic & metric provided
    return res.json(fixtures[topic][metric])
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
