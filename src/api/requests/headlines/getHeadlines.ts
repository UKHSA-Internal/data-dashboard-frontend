import { z } from 'zod'

import { Age, Geography, GeographyType, Metrics, Sex, Stratum, Topics } from '@/api/models'
import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

export const requestSchema = z.object({
  topic: Topics,
  metric: Metrics,
  geography_type: z.optional(GeographyType),
  geography: z.optional(Geography),
  age: z.optional(Age),
  sex: z.optional(Sex),
  stratum: z.optional(Stratum),
})

export const responseSchema = z.object({
  value: z.coerce.number(),
  period_end: z.string(),
})

type RequestParams = z.infer<typeof requestSchema>

export const getHeadlines = async (params: RequestParams) => {
  try {
    const searchParams = new URLSearchParams(params)
    const { data } = await client<z.infer<typeof responseSchema>>('headlines/v3', { searchParams })
    const result = responseSchema.safeParse(data)
    if (result.success) {
      return result
    } else {
      logger.error(`getHeadlines parse error: ${result.error}`)
      return responseSchema.safeParse(result.error)
    }
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
