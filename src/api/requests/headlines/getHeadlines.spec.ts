import z from 'zod'
import 'whatwg-fetch'
import { rest } from 'msw'
import { server } from '@/api/msw/server'
import { getHeadlines, responseSchema } from './getHeadlines'
import { getApiBaseUrl } from '../helpers'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>
type ErrorResponse = z.SafeParseError<z.infer<typeof responseSchema>>

test('Returns a COVID-19 headline value', async () => {
  const result = await getHeadlines({
    topic: 'COVID-19',
    geography: 'England',
    geography_type: 'Nation',
    metric: 'new_cases_7days_sum',
  })

  expect(result).toEqual<SuccessResponse>({
    success: true,
    data: {
      value: 24298,
    },
  })
})

test('Returns an Influenza headline value', async () => {
  const result = await getHeadlines({
    topic: 'Influenza',
    geography: 'England',
    geography_type: 'Nation',
    metric: 'weekly_positivity_latest',
  })

  expect(result).toEqual<SuccessResponse>({
    success: true,
    data: {
      value: 12.2,
    },
  })
})

test('Handles invalid json received from the api', async () => {
  server.use(
    rest.get(`${getApiBaseUrl()}/headlines/v2`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}))
    })
  )

  const result = await getHeadlines({
    topic: 'COVID-19',
    geography: 'England',
    geography_type: 'Nation',
    metric: 'new_cases_7days_sum',
  })

  expect(result).toEqual<ErrorResponse>({
    success: false,
    error: new z.ZodError([
      {
        code: 'invalid_type',
        expected: 'number',
        received: 'nan',
        path: ['value'],
        message: 'Expected number, received nan',
      },
    ]),
  })
})

test('Handles generic http error statuses (404, 500)', async () => {
  server.use(
    rest.get(`${getApiBaseUrl()}/headlines/v2`, (req, res, ctx) => {
      return res(ctx.status(404), ctx.json({}))
    })
  )

  await expect(
    getHeadlines({
      topic: 'COVID-19',
      geography: 'England',
      geography_type: 'Nation',
      metric: 'new_cases_7days_sum',
    })
  ).rejects.toThrow('Request failed with status code 404 Not Found')

  server.use(
    rest.get(`${getApiBaseUrl()}/headlines/v2`, (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({}))
    })
  )

  await expect(
    getHeadlines({
      topic: 'COVID-19',
      geography: 'England',
      geography_type: 'Nation',
      metric: 'new_cases_7days_sum',
    })
  ).rejects.toThrow('Request failed with status code 500 Internal Server Error')
})
