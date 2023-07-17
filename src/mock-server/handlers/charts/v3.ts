import { Request, Response } from 'express'
import * as fs from 'fs'
import * as path from 'path'

import { chartSizes } from '../../../config/constants'

const fixturesDirectory = path.resolve(process.cwd(), 'src/mock-server/handlers/charts/fixtures')
const narrowFixture = fs.readFileSync(path.join(fixturesDirectory, `narrow.svg`))
const wideFixture = fs.readFileSync(path.join(fixturesDirectory, `wide.svg`))

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'POST') {
      console.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    // Pick out the format query parameter
    const { chart_height, chart_width } = req.body

    if (chart_height === chartSizes.narrow.height && chart_width === chartSizes.narrow.width) {
      return res.json({
        chart: narrowFixture.toString(),
        last_updated: '2023-05-10T15:18:06.939535+01:00',
      })
    }

    if (chart_height === chartSizes.wide.height && chart_width === chartSizes.wide.width) {
      return res.json({
        chart: wideFixture.toString(),
        last_updated: '2023-05-10T15:18:06.939535+01:00',
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500)
  }
}
