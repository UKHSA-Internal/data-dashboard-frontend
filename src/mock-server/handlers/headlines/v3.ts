import { Request, Response } from 'express'

import { requestSchema } from '@/api/requests/headlines/getHeadlines'
import { logger } from '@/lib/logger'

import { fixtures } from './fixtures'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    // Validate query parameters
    const parsedQueryParams = requestSchema.safeParse(req.query)

    // Return a 500 if the query parameters provided aren't valid
    if (!parsedQueryParams.success) {
      logger.error(`Headlines Handler Schema parse error: ${parsedQueryParams.error}`)
      return res.status(500)
    }

    // Pick out the metric query parameter
    const {
      data: { metric, topic },
    } = parsedQueryParams

    // Return a json fixture identified by the topic & metric provided
    return res.json(fixtures[topic][metric])
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
