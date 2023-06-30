import { NextApiRequest, NextApiResponse } from 'next'
import { createMocks, createRequest, createResponse } from 'node-mocks-http'

import health from '../../../pages/api/health'

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>

test('GET /api/heath', async () => {
  const { req, res } = createMocks<ApiRequest, APiResponse>({
    method: 'GET',
  })

  await health(req, res)

  expect(res._getStatusCode()).toBe(200)
  expect(JSON.parse(res._getData())).toEqual({ status: 'ok' })
})
