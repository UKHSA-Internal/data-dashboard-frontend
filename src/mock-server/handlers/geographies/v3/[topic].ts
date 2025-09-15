import { Request, Response } from 'express'

import type { GeographyType, Topics } from '@/api/models'
import { logger } from '@/lib/logger'

import {
  mockLowerTierLocalAuthorities,
  mockNations,
  mockRegions,
  mockUnitedKingdom,
  mockUpperTierLocalAuthorities,
} from './fixtures'

type MockedTopics = Extract<Topics, 'COVID-19'> | Extract<Topics, 'Influenza'>
type MockedGeographyTypes =
  | Extract<GeographyType, 'Region'>
  | Extract<GeographyType, 'Lower Tier Local Authority'>
  | Extract<GeographyType, 'Upper Tier Local Authority'>
  | Extract<GeographyType, 'Nation'>
  | Extract<GeographyType, 'United Kingdom'>

export const geographyMock = [
  {
    geography_type: 'Nation',
    geographies: mockNations,
  },
  {
    geography_type: 'Upper Tier Local Authority',
    geographies: mockUpperTierLocalAuthorities,
  },
  {
    geography_type: 'Region',
    geographies: mockRegions,
  },
  {
    geography_type: 'United Kingdom',
    geographies: mockUnitedKingdom,
  },
  {
    geography_type: 'Lower Tier Local Authority',
    geographies: mockLowerTierLocalAuthorities,
  },
]

const geographiesTopicMocks: Record<
  MockedTopics,
  Array<{ geography_type: string; geographies: Array<{ name: string }> }>
> = {
  'COVID-19': geographyMock,
  Influenza: geographyMock,
}
const geographyTypeMocks: Record<
  MockedGeographyTypes,
  Array<{ geography_type: string; geographies: Array<{ name: string }> }>
> = {
  Nation: geographyMock[0],
  'Upper Tier Local Authority': geographyMock[1],
  Region: geographyMock[2],
  'United Kingdom': geographyMock[3],
  'Lower Tier Local Authority': geographyMock[4],
}

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    if (!req.query['topic'] && !req.query['geography_type']) {
      logger.error('Missing a required queryParam')
      return res.status(500)
    }
    if (req.query['topic'] && req.query['geography_type']) {
      logger.error('Please only provide either topic or geography_type')
      return res.status(500)
    }
    if (req.query['topic']) {
      const geographies = geographiesTopicMocks[req.query.topic as MockedTopics]
      return res.json(geographies)
    }
    if (req.query['geography_type']) {
      const geographies = geographyTypeMocks[req.query.geography_type as MockedGeographyTypes]
      return res.json([geographies])
    }
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
