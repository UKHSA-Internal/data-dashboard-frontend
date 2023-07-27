import type { NextApiRequest, NextApiResponse } from 'next'

import { logger } from '@/lib/logger'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  logger.info('GET /api/health - FE is healthy')
  return res.status(200).json({ status: 'ok' })
}
