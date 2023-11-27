import { Request, Response } from 'express'

import { logger } from '@/lib/logger'

import { areaTypeMock } from '.'
import { mockLocalAuthorities, mockNations, mockNhsRegions, mockNhsTrusts, mockRegions } from './fixtures'

const areaNameMocks: Record<string, { id: number; name: string }[]> = {
  Nation: mockNations,
  'UKHSA Region': mockRegions,
  'Upper Tier Local Authority': mockLocalAuthorities,
  'Lower Tier Local Authority': mockLocalAuthorities,
  'NHS Region': mockNhsRegions,
  'NHS Trust': mockNhsTrusts,
  'Government Office Region': mockLocalAuthorities,
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

    const areaTypeName = areaTypeMock[Number(req.params.id)]

    return res.json({ geographies: areaNameMocks[areaTypeName] })
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
