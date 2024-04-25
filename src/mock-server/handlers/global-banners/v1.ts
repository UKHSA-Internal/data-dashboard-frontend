import { Request, Response } from 'express'

import { logger } from '@/lib/logger'

import { globalBannerInformation } from './fixtures/global-banner-information'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    // Currently only returns an "Information" banner
    // In future, we will have the ability to serve dynamic mocks
    // after the relevant tickets are worked on
    return res.send(globalBannerInformation)
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
