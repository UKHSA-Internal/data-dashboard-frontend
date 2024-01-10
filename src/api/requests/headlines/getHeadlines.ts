import { z } from 'zod'

import { client } from '@/api/api-utils'
import { Age, Geography, GeographyType, Metrics, Sex, Stratum, Topics } from '@/api/models'
import { logger } from '@/lib/logger'

export const requestSchema = z.object({
  topic: Topics,
  metric: Metrics,
  geography_type: z.optional(GeographyType),
  geography: z.optional(Geography),
  age: z.optional(Age),
  sex: z.optional(Sex),
  statum: z.optional(Stratum),
})

export const responseSchema = z.object({
  value: z.coerce.number(),
})

type RequestParams = z.infer<typeof requestSchema>

export const getHeadlines = async (params: RequestParams) => {
  try {
    const searchParams = new URLSearchParams(params)
    const { data } = await client<z.infer<typeof responseSchema>>('headlines/v3', { searchParams })
    logger.info(`GET success headlines/v3?${searchParams.toString()}`)
    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
