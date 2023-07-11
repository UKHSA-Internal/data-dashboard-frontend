import { rest } from 'msw'
import { NextApiRequest, NextApiResponse } from 'next'
import { createMocks, createRequest, createResponse } from 'node-mocks-http'

import { server } from '@/api/msw/server'
import { getApiBaseUrl } from '@/api/requests/helpers'
import feedback from '@/pages/api/feedback'

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>

jest.mock('@/lib/logger')

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('Return an error if request method is not POST', async () => {
  const { req, res } = createMocks<ApiRequest, APiResponse>({
    method: 'GET',
  })

  await feedback(req, res)

  expect(res._getStatusCode()).toBe(302)
  expect(res._getRedirectUrl()).toBe('/feedback/?error=1')
})

test('Redirect to confirmation page when valid suggestions are provided', async () => {
  const { req, res } = createMocks<ApiRequest, APiResponse>({
    method: 'POST',
    body: {
      improve_experience: '',
      did_you_find_everything: 'yes',
      reason: '',
      like_to_see: '',
    },
  })

  await feedback(req, res)

  expect(res._getStatusCode()).toBe(302)
  expect(res._getRedirectUrl()).toBe('/feedback/confirmation')
})

test('Redirect to confirmation page when invalid suggestions are provided (form is non-mandatory)', async () => {
  const { req, res } = createMocks<ApiRequest, APiResponse>({
    method: 'POST',
    body: {
      improve_experience: '',
      did_you_find_everything: undefined,
      reason: '',
      like_to_see: '',
    },
  })

  await feedback(req, res)

  expect(res._getStatusCode()).toBe(302)
  expect(res._getRedirectUrl()).toBe('/feedback/confirmation')
})

test('Redirect to error page when an error with the backend API occurs', async () => {
  server.use(
    rest.post(`${getApiBaseUrl()}/suggestions/v1`, (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  const { req, res } = createMocks<ApiRequest, APiResponse>({
    method: 'POST',
    body: {
      improve_experience: '',
      did_you_find_everything: 'no',
      reason: '',
      like_to_see: '',
    },
  })

  await feedback(req, res)

  expect(res._getStatusCode()).toBe(302)
  expect(res._getRedirectUrl()).toBe('/feedback/?error=1')
})
