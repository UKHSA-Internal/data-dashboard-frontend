import { server } from '@/api/msw/server'
import { PageType } from '@/api/requests/cms/getPages'
import { getCmsApiPath, requestOptions } from '@/api/requests/helpers'
import 'whatwg-fetch'
import { mockedPagesMap, mockedPageMap } from './handlers'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

const baseUrl = getCmsApiPath()

test.each(Object.keys(mockedPagesMap))('GET /pages?type=%s returns the correct pages mock', async (pageType) => {
  const res = await fetch(`${baseUrl}?type=${pageType}`, requestOptions)
  const json = await res.json()

  expect(res.status).toEqual(200)
  expect(json).toEqual(mockedPagesMap[pageType as PageType])
})

test.each(Object.keys(mockedPagesMap))('GET /pages?type=%s returns 403 with invalid api key', async (pageType) => {
  const res = await fetch(`${baseUrl}?type=${pageType}`, { headers: { Authorization: 'not-valid' } })
  const json = await res.json()

  expect(res.status).toEqual(403)
  expect(json).toEqual({ detail: 'You do not have permission to perform this action' })
})

test.each(Object.keys(mockedPageMap))('GET /pages/%i returns the correct page object', async (pageId) => {
  const res = await fetch(`${baseUrl}/${pageId}`, requestOptions)
  const json = await res.json()

  expect(res.status).toEqual(200)
  expect(json).toEqual(mockedPageMap[Number(pageId)])
})

test.each(Object.keys(mockedPageMap))('GET /pages/%i returns 403 with invalid api key', async (pageId) => {
  const res = await fetch(`${baseUrl}/${pageId}`, { headers: { Authorization: 'not-valid' } })
  const json = await res.json()

  expect(res.status).toEqual(403)
  expect(json).toEqual({ detail: 'You do not have permission to perform this action' })
})
