import { server } from '@/api/msw/server'
import { getStatsApiPath, requestOptions } from '@/api/requests/helpers'
import 'whatwg-fetch'
import { coronavirusStatsMock } from './data/topics/coronavirus'
import { influenzaStatsMock } from './data/topics/influenza'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

const baseUrl = getStatsApiPath()

test('GET /stats/COVID-19 returns the correct stats mock', async () => {
  const res = await fetch(`${baseUrl}/COVID-19`, requestOptions)
  const json = await res.json()

  expect(res.status).toEqual(200)
  expect(json).toEqual(coronavirusStatsMock)
})

test('GET /stats/COVID-19 returns a 403 when the api key is invalid', async () => {
  const res = await fetch(`${baseUrl}/COVID-19`, { headers: { Authorization: 'not-valid' } })
  const json = await res.json()

  expect(res.status).toEqual(403)
  expect(json).toEqual({ detail: 'You do not have permission to perform this action' })
})

test('GET /stats/Influenza returns the correct stats mock', async () => {
  const res = await fetch(`${baseUrl}/Influenza`, requestOptions)
  const json = await res.json()

  expect(res.status).toEqual(200)
  expect(json).toEqual(influenzaStatsMock)
})

test('GET /stats/Influenza returns a 403 when the api key is invalid', async () => {
  const res = await fetch(`${baseUrl}/Influenza`, { headers: { Authorization: 'not-valid' } })
  const json = await res.json()

  expect(res.status).toEqual(403)
  expect(json).toEqual({ detail: 'You do not have permission to perform this action' })
})
