import { Request, Response } from 'express'

import { logger } from '@/lib/logger'

import { allPagesMock } from '../pages/fixtures/pages'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    /// Search only returns 5 items
    return res.status(202).json({
      ...allPagesMock,
      items: allPagesMock.items.slice(0, 5),
    })
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
