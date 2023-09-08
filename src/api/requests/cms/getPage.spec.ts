import 'whatwg-fetch'

import { rest } from 'msw'
import z from 'zod'

import { dashboardMock } from '@/api/mocks/cms/data/page'
import { server } from '@/api/msw/server'
import { logger } from '@/lib/logger'

import { getCmsApiPath } from '../helpers'
import { getPage, responseSchema } from './getPage'

jest.mock('@/lib/logger')

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>
type ErrorResponse = z.SafeParseError<z.infer<typeof responseSchema>>

test('Returns a full page from thge cms by id', async () => {
  const result = await getPage(dashboardMock.id)

  expect(result).toEqual<SuccessResponse>({
    success: true,
    data: dashboardMock,
  })
})

test('Handles invalid json received from the api', async () => {
  server.use(
    rest.get(`${getCmsApiPath()}/${dashboardMock.id}`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          ...dashboardMock,
          last_published_at: null,
        })
      )
    })
  )
  const result = await getPage(dashboardMock.id)

  expect(result).toEqual<ErrorResponse>({
    success: false,
    error: expect.any(Object),
  })
})

test('Handles generic http errors', async () => {
  server.use(
    rest.get(`${getCmsApiPath()}/${dashboardMock.id}`, (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )

  const result = await getPage(dashboardMock.id)

  expect(logger.error).toHaveBeenCalledTimes(1)

  expect(result).toEqual<ErrorResponse>({
    success: false,
    error: expect.any(Object),
  })
})
