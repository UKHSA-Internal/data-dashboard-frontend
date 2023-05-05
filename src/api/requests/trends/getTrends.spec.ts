import z from 'zod'
import 'whatwg-fetch'
import { rest } from 'msw'
import { server } from '@/api/msw/server'
import { getTrends, responseSchema } from './getTrends'
import { getApiBaseUrl } from '../helpers'
import { logger } from '@/lib/logger'

jest.mock('@/lib/logger')

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>
type ErrorResponse = z.SafeParseError<z.infer<typeof responseSchema>>

test('Returns a COVID-19 trend', async () => {
  const result = await getTrends({
    topic: 'COVID-19',
    metric: 'new_cases_7days_change',
    percentage_metric: 'new_cases_7days_change_percentage',
  })

  expect(result).toEqual<SuccessResponse>({
    success: true,
    data: {
      metric_name: 'new_cases_7days_change',
      metric_value: -592,
      percentage_metric_name: 'new_cases_7days_change_percentage',
      percentage_metric_value: -3,
      direction: 'down',
      colour: 'green',
    },
  })
})

test('Returns an Influenza headline value', async () => {
  const result = await getTrends({
    topic: 'Influenza',
    metric: 'weekly_hospital_admissions_rate_change',
    percentage_metric: 'weekly_hospital_admissions_rate_change_percentage',
  })

  expect(result).toEqual<SuccessResponse>({
    success: true,
    data: {
      metric_name: 'weekly_hospital_admissions_rate_change',
      metric_value: 5911,
      percentage_metric_name: 'weekly_hospital_admissions_rate_change_percentage',
      percentage_metric_value: 0.3,
      direction: 'down',
      colour: 'green',
    },
  })
})

test('Handles invalid json received from the api', async () => {
  server.use(
    rest.get(`${getApiBaseUrl()}/trends/v2`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          metric_name: 'new_cases_7days_sum',
          metric_value: '-592', // <--- Wrong type (should get coerced automatically by Zod)
          percentage_metric_name: 'does_not_exist', // <--- Invalid percentage_metric
          percentage_metric_value: -3.0,
          colour: '', // <--- Missing colour
          direction: 'down',
        })
      )
    })
  )

  const result = await getTrends({
    topic: 'COVID-19',
    metric: 'new_cases_7days_sum',
    percentage_metric: 'new_cases_7days_change_percentage',
  })

  expect(result).toEqual<ErrorResponse>({
    success: false,
    error: new z.ZodError([
      {
        received: 'does_not_exist',
        code: 'invalid_enum_value',
        options: [
          'new_cases_7days_change_percentage',
          'new_deaths_7days_change_percentage',
          'new_admissions_7days_change_percentage',
          'positivity_7days_change_percentage',
          'new_tests_7days_change_percentage',
          'vaccinations_percentage',
          'vaccinations_percentage',
          'weekly_hospital_admissions_rate_change_percentage',
          'weekly_icu_admissions_rate_change_percentage',
        ],
        path: ['percentage_metric_name'],
        message:
          "Invalid enum value. Expected 'new_cases_7days_change_percentage' | 'new_deaths_7days_change_percentage' | 'new_admissions_7days_change_percentage' | 'positivity_7days_change_percentage' | 'new_tests_7days_change_percentage' | 'vaccinations_percentage' | 'vaccinations_percentage' | 'weekly_hospital_admissions_rate_change_percentage' | 'weekly_icu_admissions_rate_change_percentage', received 'does_not_exist'",
      },
      {
        received: '',
        code: 'invalid_enum_value',
        options: ['green', 'red', 'neutral'],
        path: ['colour'],
        message: "Invalid enum value. Expected 'green' | 'red' | 'neutral', received ''",
      },
    ]),
  })
})

test('Handles generic http errors', async () => {
  server.use(
    rest.get(`${getApiBaseUrl()}/trends/v2`, (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )

  const result = await getTrends({
    topic: 'COVID-19',
    metric: 'new_cases_7days_sum',
    percentage_metric: 'new_cases_7days_change_percentage',
  })

  expect(logger.error).toHaveBeenCalledTimes(1)

  expect(result).toMatchObject({
    success: false,
  })
})
