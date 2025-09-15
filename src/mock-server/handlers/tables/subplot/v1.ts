import { Request, Response } from 'express'

import { requestSchema } from '@/api/requests/tables/subplot/getSubplotTables'
import { logger } from '@/lib/logger'

import { defaultCoverageTableValues } from '../subplot/fixtures/childhoodVaccines/defaultCoverageTableValues'
import { fixtures } from './fixtures/fixtures'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'POST') {
      logger.error(`Unsupported request method: ${req.method}`)
      return res.status(405)
    }

    const parsedRequestBody = requestSchema.safeParse(req.body)

    if (!parsedRequestBody.success) {
      return res.status(500).send({
        message: 'Failed to parse request body',
      })
    }

    const {
      data: {
        chart_parameters: { theme },
      },
    } = parsedRequestBody

    if (theme && fixtures.hasOwnProperty(theme)) {
      logger.info(fixtures[theme])
      res.status(200).send(fixtures[theme])
    }

    res.status(200).send(defaultCoverageTableValues)
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
