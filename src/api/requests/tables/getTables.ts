import { z } from 'zod'

import { Geography, GeographyType, Metrics, Topics } from '@/api/models'
import { ChartLineColours, ChartTypes } from '@/api/models/Chart'
import { client } from '@/api/utils/api.utils'
import { isSSR } from '@/app/utils/app.utils'
import { logger } from '@/lib/logger'

const dualCategoryStaticFieldsSchema = z.object({
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

export const singleCategoryRequestSchema = z.object({
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

export const dualCategoryRequestSchema = z.object({
  x_axis: z.string().nullable().optional(),
  y_axis: z.string().nullable().optional(),
  chart_type: ChartTypes,
  static_fields: dualCategoryStaticFieldsSchema,
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

export const requestSchema = singleCategoryRequestSchema

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

export type SingleCategoryRequestParams = z.infer<typeof singleCategoryRequestSchema>
export type DualCategoryRequestParams = z.infer<typeof dualCategoryRequestSchema>
export type RequestParams = SingleCategoryRequestParams | DualCategoryRequestParams
export type Response = z.infer<typeof responseSchema>

export const getTables = async (body: RequestParams, isPublic?: boolean) => {
  try {
    const publicParam = isPublic === false ? '?isPublic=false' : ''
    const isDual = 'static_fields' in body
    const path = isDual
      ? isSSR
        ? `tables/dual-category/v1`
        : `proxy/tables/dual-category/v1${publicParam}`
      : isSSR
        ? `tables/v4`
        : `proxy/tables/v4${publicParam}`

    const { data } = await client<Response>(path, { body }, isPublic)
    const result = responseSchema.safeParse(data)
    if (result.success) {
      return result
    } else {
      logger.error(`getTables parse error: ${result.error}`)
      return responseSchema.safeParse(result.error)
    }
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
