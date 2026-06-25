import { z } from 'zod'

import { Geography, GeographyType, Metrics, Topics } from '@/api/models'
import { ChartLineColours, ChartTypes } from '@/api/models/Chart'
import { client } from '@/api/utils/api.utils'
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
  is_public: z.boolean().default(true),
  file_format: z.enum(['json', 'csv']),
  x_axis: z.string().nullable().optional(),
  y_axis: z.string().nullable().optional(),
  x_axis_title: z.string().optional(),
  y_axis_title: z.string().optional(),
  y_axis_minimum_value: z.number().nullable().optional(),
  y_axis_maximum_value: z.number().nullable().optional(),
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

export type RequestParams = z.infer<typeof requestSchema>

export const getDualCategoryDownloads = async (body: RequestParams) => {
  try {
    const { data } = await client<string>(`downloads/dual-category/v1`, { body })
    return data
  } catch (error) {
    logger.error(error)
  }
}
