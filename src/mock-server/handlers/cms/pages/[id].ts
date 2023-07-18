import { Request, Response } from 'express'

import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'
import { logger } from '@/lib/logger'

import {
  aboutPageMock,
  coronavirusPageMock,
  howToUseThisDataPageMock,
  influenzaPageMock,
  mapsPageMock,
  otherRespiratoryVirusesPageMock,
  respiratoryVirusesMock,
  whatsNewPageMock,
} from './fixtures/page'

// Contains the individual `/pages/{id}` mocks
export const mockedPageMap: Record<number, PageResponse<PageType>> = {
  [respiratoryVirusesMock.id]: respiratoryVirusesMock,
  [aboutPageMock.id]: aboutPageMock,
  [whatsNewPageMock.id]: whatsNewPageMock,
  [mapsPageMock.id]: mapsPageMock,
  [howToUseThisDataPageMock.id]: howToUseThisDataPageMock,
  [aboutPageMock.id]: aboutPageMock,
  [influenzaPageMock.id]: influenzaPageMock,
  [coronavirusPageMock.id]: coronavirusPageMock,
  [otherRespiratoryVirusesPageMock.id]: otherRespiratoryVirusesPageMock,
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
