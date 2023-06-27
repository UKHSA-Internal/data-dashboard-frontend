import { z } from 'zod'

import { api } from '@/api/api-utils'
import { Metrics, PercentageMetrics, Topics } from '@/api/models'
import { logger } from '@/lib/logger'

import { getApiBaseUrl } from '../helpers'

export const requestSchema = z.object({
  topic: Topics,
  metric: Metrics,
  percentage_metric: PercentageMetrics,
})

export const responseSchema = z.object({
  metric_name: Metrics,
  metric_value: z.coerce.number(),
  percentage_metric_name: PercentageMetrics,
  percentage_metric_value: z.coerce.number(),
  direction: z.enum(['up', 'down', 'neutral']),
  colour: z.enum(['green', 'red', 'neutral']),
})

type RequestParams = z.infer<typeof requestSchema>

export const getTrends = async (params: RequestParams) => {
  try {
    const searchParams = new URLSearchParams(params)
    const res = await api.get(`${getApiBaseUrl()}/trends/v2`, { searchParams }).json()
    return responseSchema.safeParse(res)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
