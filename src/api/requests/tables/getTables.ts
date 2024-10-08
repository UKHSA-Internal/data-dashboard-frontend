import { z } from 'zod'

import { Geography, GeographyType, Metrics, Topics } from '@/api/models'
import { ChartTypes } from '@/api/models/Chart'
import { client } from '@/api/utils/api.utils'
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
      date_from: z.string().nullable().optional(),
      date_to: z.string().nullable().optional(),
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
        in_reporting_delay_period: z.boolean(),
      })
    ),
  })
)

type RequestParams = z.infer<typeof requestSchema>
export type Response = z.infer<typeof responseSchema>

export const getTables = async (body: RequestParams) => {
  try {
    const { data } = await client<Response>('tables/v4', { body: JSON.stringify(body) })
    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
