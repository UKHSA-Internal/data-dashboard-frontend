import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

import { requestSchema } from '@/api/requests/charts/subplot/getSubplots'
import { logger } from '@/lib/logger'

const fixturesDirectory = path.resolve(process.cwd(), 'src/mock-server/handlers/charts/fixtures')
const wideFixture = fs.readFileSync(path.join(fixturesDirectory, `wide.svg`))

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'POST') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    const parsedRequestBody = requestSchema.safeParse(req.body)

    if (!parsedRequestBody.success) {
      logger.error(`Subplot Chart Handler Schema parse error: ${parsedRequestBody.error}`)
      return res.status(500).send({
        message: 'Error parsing request body',
      })
    }

    return res.json({
      chart: wideFixture.toString(),
      alt_text: 'Mocked alt text',
      last_updated: '2025-09-10T15:01:06.939535+01:00',
      figure: {
        data: [],
        layout: {},
      },
    })
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
