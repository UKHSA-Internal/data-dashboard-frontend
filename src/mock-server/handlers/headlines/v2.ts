import { Request, Response } from 'express'

import { Metrics, Topics } from '../../../api/models'
import { fixtures } from './fixtures'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      console.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    // Pick out the metric query parameter
    const { metric, topic } = req.query

    // Return a json fixture identified by the topic & metric provided
    return res.json(fixtures[topic as Topics][metric as Metrics])
  } catch (error) {
    console.error(error)
    return res.status(500)
  }
}
