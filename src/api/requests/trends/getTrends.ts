import { z } from 'zod'

import {
  Age,
  Geography,
  GeographyType,
  Metrics,
  PercentageMetrics,
  Sex,
  Stratum,
  SubTheme,
  Theme,
  Topics,
} from '@/api/models'
import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

export const requestSchema = z.object({
  theme: Theme,
  sub_theme: SubTheme,
  topic: Topics,
  metric: Metrics,
  percentage_metric: PercentageMetrics,
  geography_type: GeographyType,
  geography: Geography,
  age: z.optional(Age),
  sex: z.optional(Sex),
  stratum: z.optional(Stratum),
})

export const responseSchema = z.object({
  metric_name: Metrics,
  metric_value: z.coerce.number(),
  metric_period_end: z.string(),
  percentage_metric_name: PercentageMetrics,
  percentage_metric_value: z.coerce.number(),
  percentage_metric_period_end: z.string(),
  direction: z.enum(['up', 'down', 'neutral']),
  colour: z.enum(['green', 'red', 'neutral']),
})

export type RequestParams = z.infer<typeof requestSchema>

export const getTrends = async (params: RequestParams, isPublic?: boolean) => {
  try {
    const searchParams = new URLSearchParams(params)
    const { data } = await client<z.infer<typeof responseSchema>>(`trends/v3`, { searchParams }, isPublic)
    const result = responseSchema.safeParse(data)
    if (result.success) {
      return result
    } else {
      logger.error(`getTrends parse error: ${result.error}`)
      return responseSchema.safeParse(result.error)
    }
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
