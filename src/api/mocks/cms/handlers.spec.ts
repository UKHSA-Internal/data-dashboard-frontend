import { server } from '@/api/msw/server'
import 'whatwg-fetch'
import { influenzaPageMock } from './data/page/influenza'
import { covidPageMock } from './data/page/sars-cov-2'
import { pagesWithTopicTypeMock } from './data/pages'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/v2`

test('GET /pages?type=topic.TopicPage returns a list of pages with a topic type', async () => {
  const res = await fetch(`${baseUrl}/pages?type=topic.TopicPage`)
  const json = await res.json()

  expect(res.status).toEqual(200)
  expect(json).toEqual(pagesWithTopicTypeMock)
})

test('GET /pages/5 returns an influenza page object', async () => {
  const res = await fetch(`${baseUrl}/pages/5`)
  const json = await res.json()

  expect(res.status).toEqual(200)
  expect(json).toEqual(influenzaPageMock)
})

test('GET /pages/6 returns a covid-19 page object', async () => {
  const res = await fetch(`${baseUrl}/pages/6`)
  const json = await res.json()

  expect(res.status).toEqual(200)
  expect(json).toEqual(covidPageMock)
})
