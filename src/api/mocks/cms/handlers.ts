import { rest } from 'msw'
import {
  pagesWithCommonTypeMock,
  pagesWithHomeTypeMock,
  pagesWithTopicTypeMock,
} from './data/pages'
import {
  influenzaPageMock,
  covidPageMock,
  dashboardPageMock,
  aboutPageMock,
  whatsNewPageMock,
  mapsPageMock,
  howToUseThisDataPageMock,
} from './data/page'
import { getCmsApiPath } from '@/api/requests/helpers'
import { PagesResponse, PageType } from '@/api/requests/cms/getPages'
import { PageResponse } from '@/api/requests/cms/getPage'

const baseUrl = getCmsApiPath()

// Contains the `/pages` mocks for the different page types
const mockedPagesMap: Record<PageType, PagesResponse> = {
  [PageType.Home]: pagesWithHomeTypeMock,
  [PageType.Topic]: pagesWithTopicTypeMock,
  [PageType.Common]: pagesWithCommonTypeMock,
}

// Contains the individual `/pages/{id}` mocks
const mockedPageMap: Record<number, PageResponse<unknown>> = {
  [dashboardPageMock.id]: dashboardPageMock,
  [aboutPageMock.id]: aboutPageMock,
  [whatsNewPageMock.id]: whatsNewPageMock,
  [mapsPageMock.id]: mapsPageMock,
  [howToUseThisDataPageMock.id]: howToUseThisDataPageMock,
  [aboutPageMock.id]: aboutPageMock,
  [influenzaPageMock.id]: influenzaPageMock,
  [covidPageMock.id]: covidPageMock,
}

export const handlers = [
  rest.get(`${baseUrl}/pages`, (req, res, ctx) => {
    const searchParams = req.url.searchParams

    if (!searchParams.has('type')) return

    const pageType = searchParams.get('type') as PageType

    return res(ctx.status(200), ctx.json(mockedPagesMap[pageType]))
  }),
  rest.get(`${baseUrl}/pages/:id`, (req, res, ctx) => {
    const pageId = Number(req.params.id)

    if (mockedPageMap[pageId]) {
      return res(ctx.status(200), ctx.json(mockedPageMap[pageId]))
    }
  }),
]
