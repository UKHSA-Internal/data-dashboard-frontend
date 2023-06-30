import type { NextApiRequest, NextApiResponse } from 'next'

import { logger } from '@/lib/logger'

/**
 * Api route to support progressively enhanced form submissions for redirecting to a particular topic page
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    const topic = req.body.topic

    if (typeof topic !== 'string') {
      throw new Error('Missing topic')
    }
    return res.redirect(302, `/choose-topic/${topic}`)
  } catch (error) {
    logger.error(error)
    return res.status(302).redirect('/500')
  }
}
