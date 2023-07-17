import { Request, Response } from 'express'

import { Topics } from '../../../api/models'
import { fixtures } from './fixtures/fixtures'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'POST') {
      console.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    const {
      plots: [{ metric, topic }],
    } = req.body

    const mockedMetric = metric as
      | 'new_cases_daily'
      | 'new_deaths_daily'
      | 'weekly_hospital_admissions_rate'
      | 'weekly_positivity'

    // Return a json fixture identified by the topic & metric provided
    return res.json(fixtures[topic as Topics][mockedMetric])
  } catch (error) {
    console.error(error)
    return res.status(500)
  }
}
