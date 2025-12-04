/**
 * @jest-environment node
 */
import { GET } from './route'

jest.mock('@/lib/logger')

test('GET /api/heath', async () => {
  const res = await GET()

  expect(res.status).toBe(200)
  expect(await res.json()).toEqual({ status: 'ok' })
})
