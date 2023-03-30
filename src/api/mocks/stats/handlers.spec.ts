import { server } from '@/api/msw/server'
import { getStatsApiPath } from '@/api/requests/helpers'
import 'whatwg-fetch'
import { coronavirusStatsMock } from './data/topics/coronavirus'
import { influenzaStatsMock } from './data/topics/influenza'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

const baseUrl = getStatsApiPath()

test('GET /stats/COVID-19 returns the correct stats mock', async () => {
  const res = await fetch(`${baseUrl}/COVID-19`)
  const json = await res.json()

  expect(res.status).toEqual(200)
  expect(json).toEqual(coronavirusStatsMock)
})

test('GET /stats/Influenza returns the correct stats mock', async () => {
  const res = await fetch(`${baseUrl}/Influenza`)
  const json = await res.json()

  expect(res.status).toEqual(200)
  expect(json).toEqual(influenzaStatsMock)
})
