import { Request, Response } from 'express'

import { getSwitchBoardState } from '@/app/(fullWidth)/switchboard/shared/state'
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
          return {
            ...feature,
            enabled: flags[feature.name as keyof typeof flags] !== 'disabled',
            variants: feature.variants
              .map((variant) => ({
                ...variant,
                enabled: flags[feature.name as keyof typeof flags] === variant.name,
                feature_enabled: flags[feature.name as keyof typeof flags] === variant.name,
              }))
              // Unleash takes the first array item regardless of whether enabled is true or false.
              .sort((first, second) => (first.enabled === second.enabled ? 0 : first.enabled ? -1 : 1)),
          }
        }
      }),
    })
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
