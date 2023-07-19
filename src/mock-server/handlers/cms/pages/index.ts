import { Request, Response } from 'express'

import { PagesResponse, PageType } from '@/api/requests/cms/getPages'
import { logger } from '@/lib/logger'

import { allPagesMock, pagesWithCommonTypeMock, pagesWithHomeTypeMock, pagesWithTopicTypeMock } from './fixtures/pages'

// Contains the `/pages` fixtures for the different cms page types
export const mockedPagesMap: Record<PageType, PagesResponse> = {
  'home.HomePage': pagesWithHomeTypeMock,
  'topic.TopicPage': pagesWithTopicTypeMock,
  'common.CommonPage': pagesWithCommonTypeMock,
}

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    if (!req.query['type']) {
      return res.json(allPagesMock)
    }

    return res.json(mockedPagesMap[req.query['type'] as PageType])
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
