import { rest } from 'msw'
import { Mock } from 'ts-mockery'

import { apiResolver } from '@/api/msw/resolvers/api-resolver'
import { PageResponse } from '@/api/requests/cms/getPage'
import { PagesResponse, PageType } from '@/api/requests/cms/getPages'
import { getCmsApiPath } from '@/api/requests/helpers'
import { logger } from '@/lib/logger'

import {
  aboutPageMock,
  covid19PageMock,
  dashboardMock,
  howToUseThisDataPageMock,
  influenzaPageMock,
  mapsPageMock,
  otherRespiratoryVirusesPageMock,
} from './data/page'
import { pagesWithCommonTypeMock, pagesWithHomeTypeMock, pagesWithTopicTypeMock } from './data/pages'

const baseUrl = getCmsApiPath()

// Contains the `/pages` mocks for the different page types
export const mockedPagesMap: Record<PageType, PagesResponse> = {
  [PageType.Home]: pagesWithHomeTypeMock,
  [PageType.Topic]: pagesWithTopicTypeMock,
  [PageType.Common]: pagesWithCommonTypeMock,
  [PageType.WhatsNewParent]: Mock.of<PagesResponse>({ items: [] }),
  [PageType.WhatsNewChild]: Mock.of<PagesResponse>({ items: [] }),
  [PageType.MetricsParent]: Mock.of<PagesResponse>({ items: [] }),
  [PageType.MetricsChild]: Mock.of<PagesResponse>({ items: [] }),
}

// Contains the individual `/pages/{id}` mocks
export const mockedPageMap: Record<number, PageResponse<PageType>> = {
  [dashboardMock.id]: dashboardMock,
  [aboutPageMock.id]: aboutPageMock,
  [mapsPageMock.id]: mapsPageMock,
  [howToUseThisDataPageMock.id]: howToUseThisDataPageMock,
  [aboutPageMock.id]: aboutPageMock,
  [influenzaPageMock.id]: influenzaPageMock,
  [covid19PageMock.id]: covid19PageMock,
  [otherRespiratoryVirusesPageMock.id]: otherRespiratoryVirusesPageMock,
}

export const handlers = [
  rest.get(
    `${baseUrl}`,
    apiResolver((req, res, ctx) => {
      const searchParams = req.url.searchParams

      if (!searchParams.has('type')) {
        logger.error('Missing type searchParam')
        return res(ctx.status(500))
      }

      const pageType = searchParams.get('type') as PageType

      return res(ctx.status(200), ctx.json(mockedPagesMap[pageType]))
    })
  ),
  rest.get(
    `${baseUrl}/:id`,
    apiResolver((req, res, ctx) => {
      const pageId = Number(req.params.id)

      if (mockedPageMap[pageId]) {
        return res(ctx.status(200), ctx.json(mockedPageMap[pageId]))
      }
    })
  ),
]
