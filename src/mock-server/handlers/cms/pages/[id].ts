import { Request, Response } from 'express'

import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'
import { getSwitchBoardState } from '@/app/(pages)/switchboard/shared/state'
import { logger } from '@/lib/logger'

import {
  aboutPageMock,
  accessibilityStatementPageMock,
  accessOurDataChildMocks,
  accessOurDataParentMock,
  archiveDataPageMock,
  bulkDownloadsPageMock,
  compliancePageMock,
  cookiesPageMock,
  covid19PageMock,
  dashboardMock,
  feedbackMock,
  influenzaPageMock,
  landingPageMock,
  metricsChildMocks,
  metricsParentMock,
  otherRespiratoryVirusesPageMock,
  respiratoryVirusesMock,
  vaccinationCoverageMock,
  weatherHealthAlertsChildMocks,
  weatherHealthAlertsParentMock,
  whatsComingPageMock,
  whatsNewChildMocks,
  whatsNewParentMock,
} from './fixtures/page'

// Contains the individual `/pages/{id}` mocks
export const mockedPageMap: Record<number, PageResponse<PageType>> = {
  [dashboardMock.id]: dashboardMock,
  [cookiesPageMock.id]: cookiesPageMock,
  [accessibilityStatementPageMock.id]: accessibilityStatementPageMock,
  [compliancePageMock.id]: compliancePageMock,
  [archiveDataPageMock.id]: archiveDataPageMock,
  [bulkDownloadsPageMock.id]: bulkDownloadsPageMock,
  [aboutPageMock.id]: aboutPageMock,
  [whatsComingPageMock.id]: whatsComingPageMock,
  [influenzaPageMock.id]: influenzaPageMock,
  [covid19PageMock.id]: covid19PageMock,
  [otherRespiratoryVirusesPageMock.id]: otherRespiratoryVirusesPageMock,
  [whatsNewParentMock.id]: whatsNewParentMock,
  [metricsParentMock.id]: metricsParentMock,
  [accessOurDataParentMock.id]: accessOurDataParentMock,
  [weatherHealthAlertsParentMock.id]: weatherHealthAlertsParentMock,
  [landingPageMock.id]: landingPageMock,
  [respiratoryVirusesMock.id]: respiratoryVirusesMock,
  [feedbackMock.id]: feedbackMock,
  [vaccinationCoverageMock.id]: vaccinationCoverageMock,
  ...Object.fromEntries(whatsNewChildMocks.map((mock) => [mock.id, mock])),
  ...Object.fromEntries(metricsChildMocks.map((mock) => [mock.id, mock])),
  ...Object.fromEntries(accessOurDataChildMocks.map((mock) => [mock.id, mock])),
  ...Object.fromEntries(weatherHealthAlertsChildMocks.map((mock) => [mock.id, mock])),
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

    const {
      api: {
        pages: {
          detail: { status },
        },
      },
    } = getSwitchBoardState(req.headers.cookie)

    const pageId = Number(req.params.id)

    if (mockedPageMap[pageId]) {
      return res.status(status).json({
        ...mockedPageMap[pageId],
      })
    }
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
