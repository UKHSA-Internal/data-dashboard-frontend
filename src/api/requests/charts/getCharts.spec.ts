import z from 'zod'
import fs from 'fs'
import path from 'path'
import 'whatwg-fetch'
import { rest } from 'msw'
import { server } from '@/api/msw/server'
import { getCharts } from './getCharts'
import { getApiBaseUrl } from '../helpers'
import { Metrics, Topics } from '@/api/models'
import { logger } from '@/lib/logger'

jest.mock('@/lib/logger')

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

type Topic = z.infer<typeof Topics>
type Metric = z.infer<typeof Metrics>

const charts: Array<[Topic, Metric]> = [
  ['COVID-19', 'new_cases_daily'],
  ['COVID-19', 'new_deaths_daily'],
  ['Influenza', 'weekly_hospital_admissions_rate'],
  ['Influenza', 'weekly_positivity_latest'],
]

test.each(charts)('Returns a chart for the %s topic and %s metric', async (topic, metric) => {
  const result = await getCharts({
    plots: [
      {
        topic,
        metric,
        chart_type: 'line_with_shaded_section',
      },
    ],
  })

  const fixture = fs.readFileSync(path.resolve(`./src/api/mocks/charts/fixtures/${topic}/${metric}.svg`), {
    encoding: 'utf8',
  })

  expect(result).toEqual({ success: true, data: fixture })
})

test('Handles generic http errors', async () => {
  server.use(
    rest.post(`${getApiBaseUrl()}/charts/v2`, (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )

  const result = await getCharts({
    plots: [
      {
        topic: 'COVID-19',
        metric: 'new_cases_7days_sum',
        chart_type: 'line_with_shaded_section',
      },
    ],
  })

  expect(logger.error).toHaveBeenCalledTimes(1)

  expect(result).toEqual({
    success: false,
    error: new z.ZodError([
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'object',
        path: [],
        message: 'Expected string, received object',
      },
    ]),
  })
})
