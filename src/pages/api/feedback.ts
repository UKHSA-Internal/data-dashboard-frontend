import type { NextApiRequest, NextApiResponse } from 'next'

import { logger } from '@/lib/logger'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    logger.error(`Unsupported request method ${req.method} sent to export endpoint`)
    return res.status(405)
  }

  logger.info(req.body)
  console.log(req.body)

  return res.redirect(302, '/feedback/confirmation')
}
