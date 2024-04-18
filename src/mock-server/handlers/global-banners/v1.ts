import { Request, Response } from 'express'
import { IncomingHttpHeaders } from 'http'

import { logger } from '@/lib/logger'

import { globalBannerInactive } from './fixtures/global-banner-inactive'
import { globalBannerInformation } from './fixtures/global-banner-information'
import { globalBannerWarning } from './fixtures/global-banner-warning'

const getSwitchboardState = (headers: IncomingHttpHeaders) => {
  try {
    if (headers.cookie) {
      console.log(headers.cookie)
      return JSON.parse(headers.cookie)
    }
  } catch (error) {
    console.error(error)
  }
}

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    const state = getSwitchboardState(req.headers)

    if (state.globalBanner.type === 'Information') {
      return res.send(globalBannerInformation)
    }

    if (state.globalBanner.type === 'Warning') {
      return res.send(globalBannerWarning)
    }

    return res.send(globalBannerInactive)
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
