import { server } from '@/api/msw/server'
import { getTabular, responseSchema } from './getTabular'
import { z } from 'zod'
import {
  weeklyHospitalAdmissionsRateValues,
  weeklyPositivityLatestValues,
  newCasesDailyValues,
  newDeathsDailyValues,
} from '@/api/mocks/tabular/fixtures'
import { Metrics, Topics } from '@/api/models'
import { rest } from 'msw'
import { getApiBaseUrl } from '../helpers'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>

type Topic = z.infer<typeof Topics>
type Metric = z.infer<typeof Metrics>
type Mock = z.infer<typeof responseSchema>

const tabularMocks: Array<[Topic, Metric, Mock]> = [
  ['COVID-19', 'new_cases_daily', newCasesDailyValues],
  ['COVID-19', 'new_deaths_daily', newDeathsDailyValues],
  ['Influenza', 'weekly_hospital_admissions_rate', weeklyHospitalAdmissionsRateValues],
  ['Influenza', 'weekly_positivity_latest', weeklyPositivityLatestValues],
]

test.each(tabularMocks)('Returns tabular data for the %s topic and %s metric', async (topic, metric, data) => {
  const result = await getTabular({ topic, metric })

  expect(result).toEqual<SuccessResponse>({ success: true, data })
})

test('Handles generic http error statuses (404, 500)', async () => {
  server.use(
    rest.get(`${getApiBaseUrl()}/tabular`, (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )
  await expect(
    getTabular({
      topic: 'COVID-19',
      metric: 'new_cases_daily',
    })
  ).rejects.toThrow('Request failed with status code 404 Not Found')

  server.use(
    rest.get(`${getApiBaseUrl()}/tabular`, (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )
  await expect(
    getTabular({
      topic: 'COVID-19',
      metric: 'new_cases_daily',
    })
  ).rejects.toThrow('Request failed with status code 500 Internal Server Error')
})
