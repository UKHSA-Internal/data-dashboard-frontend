import { z } from 'zod'

import { client } from '@/api/api-utils'
import { ChartTypes, Geography, GeographyType, Metrics, Topics } from '@/api/models'
import { logger } from '@/lib/logger'

export const requestSchema = z.object({
  x_axis: z.string().nullable().optional(),
  y_axis: z.string().nullable().optional(),
  plots: z.array(
    z.object({
      topic: Topics,
      metric: Metrics,
      stratum: z.optional(z.string()),
      geography: z.optional(Geography),
      geography_type: z.optional(GeographyType),
      age: z.optional(z.string()).nullable(),
      date_from: z.optional(z.nullable(z.string().datetime())),
      date_to: z.optional(z.nullable(z.string().datetime())),
      chart_type: z.optional(ChartTypes),
    })
  ),
})

export const responseSchema = z.array(
  z.object({
    reference: z.string(),
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

export const getTables = async (body: RequestParams) => {
  try {
    const { data } = await client<Response>('tables/v4', { body })
    logger.info('POST success tables/v4')
    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
