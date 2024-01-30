import { Request, Response } from 'express'

import type { Topics } from '@/api/models'
import { logger } from '@/lib/logger'

import { mockLocalAuthorities, mockNations } from './fixtures'

type MockedTopics = Extract<Topics, 'COVID-19'> | Extract<Topics, 'Influenza'>

export const geographyMock = [
  {
    geography_type: 'Nation',
    geographies: mockNations,
  },
  {
    geography_type: 'Lower Tier Local Authority',
    geographies: mockLocalAuthorities,
  },
]

const geographiesMocks: Record<
  MockedTopics,
  Array<{ geography_type: string; geographies: Array<{ name: string }> }>
> = {
  'COVID-19': geographyMock,
  Influenza: geographyMock,
}

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    if (!req.params['topic']) {
      logger.error('Missing "topic" searchParam')
      return res.status(500)
    }

    const geographies = geographiesMocks[req.params.topic as MockedTopics]

    return res.json(geographies)
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
