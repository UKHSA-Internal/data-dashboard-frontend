import { z } from 'zod'

import { FileFormats, Geography, GeographyType, Metrics, Topics } from '@/api/models'
import { ChartFigure, ChartLineColours, ChartLineTypes, ChartTypes } from '@/api/models/Chart'
import { client } from '@/api/utils/api.utils'
import { isSSR } from '@/app/utils/app.utils'
import { chartFormat } from '@/config/constants'
import { logger } from '@/lib/logger'

export const requestSchema = z.object({
  file_format: z.optional(FileFormats),
  chart_height: z.number(),
  chart_width: z.number(),
  x_axis: z.string().nullable().optional(),
  y_axis: z.string().nullable().optional(),
  x_axis_title: z.string().optional(),
  y_axis_title: z.string().optional(),
  y_axis_minimum_value: z.number().nullable().optional(),
  y_axis_maximum_value: z.number().nullable().optional(),
  plots: z.array(
    z.object({
      topic: Topics,
      metric: Metrics,
      chart_type: ChartTypes,
      stratum: z.string().optional(),
      geography: Geography.optional(),
      geography_type: GeographyType.optional(),
      sex: z.string().nullable().optional(),
      age: z.string().nullable().optional(),
      date_from: z.string().nullable().optional(),
      date_to: z.string().nullable().optional(),
      label: z.string().nullable().optional(),
      line_colour: ChartLineColours.nullable().optional(),
      line_type: ChartLineTypes.nullable().optional(),
      use_smooth_lines: z.boolean().optional(),
      use_markers: z.boolean().optional(),
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

export const getCharts = async (chart: RequestParams) => {
  const {
    plots,
    x_axis,
    y_axis,
    chart_width,
    chart_height,
    x_axis_title,
    y_axis_title,
    y_axis_maximum_value,
    y_axis_minimum_value,
  } = chart

  const body: RequestParams = {
    plots: plots.map((plot) => plot),
    file_format: chartFormat,
    chart_width,
    chart_height,
    x_axis,
    y_axis,
    x_axis_title,
    y_axis_title,
    y_axis_minimum_value,
    y_axis_maximum_value,
  }

  try {
    const path = isSSR ? `charts/v3` : `proxy/charts/v3`
    const { data } = await client<z.infer<typeof responseSchema>>(path, { body })

    const result = responseSchema.safeParse(data)
    if (result.success) {
      return result
    } else {
      logger.error(`getChart Zod Validation error: ${result.error}`)
      return result
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.code === 400) {
        logger.info('POST failed (no data) charts/v3 %s', plots.map((plot) => plot.metric).join())
      } else {
        logger.error(`getCharts error: ${error.message}`)
      }
    }
    return responseSchema.safeParse(error)
  }
}
