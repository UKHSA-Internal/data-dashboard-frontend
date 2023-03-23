import { server } from '@/api/msw/server'
import { getStatsApiPath } from '@/api/requests/helpers'
import 'whatwg-fetch'
import { coronavirusStatsMock } from './data/topics/coronavirus'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

const baseUrl = getStatsApiPath()

test('GET /stats/coronavirus returns the correct stats mock', async () => {
  const res = await fetch(`${baseUrl}/coronavirus`)
  const json = await res.json()

  expect(res.status).toEqual(200)
  expect(json).toEqual(coronavirusStatsMock)
})
