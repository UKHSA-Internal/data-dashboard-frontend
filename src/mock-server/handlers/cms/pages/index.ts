import { Request, Response } from 'express'

import { pagesWithCommonTypeMock, pagesWithHomeTypeMock, pagesWithTopicTypeMock } from './fixtures/pages'

// Contains the `/pages` fixtures for the different cms page types
const mockedPagesMap: Record<string, unknown> = {
  'home.HomePage': pagesWithHomeTypeMock,
  'topic.TopicPage': pagesWithTopicTypeMock,
  'common.CommonPage': pagesWithCommonTypeMock,
}

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      console.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    if (!req.query['type']) {
      console.error('Missing type searchParam')
      return res.status(500)
    }

    return res.json(mockedPagesMap[req.query['type'] as string])
  } catch (error) {
    console.error(error)
    return res.status(500)
  }
}
