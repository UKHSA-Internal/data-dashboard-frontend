import { NextApiRequest, NextApiResponse } from 'next'
import { createMocks, createRequest, createResponse } from 'node-mocks-http'

import { logger } from '@/lib/logger'

import chooseTopic from '../../../pages/api/choose-topic'

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>

jest.mock('@/lib/logger')

describe('POST /api/choose-topic', () => {
  test('redirects to the topic page based on the provided topic', async () => {
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: 'POST',
      body: {
        topic: 'coronavirus',
      },
    })

    await chooseTopic(req, res)

    expect(res._getStatusCode()).toBe(302)
    expect(res._getRedirectUrl()).toBe('/choose-topic/coronavirus')
  })

  test('returns a 405 if the method is not POST', async () => {
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: 'GET',
    })

    await chooseTopic(req, res)

    expect(res._getStatusCode()).toBe(405)
    expect(logger.error).toHaveBeenCalledWith('Unsupported request method GET')
  })

  test('redirects to the 500 page if no topic is provided', async () => {
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: 'POST',
      body: {
        topic: undefined,
      },
    })

    await chooseTopic(req, res)

    expect(res._getStatusCode()).toBe(302)
    expect(res._getRedirectUrl()).toBe('/500')
    expect(logger.error).toHaveBeenCalledWith(new Error('Missing topic'))
  })
})
