import 'whatwg-fetch'

import { rest } from 'msw'
import z from 'zod'

import { server } from '@/api/msw/server'
import { logger } from '@/lib/logger'

import { getApiBaseUrl } from '../helpers'
import { getTrends, responseSchema } from './getTrends'

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
          metric_name: null,
          metric_value: '-592', // <--- Wrong type (should get coerced automatically by Zod)
          percentage_metric_name: 'new_cases_7days_change_percentage',
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
        code: 'invalid_type',
        expected: 'string',
        received: 'null',
        path: ['metric_name'],
        message: 'Expected string, received null',
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
