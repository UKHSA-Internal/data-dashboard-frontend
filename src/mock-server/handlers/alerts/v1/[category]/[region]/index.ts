import { Request, Response } from 'express'

import { getSwitchBoardState } from '@/app/(fullWidth)/switchboard/shared/state'
import { logger } from '@/lib/logger'

import { alertRegionFixture } from '../../fixtures/detail'
import { fixtures as listFixtures } from '../../fixtures/list'

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

    const {
      api: {
        alerts: {
          scenario,
          detail: { status },
        },
      },
    } = getSwitchBoardState(req.headers.cookie)

    const listFixture = listFixtures[scenario]
    const geography_code = req.params['region']
    const matchedAlertFromListFixture = listFixture.find((region) => region.geography_code === geography_code)

    const json = {
      ...alertRegionFixture,
      geography_code,
      status: matchedAlertFromListFixture?.status ?? '',
      geography_name: matchedAlertFromListFixture?.geography_name ?? '',
    }

    if (scenario === 'NoAlertsYet') {
      json.period_start = null
      json.period_end = null
      json.refresh_date = null
    }

    return res.status(Number(status)).json(json)
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
