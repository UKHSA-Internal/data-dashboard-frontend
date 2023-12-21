import { z } from 'zod'

import { client } from '@/api/api-utils'
import { Age, Geography, GeographyType, Metrics, PercentageMetrics, Sex, Stratum, Topics } from '@/api/models'
import { logger } from '@/lib/logger'

export const requestSchema = z.object({
  topic: Topics,
  metric: Metrics,
  percentage_metric: PercentageMetrics,
  geography_type: z.optional(GeographyType),
  geography: z.optional(Geography),
  age: z.optional(Age),
  sex: z.optional(Sex),
  statum: z.optional(Stratum),
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
    const { data } = await client<z.infer<typeof responseSchema>>(`trends/v3`, { searchParams })
    logger.info(`GET success trends/v3?${searchParams.toString()}`)
    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
