import { Request, Response } from 'express'

import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'
import { logger } from '@/lib/logger'

import {
  aboutPageMock,
  accessibilityStatementPageMock,
  bulkDownloadsPageMock,
  compliancePageMock,
  cookiesPageMock,
  covid19PageMock,
  dashboardMock,
  howToUseThisDataPageMock,
  influenzaPageMock,
  mapsPageMock,
  otherRespiratoryVirusesPageMock,
  whatsNewChildMocks,
  whatsNewParentMock,
} from './fixtures/page'

// Contains the individual `/pages/{id}` mocks
export const mockedPageMap: Record<number, PageResponse<PageType>> = {
  [dashboardMock.id]: dashboardMock,
  [aboutPageMock.id]: aboutPageMock,
  [mapsPageMock.id]: mapsPageMock,
  [howToUseThisDataPageMock.id]: howToUseThisDataPageMock,
  [cookiesPageMock.id]: cookiesPageMock,
  [accessibilityStatementPageMock.id]: accessibilityStatementPageMock,
  [compliancePageMock.id]: compliancePageMock,
  [bulkDownloadsPageMock.id]: bulkDownloadsPageMock,
  [aboutPageMock.id]: aboutPageMock,
  [influenzaPageMock.id]: influenzaPageMock,
  [covid19PageMock.id]: covid19PageMock,
  [otherRespiratoryVirusesPageMock.id]: otherRespiratoryVirusesPageMock,
  [whatsNewParentMock.id]: whatsNewParentMock,
  [whatsNewChildMocks[0].id]: whatsNewChildMocks[0],
  [whatsNewChildMocks[1].id]: whatsNewChildMocks[1],
  [whatsNewChildMocks[2].id]: whatsNewChildMocks[2],
}

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    if (!req.params['id']) {
      logger.error('Missing id searchParam')
      return res.status(500)
    }

    const pageId = Number(req.params.id)

    if (mockedPageMap[pageId]) {
      return res.json(mockedPageMap[pageId])
    }
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
