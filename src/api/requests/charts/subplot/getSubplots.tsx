import { z } from 'zod'

import { FileFormats, Geography, GeographyType, Metrics, Topics } from '@/api/models'
import { ChartFigure, ChartLineColours, ChartLineTypes, ChartTypes } from '@/api/models/Chart'
import { client } from '@/api/utils/api.utils'
import { isSSR } from '@/app/utils/app.utils'
import { chartFormat } from '@/config/constants'
import { logger } from '@/lib/logger'

export const requestSchema = z.object({
  file_format: z.string(),
  hart_height: z.number(),
  chart_width: z.number(),
  x_axis_title: z.string().optional(),
  y_axis_title: z.string().optional(),
  y_axis_minimum_value: z.number().nullable().optional(),
  y_axis_maximum_value: z.number().nullable().optional(),
  target_threshold: z.number(),
  target_threshold_label: z.string().nullable().optional(),
  chart_parameters: z.object({
    x_axis: z.string().nullable().optional(),
    y_axis: z.string().nullable().optional(),
    theme: z.string(),
    sub_theme: z.string(),
    date_from: z.string().nullable().optional(),
    date_to: z.string().nullable().optional(),
    age: z.string().nullable().optional(),
    sex: z.string().nullable().optional(),
    topic: z.string().nullable().optional(),
    metric: z.string().nullable().optional(),
    stratum: z.string().nullable().optional(),
  }),
  subplots: z.array(
    z.object({
      subplot_title: z.string(),
      subplot_parameters: z.object({
        age: z.string().nullable().optional(),
        sex: z.string().nullable().optional(),
        topic: z.string().nullable().optional(),
        metric: z.string().nullable().optional(),
        stratum: z.string().nullable().optional(),
        theme: z.string().nullable().optional(),
        sub_theme: z.string().nullable().optional(),
      }),
      plots: z.array(
        z.object({
          label: z.string().nullable().optional(),
          geography: z.string().nullable().optional(),
          geography_type: z.string().nullable().optional(),
          line_colour: z.string().nullable().optional(),
          age: z.string().nullable().optional(),
          sex: z.string().nullable().optional(),
          topic: z.string().nullable().optional(),
          metric: z.string().nullable().optional(),
          stratum: z.string().nullable().optional(),
          theme: z.string().nullable().optional(),
          sub_theme: z.string().nullable().optional(),
        })
      ),
    })
  ),
})

export const responseSchema = z.object({
  chart: z.string(),
  last_updated: z.string(),
  alt_text: z.string(),
  figure: ChartFigure,
})

export type RequestParams = z.infer<typeof requestSchema>

export const getSubplots = async (chart: RequestParams) => {
  const {
    file_format,
    chart_height,
    chart_width,
    x_axis_title,
    y_axis_title,
    y_axis_minimum_value,
    y_axis_maximum_value,
    target_threshold,
    target_threshold_label,
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
    const path = isSSR ? `charts/subplot/v1` : `proxy/charts/subplot/v1`
    const { data } = await client<z.infer<typeof responseSchema>>(path, { body })

    return responseSchema.safeParse(data)
  } catch (error) {
    if (error instanceof Error) {
      if (error.code === 400) {
        logger.info('POST failed (no data) charts/subplot/v1 %s', plots.map((plot) => plot.metric).join())
      } else {
        logger.error(error.message)
      }
    }
    return responseSchema.safeParse(error)
  }
}
