import z from 'zod'
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
    error: expect.any(Object),
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
