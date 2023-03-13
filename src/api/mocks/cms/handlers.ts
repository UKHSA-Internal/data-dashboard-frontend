import { rest } from 'msw'
import { pagesWithTopicTypeMock } from './data/pages'
import { influenzaPageMock, covidPageMock } from './data/page'
import { getCmsApiPath } from '@/api/requests/helpers'

const baseUrl = getCmsApiPath()

export const handlers = [
  rest.get(`${baseUrl}/pages`, (req, res, ctx) => {
    const searchParams = req.url.searchParams

    if (
      searchParams.has('type') &&
      searchParams.get('type') === 'topic.TopicPage'
    ) {
      return res(ctx.status(200), ctx.json(pagesWithTopicTypeMock))
    }
  }),
  rest.get(`${baseUrl}/pages/:id`, (req, res, ctx) => {
    const pageId = req.params.id

    if (Number(pageId) === 5) {
      return res(ctx.status(200), ctx.json(influenzaPageMock))
    }

    if (Number(pageId) === 6) {
      return res(ctx.status(200), ctx.json(covidPageMock))
    }
  }),
]
