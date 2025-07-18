import { Request, Response } from 'express'

import { logger } from '@/lib/logger'
import { defaultData } from './fixtures'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'POST') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }
    return res.status(200).json(defaultData)
  } catch (error) {
    logger.error(error)
    return res.status(500).send({ success: false })
  }
}
