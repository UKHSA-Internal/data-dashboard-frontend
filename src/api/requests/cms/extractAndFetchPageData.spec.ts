import { rest } from 'msw'

import { respiratoryVirusesMock } from '@/api/mocks/cms/data/page'
import { server } from '@/api/msw/server'

import { getApiBaseUrl } from '../helpers'
import { pageDataMockMixed } from './__mocks__/pageDataMixed'
import { pageDataMockSuccess } from './__mocks__/pageDataSuccess'
import { extractAndFetchPageData } from './extractAndFetchPageData'

jest.mock('@/lib/logger')

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('Parses the cms page, fetches data from found sources and returns an orchestrated response', async () => {
  const result = await extractAndFetchPageData(respiratoryVirusesMock.body)
  expect(result).toStrictEqual(pageDataMockSuccess)
})

test('Handles errors individually per request', async () => {
  // Mock trends api to return a 404 simulating an error scenario
  server.use(
    rest.get(`${getApiBaseUrl()}/trends/v2`, (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )

  const result = await extractAndFetchPageData(respiratoryVirusesMock.body)

  expect(result).toStrictEqual(pageDataMockMixed)
})
