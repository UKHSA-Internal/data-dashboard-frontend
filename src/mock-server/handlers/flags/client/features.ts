import { Request, Response } from 'express'

import { getSwitchBoardState } from '@/app/(pages)/switchboard/shared/state'
import { logger } from '@/lib/logger'

import { featureFlags } from './fixtures/feature-flags'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    const { flags } = getSwitchBoardState(req.headers.cookie)

    return res.json({
      ...featureFlags,
      features: featureFlags.features.map((feature) => {
        if (feature.name in flags) {
          return { ...feature, enabled: flags[feature.name as keyof typeof flags] === 'enabled' }
        }
      }),
    })
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
