import { server } from '@/api/msw/server'
import { getTabular, responseSchema } from './getTabular'
import { z } from 'zod'
import {
  weeklyHospitalAdmissionsRateValues,
  weeklyPositivityValues,
  newCasesDailyValues,
  newDeathsDailyValues,
} from '@/api/mocks/tabular/fixtures'
import type { Metrics, Topics } from '@/api/models'
import { rest } from 'msw'
import { getApiBaseUrl } from '../helpers'
import { logger } from '@/lib/logger'

jest.mock('@/lib/logger')

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

type Response = z.infer<typeof responseSchema>
type SuccessResponse = z.SafeParseSuccess<Response>
type ErrorResponse = z.SafeParseError<Response>

const tabularMocks: Array<[Topics, Metrics, Response]> = [
  ['COVID-19', 'new_cases_daily', newCasesDailyValues],
  ['COVID-19', 'new_deaths_daily', newDeathsDailyValues],
  ['Influenza', 'weekly_hospital_admissions_rate', weeklyHospitalAdmissionsRateValues],
  ['Influenza', 'weekly_positivity', weeklyPositivityValues],
]

test.each(tabularMocks)('Returns tabular data for the %s topic and %s metric', async (topic, metric, data) => {
  const result = await getTabular([{ topic, metric }])

  expect(result).toEqual<SuccessResponse>({ success: true, data })
})

test('Handles invalid json received from the api', async () => {
  server.use(
    rest.post(`${getApiBaseUrl()}/tables/v2`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}))
    })
  )

  const result = await getTabular([
    {
      topic: 'COVID-19',
      metric: 'new_cases_daily',
    },
  ])

  expect(result).toEqual<ErrorResponse>({
    success: false,
    error: new z.ZodError([
      {
        code: 'invalid_type',
        expected: 'array',
        received: 'object',
        path: [],
        message: 'Expected array, received object',
      },
    ]),
  })
})

test('Handles generic http error', async () => {
  server.use(
    rest.post(`${getApiBaseUrl()}/tables/v2`, (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )

  const result = await getTabular([
    {
      topic: 'COVID-19',
      metric: 'new_cases_daily',
    },
  ])

  expect(logger.error).toHaveBeenCalledTimes(1)

  expect(result).toEqual<ErrorResponse>({
    success: false,
    error: new z.ZodError([
      {
        code: 'invalid_type',
        expected: 'array',
        received: 'object',
        path: [],
        message: 'Expected array, received object',
      },
    ]),
  })
})
