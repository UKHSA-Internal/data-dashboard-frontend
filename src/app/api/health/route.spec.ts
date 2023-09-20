/**
 * @jest-environment node
 */
import { logger } from '@/lib/logger'

import { GET } from './route'

jest.mock('@/lib/logger')

test('GET /api/heath', async () => {
  const res = await GET()

  expect(logger.info).toHaveBeenCalledWith('GET /api/health - FE is healthy')
  expect(res.status).toBe(200)
  expect(await res.json()).toEqual({ status: 'ok' })
})
