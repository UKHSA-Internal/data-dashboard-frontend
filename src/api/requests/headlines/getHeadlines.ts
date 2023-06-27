import { z } from 'zod'

import { api } from '@/api/api-utils'
import { Geography, GeographyType, Metrics, Topics } from '@/api/models'
import { logger } from '@/lib/logger'

import { getApiBaseUrl } from '../helpers'

export const requestSchema = z.object({
  topic: Topics,
  metric: Metrics,
  geography_type: z.optional(GeographyType),
  geography: z.optional(Geography),
})

export const responseSchema = z.object({
  value: z.coerce.number(),
})

type RequestParams = z.infer<typeof requestSchema>

export const getHeadlines = async (params: RequestParams) => {
  try {
    const searchParams = new URLSearchParams({ ...params, geography: 'England', geography_type: 'Nation' })
    const res = await api.get(`${getApiBaseUrl()}/headlines/v2`, { searchParams }).json()
    return responseSchema.safeParse(res)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
