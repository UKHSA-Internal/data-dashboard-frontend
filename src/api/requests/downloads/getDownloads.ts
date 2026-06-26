import { z } from 'zod'

import { Geography, GeographyType, Metrics, Topics } from '@/api/models'
import { ChartLineColours, ChartTypes } from '@/api/models/Chart'
import { client } from '@/api/utils/api.utils'
import { auth } from '@/auth'
import { auditLog, logger } from '@/lib/logger'

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
  is_public: z.boolean().default(true),
  file_format: z.enum(['json', 'csv']),
  x_axis: z.enum(['age', 'geography', 'sex', 'stratum', 'date', 'metric']).optional().nullable(),
  confidence_intervals: z.boolean().default(false),
  plots: z.array(
    z.object({
      topic: Topics,
      metric: Metrics,
      stratum: z.optional(z.string()),
      geography: z.optional(Geography),
      geography_type: z.optional(GeographyType),
      date_from: z.string().nullable().optional(),
      date_to: z.string().nullable().optional(),
      age: z.string().nullable().optional(),
      sex: z.string().nullable().optional(),
    })
  ),
})
export const requestSchema = singleCategoryRequestSchema

export const dualCategoryRequestSchema = z.object({
  is_public: z.boolean().default(true),
  file_format: z.enum(['json', 'csv']),
  x_axis: z.string().nullable().optional(),
  y_axis: z.string().nullable().optional(),
  x_axis_title: z.string().optional(),
  y_axis_title: z.string().optional(),
  y_axis_minimum_value: z.number().nullable().optional(),
  y_axis_maximum_value: z.number().nullable().optional(),
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

export type SingleCategoryRequestParams = z.infer<typeof singleCategoryRequestSchema>
export type DualCategoryRequestParams = z.infer<typeof dualCategoryRequestSchema>
export type RequestParams = SingleCategoryRequestParams | DualCategoryRequestParams

export const getDownloads = async (body: RequestParams) => {
  try {
    if (!body.is_public) {
      const session = await auth()
      if (session) {
        const auditDetail = 'plots' in body ? JSON.stringify(body.plots) : JSON.stringify(body.static_fields)
        auditLog(session.userId ?? '', 'FILE_DOWNLOAD', `${body.file_format} - ${auditDetail}`)
      }
    }

    const isDualCategory = 'static_fields' in body
    const endpoint = isDualCategory ? `downloads/dual-category/v1` : `downloads/v2`
    const { data } = await client<string>(endpoint, { body })

    return data
  } catch (error) {
    logger.error(error)
  }
}
