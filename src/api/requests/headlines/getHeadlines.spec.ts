import z from 'zod'
import 'whatwg-fetch'
import { rest } from 'msw'
import { server } from '@/api/msw/server'
import { getHeadlines, responseSchema } from './getHeadlines'
import { getApiBaseUrl } from '../helpers'
import { fixtures } from '@/api/mocks/headlines/fixtures'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>
type ErrorResponse = z.SafeParseError<z.infer<typeof responseSchema>>

test('Returns a headline value', async () => {
  const result = await getHeadlines({
    topic: 'COVID-19',
    geography: 'England',
    geography_type: 'Nation',
    metric: 'new_cases_7days_sum',
  })

  expect(result).toEqual<SuccessResponse>({
    success: true,
    data: fixtures['new_cases_7days_sum'],
  })
})

test('Handles invalid json received from the api', async () => {
  server.use(
    rest.get(`${getApiBaseUrl()}/headlines`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ value: 123 }))
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
        expected: 'string',
        received: 'number',
        path: ['value'],
        message: 'Expected string, received number',
      },
    ]),
  })
})

test('Handles generic http error statuses (404, 500)', async () => {
  server.use(
    rest.get(`${getApiBaseUrl()}/headlines`, (req, res, ctx) => {
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
    rest.get(`${getApiBaseUrl()}/headlines`, (req, res, ctx) => {
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
