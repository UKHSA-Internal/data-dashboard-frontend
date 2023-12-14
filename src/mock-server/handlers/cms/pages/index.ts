import { Request, Response } from 'express'

import { PagesResponse, PageType } from '@/api/requests/cms/getPages'
import { logger } from '@/lib/logger'

import {
  allPagesMock,
  pagesWithCommonTypeMock,
  pagesWithHomeTypeMock,
  pagesWithMetricsChildTypeMock,
  pagesWithMetricsParentTypeMock,
  pagesWithTopicTypeMock,
  pagesWithWhatsNewChildTypeMock,
  pagesWithWhatsNewParentTypeMock,
} from './fixtures/pages'

// Contains the `/pages` fixtures for the different cms page types
export const mockedPagesMap: Record<PageType, PagesResponse> = {
  'home.HomePage': pagesWithHomeTypeMock,
  'topic.TopicPage': pagesWithTopicTypeMock,
  'common.CommonPage': pagesWithCommonTypeMock,
  'whats_new.WhatsNewParentPage': pagesWithWhatsNewParentTypeMock,
  'whats_new.WhatsNewChildEntry': pagesWithWhatsNewChildTypeMock,
  'metrics_documentation.MetricsDocumentationParentPage': pagesWithMetricsParentTypeMock,
  'metrics_documentation.MetricsDocumentationChildEntry': pagesWithMetricsChildTypeMock,
}

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    if (!req.query['type']) {
      if (req.query.show_in_menus === 'true') {
        res.json({ ...allPagesMock, items: allPagesMock.items.filter((page) => page.meta.show_in_menus) })
      }
      return res.json(allPagesMock)
    }

    const pages = mockedPagesMap[req.query['type'] as PageType]

    return pages
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
