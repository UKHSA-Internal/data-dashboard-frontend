import { Request, Response } from 'express'

import { requestSchema } from '@/api/requests/tables/getDualCategoryTables'
import { logger } from '@/lib/logger'

import { dualCategoryTableValues } from '../fixtures/dual-category'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'POST') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    // Validate request body
    const parsedRequestBody = requestSchema.safeParse(req.body)

    // Return a 500 if the request body provided aren't valid
    if (!parsedRequestBody.success) {
      logger.error(`Dual category tables handler schema parse error: ${parsedRequestBody.error}`)
      return res.status(500).send({
        message: 'Failed to parse request body',
      })
    }

    return res.json(dualCategoryTableValues)
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
