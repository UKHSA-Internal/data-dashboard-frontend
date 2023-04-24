import z from 'zod'
import fs from 'fs'
import path from 'path'
import 'whatwg-fetch'
import { rest } from 'msw'
import { server } from '@/api/msw/server'
import { getCharts, requestSchema } from './getCharts'
import { getApiBaseUrl } from '../helpers'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

type Topic = z.infer<typeof requestSchema>['topic']
type Metric = z.infer<typeof requestSchema>['metric']

const charts: Array<[Topic, Metric]> = [
  ['COVID-19', 'new_cases_daily'],
  ['COVID-19', 'new_deaths_daily'],
  ['Influenza', 'weekly_hospital_admissions_rate'],
  ['Influenza', 'weekly_positivity'],
]

test.each(charts)('Returns a chart for the %s topic and %s metric', async (topic, metric) => {
  const result = await getCharts({
    topic,
    metric,
    chart_type: 'line_with_shaded_section',
  })

  const fixture = fs.readFileSync(path.resolve(`./src/api/mocks/charts/fixtures/${topic}/${metric}.svg`), {
    encoding: 'utf8',
  })

  expect(result).toEqual(fixture)
})

test('Handles generic http error statuses (404, 500)', async () => {
  server.use(
    rest.post(`${getApiBaseUrl()}/charts/v2`, (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )

  await expect(
    getCharts({
      topic: 'COVID-19',
      metric: 'new_cases_7days_sum',
      chart_type: 'line_with_shaded_section',
    })
  ).rejects.toThrow('Request failed with status code 404 Not Found')

  server.use(
    rest.post(`${getApiBaseUrl()}/charts/v2`, (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  await expect(
    getCharts({
      topic: 'COVID-19',
      metric: 'new_cases_7days_sum',
      chart_type: 'line_with_shaded_section',
    })
  ).rejects.toThrow('Request failed with status code 500 Internal Server Error')
})
