import 'whatwg-fetch'
import { rest } from 'msw'
import { server } from '@/api/msw/server'
import { getDownloads } from './getDownloads'
import { getApiBaseUrl } from '../helpers'
import { logger } from '@/lib/logger'
import { downloadsJsonFixture } from '@/api/mocks/downloads/fixtures/downloads-json'
import { downloadsCsvFixture } from '@/api/mocks/downloads/fixtures/downloads-csv'

jest.mock('@/lib/logger')

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('Returns chart data in CSV format', async () => {
  const result = await getDownloads([
    {
      topic: 'COVID-19',
      metric: 'new_cases_7days_sum',
      stratum: '',
    },
  ])

  expect(result).toEqual(downloadsCsvFixture)
})

test('Returns chart data in json format', async () => {
  const result = await getDownloads(
    [
      {
        topic: 'COVID-19',
        metric: 'new_cases_7days_sum',
        stratum: '',
      },
    ],
    'json'
  )

  expect(result).toEqual(downloadsJsonFixture)
})

test('Handles generic http errors', async () => {
  server.use(
    rest.post(`${getApiBaseUrl()}/downloads/v2`, (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )

  const result = await getDownloads(
    [
      {
        topic: 'COVID-19',
        metric: 'new_cases_7days_sum',
        stratum: '',
      },
    ],
    'json'
  )

  expect(logger.error).toHaveBeenCalledTimes(1)

  expect(result).toEqual(undefined)
})
