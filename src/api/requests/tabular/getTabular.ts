import { z } from 'zod'

import { client } from '@/api/api-utils'
import { ChartTypes, Geography, GeographyType, Metrics, Topics } from '@/api/models'
import { logger } from '@/lib/logger'

export const requestSchema = z.object({
  plots: z.array(
    z.object({
      topic: Topics,
      metric: Metrics,
      stratum: z.optional(z.string()),
      geography: z.optional(Geography),
      geography_type: z.optional(GeographyType),
      chart_type: z.optional(ChartTypes),
      date_from: z.optional(z.nullable(z.string().datetime())),
      date_to: z.optional(z.nullable(z.string().datetime())),
    })
  ),
})

export const responseSchema = z.array(
  z.object({
    date: z.string(),
    values: z.array(
      z.object({
        label: z.string(),
        value: z.coerce.number().nullable(),
      })
    ),
  })
)

type RequestParams = z.infer<typeof requestSchema>
export type Response = z.infer<typeof responseSchema>

export const getTabular = async (plots: RequestParams['plots']) => {
  try {
    const body: RequestParams = { plots }
    const { data } = await client<Response>('tables/v2', { body })
    logger.info('POST success tables/v2')
    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
