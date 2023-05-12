import z, { ZodError } from 'zod'
import 'whatwg-fetch'
import { rest } from 'msw'
import { server } from '@/api/msw/server'
import { getCmsApiPath } from '../helpers'
import { logger } from '@/lib/logger'
import { getPage, responseSchema } from './getPage'
import { homePageMock } from '@/api/mocks/cms/data/page'

jest.mock('@/lib/logger')

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>
type ErrorResponse = z.SafeParseError<z.infer<typeof responseSchema>>

test('Returns a full page from thge cms by id', async () => {
  const result = await getPage(homePageMock.id)

  expect(result).toEqual<SuccessResponse>({
    success: true,
    data: homePageMock,
  })
})

test('Handles invalid json received from the api', async () => {
  server.use(
    rest.get(`${getCmsApiPath()}/${homePageMock.id}`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          ...homePageMock,
          last_published_at: null,
        })
      )
    })
  )
  const result = await getPage(homePageMock.id)

  expect(result).toEqual<ErrorResponse>({
    success: false,
    error: new z.ZodError([
      {
        code: 'invalid_union',
        unionErrors: [
          new ZodError([
            {
              code: 'invalid_type',
              expected: 'string',
              received: 'null',
              path: ['last_published_at'],
              message: 'Expected string, received null',
            },
          ]),
          new ZodError([
            {
              code: 'invalid_type',
              expected: 'string',
              received: 'null',
              path: ['last_published_at'],
              message: 'Expected string, received null',
            },
            {
              received: 'home.HomePage',
              code: 'invalid_literal',
              expected: 'topic.TopicPage',
              path: ['meta', 'type'],
              message: 'Invalid literal value, expected "topic.TopicPage"',
            },
            {
              code: 'invalid_type',
              expected: 'string',
              received: 'undefined',
              path: ['symptoms'],
              message: 'Required',
            },
            {
              code: 'invalid_type',
              expected: 'string',
              received: 'undefined',
              path: ['transmission'],
              message: 'Required',
            },
            {
              code: 'invalid_type',
              expected: 'string',
              received: 'undefined',
              path: ['treatment'],
              message: 'Required',
            },
            {
              code: 'invalid_type',
              expected: 'string',
              received: 'undefined',
              path: ['prevention'],
              message: 'Required',
            },
            {
              code: 'invalid_type',
              expected: 'string',
              received: 'undefined',
              path: ['surveillance_and_reporting'],
              message: 'Required',
            },
          ]),
          new ZodError([
            {
              code: 'invalid_type',
              expected: 'string',
              received: 'null',
              path: ['last_published_at'],
              message: 'Expected string, received null',
            },
            {
              code: 'invalid_type',
              expected: 'string',
              received: 'array',
              path: ['body'],
              message: 'Expected string, received array',
            },
            {
              received: 'home.HomePage',
              code: 'invalid_literal',
              expected: 'common.CommonPage',
              path: ['meta', 'type'],
              message: 'Invalid literal value, expected "common.CommonPage"',
            },
          ]),
        ],
        path: [],
        message: 'Invalid input',
      },
    ]),
  })
})

test('Handles generic http errors', async () => {
  server.use(
    rest.get(`${getCmsApiPath()}/${homePageMock.id}`, (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )

  const result = await getPage(homePageMock.id)

  expect(logger.error).toHaveBeenCalledTimes(1)

  expect(result).toEqual<ErrorResponse>({
    success: false,
    error: expect.any(Object),
  })
})
