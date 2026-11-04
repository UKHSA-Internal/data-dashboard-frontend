import { Request, Response } from 'express'

import { getSwitchBoardState } from '@/app/(pages)/switchboard/shared/state'
import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'
import { logger } from '@/lib/logger'

import { fixtures } from '../fixtures/list'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    const {
      api: {
        alerts: {
          scenario,
          list: { status },
        },
      },
    } = getSwitchBoardState(req.cookies[UKHSA_SWITCHBOARD_COOKIE_NAME])

    // Validate query parameter
    if (!req.params['category']) {
      logger.error('Missing "category" path param')
      return res.status(500)
    }

    const fixture = fixtures[scenario]

    return res.status(status).json(fixture)
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
