import type { NextApiRequest, NextApiResponse } from 'next'

import { logger } from '@/lib/logger'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  logger.info('healthy')
  return res.status(200).json({ status: 'ok' })
}
