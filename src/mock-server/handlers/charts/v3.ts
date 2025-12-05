import { Request, Response } from 'express'
import * as fs from 'fs'
import * as path from 'path'

import { requestSchema } from '@/api/requests/charts/getCharts'
import { chartSizes } from '@/config/constants'
import { logger } from '@/lib/logger'

const fixturesDirectory = path.resolve(process.cwd(), 'src/mock-server/handlers/charts/fixtures')
const narrowFixture = fs.readFileSync(path.join(fixturesDirectory, `narrow.svg`))
const wideFixture = fs.readFileSync(path.join(fixturesDirectory, `wide.svg`))
const halfFixture = fs.readFileSync(path.join(fixturesDirectory, `half.svg`))
const thirdFixture = fs.readFileSync(path.join(fixturesDirectory, `third.svg`))

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'POST') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    // Validate request body
    const parsedRequestBody = requestSchema.safeParse(req.body)

    // Return a 500 if the request body provided aren't valid
    if (!parsedRequestBody.success) {
      logger.error(`Chart Handler Schema parse error: ${parsedRequestBody.error}`)
      return res.status(500)
    }

    const {
      data: { chart_height, chart_width },
    } = parsedRequestBody

    if (chart_height === chartSizes.narrow.height && chart_width === chartSizes.narrow.width) {
      return res.json({
        chart: narrowFixture.toString(),
        alt_text: 'Mocked alt text',
        last_updated: '2023-05-10T15:18:06.939535+01:00',
        figure: {
          data: [],
          layout: {},
        },
      })
    }

    if (chart_height === chartSizes.wide.height && chart_width === chartSizes.wide.width) {
      return res.json({
        chart: wideFixture.toString(),
        alt_text: 'Mocked alt text',
        last_updated: '2023-05-10T15:18:06.939535+01:00',
        figure: {
          data: [],
          layout: {},
        },
      })
    }

    if (chart_height === chartSizes.half.height && chart_width === chartSizes.half.width) {
      return res.json({
        chart: halfFixture.toString(),
        alt_text: 'Mocked alt text',
        last_updated: '2023-05-10T15:18:06.939535+01:00',
        figure: {
          data: [],
          layout: {},
        },
      })
    }

    if (chart_height === chartSizes.third.height && chart_width === chartSizes.third.width) {
      return res.json({
        chart: thirdFixture.toString(),
        alt_text: 'Mocked alt text',
        last_updated: '2023-05-10T15:18:06.939535+01:00',
        figure: {
          data: [],
          layout: {},
        },
      })
    }
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
