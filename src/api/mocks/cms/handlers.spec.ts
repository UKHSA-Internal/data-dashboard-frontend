import { server } from '@/api/msw/server'
import { PageType } from '@/api/requests/cms/getPages'
import { getCmsApiPath } from '@/api/requests/helpers'
import 'whatwg-fetch'
import { mockedPagesMap, mockedPageMap } from './handlers'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

const baseUrl = getCmsApiPath()

test.each(Object.keys(mockedPagesMap))('GET /pages?type=%s returns the correct pages mock', async (pageType) => {
  const res = await fetch(`${baseUrl}?type=${pageType}`)
  const json = await res.json()

  expect(res.status).toEqual(200)
  expect(json).toEqual(mockedPagesMap[pageType as PageType])
})

test.each(Object.keys(mockedPageMap))('GET /pages/%i returns the correct page object', async (pageId) => {
  const res = await fetch(`${baseUrl}/${pageId}`)
  const json = await res.json()

  expect(res.status).toEqual(200)
  expect(json).toEqual(mockedPageMap[Number(pageId)])
})
