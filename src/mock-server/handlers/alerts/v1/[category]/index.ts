import { Request, Response } from 'express'

import { logger } from '@/lib/logger'

import { coldAlertsFixture } from '../fixtures/cold'
import { heatAlertsFixture } from '../fixtures/heat'

const fixtureMap: Record<string, typeof heatAlertsFixture | typeof coldAlertsFixture> = {
  heat: heatAlertsFixture,
  cold: coldAlertsFixture,
}

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    // Validate query parameter
    if (!req.params['category']) {
      logger.error('Missing "category" path param')
      return res.status(500)
    }

    return res.send(fixtureMap[req.params.category])
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
