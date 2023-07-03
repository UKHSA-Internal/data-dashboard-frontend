import { NextApiRequest, NextApiResponse } from 'next'
import { createMocks, createRequest, createResponse } from 'node-mocks-http'

import feedback from '@/pages/api/feedback'

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>

jest.mock('@/lib/logger')

test('POST /api/feedback', async () => {
  const { req, res } = createMocks<ApiRequest, APiResponse>({
    method: 'POST',
  })

  await feedback(req, res)

  expect(res._getStatusCode()).toBe(302)
  expect(res._getRedirectUrl()).toBe('/feedback/confirmation')
})
