import { Request, Response } from 'express'

import { logger } from '@/lib/logger'

import { menu } from './fixtures/menu'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    return res.status(200).send(menu)
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
