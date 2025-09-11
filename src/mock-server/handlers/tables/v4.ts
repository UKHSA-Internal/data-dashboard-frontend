import { Request, Response } from 'express'

import { requestSchema } from '@/api/requests/tables/getTables'
import { logger } from '@/lib/logger'

import { cases_casesByDay } from './fixtures'
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
      return res.status(500).send({
        message: 'Failed to parse request body',
      })
    }

    const {
      data: {
        plots: [{ metric, topic }],
      },
    } = parsedQueryParams

    // Return a json fixture identified by the topic & metric provided
    if (fixtures[topic]?.hasOwnProperty(metric)) {
      return res.json(fixtures[topic][metric])
    }

    // Otherwise just return some default data so something can be shown
    return res.json(cases_casesByDay)
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
