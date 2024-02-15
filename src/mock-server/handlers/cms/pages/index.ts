import { Request, Response } from 'express'

import { PagesResponse, PageType } from '@/api/requests/cms/getPages'
import { logger } from '@/lib/logger'

import { accessOurDataChildMocks, accessOurDataParentMock } from './fixtures/page/access-our-data'
import {
  allPagesMock,
  pagesWithCommonTypeMock,
  pagesWithCompositeTypeMock,
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
  'composite.CompositePage': pagesWithCompositeTypeMock,
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

    // filter all items where has a parent of ID
    if (req.query.child_of && Number(req.query.child_of) === accessOurDataParentMock.id) {
      return res.json({
        ...allPagesMock,
        items: accessOurDataChildMocks,
      })
    }

    if (!req.query.type) {
      if (req.query.show_in_menus === 'true') {
        return res.json({ ...allPagesMock, items: allPagesMock.items.filter((page) => page.meta.show_in_menus) })
      }
      return res.json(allPagesMock)
    }

    const pageType = req.query.type as PageType
    const limit = parseInt(req.query.limit as string, 10) || 10 // Default limit to 10 if not provided
    const offset = parseInt(req.query.offset as string, 10) || 0 // Default offset to 0 if not provided

    const pageData = mockedPagesMap[pageType]

    if (req.query.search && req.query.search !== '') {
      const unfilteredData = mockedPagesMap['metrics_documentation.MetricsDocumentationChildEntry']

      const filteredData = unfilteredData.items.filter(({ title }) =>
        title.includes(req.query.search?.toString() ?? '')
      )

      if (filteredData) {
        return res.json({
          meta: {
            total_count: filteredData.length,
          },
          items: filteredData,
        })
      }
    }

    // Apply pagination based on the provided limit and offset
    return res.json({
      ...pageData,
      items: pageData.items.slice(offset, offset + limit),
    })
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
