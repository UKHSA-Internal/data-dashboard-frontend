import { Request, Response } from 'express'

import { logger } from '@/lib/logger'

export const areaTypeMock = [
  'Nation',
  'UKHSA Region',
  'Upper Tier Local Authority',
  'Lower Tier Local Authority',
  'NHS Region',
  'NHS Trust',
  'Government Office Region',
]

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    return res.json(
      areaTypeMock.map((name, id) => ({
        id,
        name,
      }))
    )
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
