import { z } from 'zod'

import { client } from '@/api/api-utils'
import { Geography, GeographyType, Metrics, Topics } from '@/api/models'
import { logger } from '@/lib/logger'

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
    const { topic, metric, geography = 'England', geography_type = 'Nation' } = params
    const searchParams = new URLSearchParams({ topic, metric, geography, geography_type })
    const { data } = await client<z.infer<typeof responseSchema>>('headlines/v2', { searchParams })
    logger.info(`GET success headlines/v2?${searchParams.toString()}`)
    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
