import z from 'zod'
import 'whatwg-fetch'
import { rest } from 'msw'
import { server } from '@/api/msw/server'
import { getTrends, responseSchema } from './getTrends'
import { getApiBaseUrl } from '../helpers'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>
type ErrorResponse = z.SafeParseError<z.infer<typeof responseSchema>>

test('Returns a COVID-19 trend', async () => {
  const result = await getTrends({
    topic: 'COVID-19',
    metric: 'new_cases_7days_sum',
    percentage_metric: 'new_cases_7days_change_percentage',
  })

  expect(result).toEqual<SuccessResponse>({
    success: true,
    data: {
      value: -592,
      percentage_value: -3,
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
      value: 5911,
      percentage_value: 0.3,
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
          value: 5911,
          direction: 'down',
          colour: 'yellow',
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
        expected: 'number',
        received: 'nan',
        path: ['percentage_value'],
        message: 'Expected number, received nan',
      },
      {
        received: 'yellow',
        code: 'invalid_enum_value',
        options: ['green', 'red', 'neutral'],
        path: ['colour'],
        message: "Invalid enum value. Expected 'green' | 'red' | 'neutral', received 'yellow'",
      },
    ]),
  })
})

test('Handles generic http error statuses (404, 500)', async () => {
  server.use(
    rest.get(`${getApiBaseUrl()}/trends/v2`, (req, res, ctx) => {
      return res(ctx.status(404), ctx.json({}))
    })
  )

  await expect(
    getTrends({
      topic: 'COVID-19',
      metric: 'new_cases_7days_sum',
      percentage_metric: 'new_cases_7days_change_percentage',
    })
  ).rejects.toThrow('Request failed with status code 404 Not Found')

  server.use(
    rest.get(`${getApiBaseUrl()}/trends/v2`, (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({}))
    })
  )

  await expect(
    getTrends({
      topic: 'COVID-19',
      metric: 'new_cases_7days_sum',
      percentage_metric: 'new_cases_7days_change_percentage',
    })
  ).rejects.toThrow('Request failed with status code 500 Internal Server Error')
})
