import { z } from 'zod'

import { client } from '@/api/api-utils'
import { Metrics, PercentageMetrics, Topics } from '@/api/models'
import { logger } from '@/lib/logger'

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
    const { data } = await client<z.infer<typeof responseSchema>>(`trends/v2?${searchParams.toString()}`)
    logger.info(`GET success trends/v2?${searchParams.toString()}`)
    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
