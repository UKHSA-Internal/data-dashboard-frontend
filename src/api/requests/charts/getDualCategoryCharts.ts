import { z } from 'zod'

import { Geography, GeographyType, Metrics, Topics } from '@/api/models'
import { ChartFigure, ChartLineColours, ChartTypes } from '@/api/models/Chart'
import { client } from '@/api/utils/api.utils'
import { isSSR } from '@/app/utils/app.utils'
import { chartFormat } from '@/config/constants'
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
  file_format: z.optional(z.enum(['svg', 'png'])),
  chart_height: z.number(),
  chart_width: z.number(),
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

export const responseSchema = z.object({
  chart: z.string(),
  last_updated: z.string(),
  alt_text: z.string(),
  figure: ChartFigure,
})

export type ChartResponse = z.infer<typeof responseSchema>
export type RequestParams = z.infer<typeof requestSchema>

export const getDualCategoryCharts = async (chart: RequestParams) => {
  const body: RequestParams = {
    ...chart,
    file_format: chart.file_format ?? chartFormat,
  }

  try {
    const path = isSSR ? `charts/dual-category/v1` : `proxy/charts/dual-category/v1`
    const { data } = await client<z.infer<typeof responseSchema>>(path, { body })

    const result = responseSchema.safeParse(data)
    if (result.success) {
      return result
    }

    logger.error(`getDualCategoryCharts Zod Validation error: ${result.error}`)
    return result
  } catch (error) {
    if (error instanceof Error) {
      if (error.code === 400) {
        logger.info('POST failed (no data) charts/dual-category/v1 %s', chart.static_fields.metric)
      } else {
        logger.error(`getDualCategoryCharts error: ${error.message}`)
      }
    }
    return responseSchema.safeParse(error)
  }
}
