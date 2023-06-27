import { rest } from 'msw'

import { apiResolver } from '@/api/msw/resolvers/api-resolver'
import { PageResponse } from '@/api/requests/cms/getPage'
import { PagesResponse, PageType } from '@/api/requests/cms/getPages'
import { getCmsApiPath } from '@/api/requests/helpers'
import { logger } from '@/lib/logger'

import {
  aboutPageMock,
  coronavirusPageMock,
  homePageMock,
  howToUseThisDataPageMock,
  influenzaPageMock,
  mapsPageMock,
  otherRespiratoryVirusesPageMock,
  whatsNewPageMock,
} from './data/page'
import { pagesWithCommonTypeMock, pagesWithHomeTypeMock, pagesWithTopicTypeMock } from './data/pages'

const baseUrl = getCmsApiPath()

// Contains the `/pages` mocks for the different page types
export const mockedPagesMap: Record<PageType, PagesResponse> = {
  [PageType.Home]: pagesWithHomeTypeMock,
  [PageType.Topic]: pagesWithTopicTypeMock,
  [PageType.Common]: pagesWithCommonTypeMock,
}

// Contains the individual `/pages/{id}` mocks
export const mockedPageMap: Record<number, PageResponse<PageType>> = {
  [homePageMock.id]: homePageMock,
  [aboutPageMock.id]: aboutPageMock,
  [whatsNewPageMock.id]: whatsNewPageMock,
  [mapsPageMock.id]: mapsPageMock,
  [howToUseThisDataPageMock.id]: howToUseThisDataPageMock,
  [aboutPageMock.id]: aboutPageMock,
  [influenzaPageMock.id]: influenzaPageMock,
  [coronavirusPageMock.id]: coronavirusPageMock,
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
