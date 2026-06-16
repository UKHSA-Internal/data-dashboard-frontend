import { z } from 'zod'

import { Geography, GeographyType, Metrics, Topics } from '@/api/models'
import { ChartLineColours, ChartTypes } from '@/api/models/Chart'
import { client } from '@/api/utils/api.utils'
import { isSSR } from '@/app/utils/app.utils'
import { logger } from '@/lib/logger'

const staticFieldsSchema = z.object({
  topic: Topics,
  metric: Metrics,
  geography: Geography.optional(),
  geography_type: GeographyType.optional(),
  sex: z.string().nullable().optional(),
  age: z.string().nullable().optional(),
  stratum: z.string().optional(),
  date_from: z.string().nullable().optional(),
  date_to: z.string().nullable().optional(),
})

export const requestSchema = z.object({
  x_axis: z.string().nullable().optional(),
  y_axis: z.string().nullable().optional(),
  chart_type: ChartTypes,
  static_fields: staticFieldsSchema,
  primary_field_values: z.array(z.string()),
  secondary_category: z.string(),
  segments: z.array(
    z.object({
      secondary_field_value: z.string(),
      colour: ChartLineColours,
      label: z.string().nullable().optional(),
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
        lower_confidence: z.coerce.number().nullable().optional(),
        upper_confidence: z.coerce.number().nullable().optional(),
      })
    ),
  })
)

export type RequestParams = z.infer<typeof requestSchema>
export type Response = z.infer<typeof responseSchema>

export const getDualCategoryTables = async (body: RequestParams) => {
  try {
    const path = isSSR ? `tables/dual-category/v1` : `proxy/tables/dual-category/v1`
    const { data } = await client<Response>(path, { body })

    const result = responseSchema.safeParse(data)
    if (result.success) {
      return result
    }

    logger.error(`getDualCategoryTables parse error: ${result.error}`)
    return responseSchema.safeParse(result.error)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
