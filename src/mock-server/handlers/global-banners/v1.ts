import { Request, Response } from 'express'

import { getSwitchBoardState } from '@/app/(fullWidth)/switchboard/state'
import { logger } from '@/lib/logger'

import { globalBannerInactive } from './fixtures/global-banner-inactive'
import { globalBannerInformation } from './fixtures/global-banner-information'
import { globalBannerWarning } from './fixtures/global-banner-warning'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    const {
      api: { 'global-banners': globalBanner },
    } = getSwitchBoardState(req.headers.cookie)

    if (globalBanner.selected === 'Information') {
      return res.send(globalBannerInformation)
    }

    if (globalBanner.selected === 'Warning') {
      return res.send(globalBannerWarning)
    }

    return res.send(globalBannerInactive)
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
