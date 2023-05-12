import z from 'zod'
import 'whatwg-fetch'
import { rest } from 'msw'
import { server } from '@/api/msw/server'
import { getCmsApiPath } from '../helpers'
import { logger } from '@/lib/logger'
import { getPages, PageType, responseSchema } from './getPages'

jest.mock('@/lib/logger')

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>
type ErrorResponse = z.SafeParseError<z.infer<typeof responseSchema>>

test('Returns a list of cms pages by type', async () => {
  const result = await getPages(PageType.Home)

  expect(result).toEqual<SuccessResponse>({
    success: true,
    data: {
      items: [
        {
          id: 1,
          meta: {
            detail_url: 'http://localhost/api/v2/pages/1/',
            first_published_at: '2023-03-10T10:57:35.324472Z',
            html_url: 'http://localhost/home-page/',
            slug: 'respiratory-viruses',
            type: 'home.HomePage',
          },
          title: 'Respiratory viruses',
        },
      ],
      meta: {
        total_count: 1,
      },
    },
  })
})

test('Handles invalid json received from the api', async () => {
  server.use(
    rest.get(getCmsApiPath(), (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          items: null,
          meta: {
            total_count: 1,
          },
        })
      )
    })
  )
  const result = await getPages(PageType.Common)

  expect(result).toEqual<ErrorResponse>({
    success: false,
    error: new z.ZodError([
      {
        code: 'invalid_type',
        expected: 'array',
        received: 'null',
        path: ['items'],
        message: 'Expected array, received null',
      },
    ]),
  })
})

test('Handles generic http errors', async () => {
  server.use(
    rest.get(getCmsApiPath(), (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )

  const result = await getPages(PageType.Common)

  expect(logger.error).toHaveBeenCalledTimes(1)

  expect(result).toEqual<ErrorResponse>({
    success: false,
    error: new z.ZodError([
      {
        code: 'invalid_type',
        expected: 'array',
        received: 'undefined',
        path: ['items'],
        message: 'Required',
      },
      {
        code: 'invalid_type',
        expected: 'object',
        received: 'undefined',
        path: ['meta'],
        message: 'Required',
      },
    ]),
  })
})
