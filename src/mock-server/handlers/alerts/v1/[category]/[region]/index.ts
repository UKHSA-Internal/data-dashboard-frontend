import { Request, Response } from 'express'

import { logger } from '@/lib/logger'

import { heatAlertsFixture } from '../../fixtures/heat'
import { alertRegionFixture } from '../../fixtures/region'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    // Validate query parameters
    if (!req.params['category']) {
      logger.error('Missing "category" path param')
      return res.status(500)
    }

    if (!req.params['region']) {
      logger.error('Missing "region" path param')
      return res.status(500)
    }

    const geography_code = req.params['region']
    const matchedAlertFromListFixture = heatAlertsFixture.find((region) => region.geography_code === geography_code)

    return res.send({
      ...alertRegionFixture,
      geography_code,
      status: matchedAlertFromListFixture?.status ?? '',
      geography_name: matchedAlertFromListFixture?.geography_name ?? '',
    })
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
