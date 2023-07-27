import { NextApiRequest, NextApiResponse } from 'next'
import { createMocks, createRequest, createResponse } from 'node-mocks-http'

import { logger } from '@/lib/logger'

import health from '../../../pages/api/health'

jest.mock('@/lib/logger')

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>

test('GET /api/heath', async () => {
  const { req, res } = createMocks<ApiRequest, APiResponse>({
    method: 'GET',
  })

  await health(req, res)

  expect(logger.info).toHaveBeenCalledWith('GET /api/health - FE is healthy')
  expect(res._getStatusCode()).toBe(200)
  expect(JSON.parse(res._getData())).toEqual({ status: 'ok' })
})
