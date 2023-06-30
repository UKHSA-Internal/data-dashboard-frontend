import { z } from 'zod'

import { api } from '@/api/api-utils'
import { ChartTypes, FileFormats, Geography, GeographyType, Metrics, Topics } from '@/api/models'
import { ChartLineColours } from '@/api/models/ChartLineColours'
import { ChartLineTypes } from '@/api/models/ChartLineTypes'
import { chartFormat } from '@/config/constants'
import { logger } from '@/lib/logger'

import { getApiBaseUrl } from '../helpers'

export const requestSchema = z.object({
  file_format: z.optional(FileFormats),
  chart_height: z.number(),
  chart_width: z.number(),
  x_axis: z.string().nullable().optional(),
  y_axis: z.string().nullable().optional(),
  plots: z.array(
    z.object({
      topic: Topics,
      metric: Metrics,
      chart_type: ChartTypes,
      date_from: z.string().nullable().optional(),
      date_to: z.string().nullable().optional(),
      stratum: z.string().optional(),
      geography: Geography.optional(),
      geography_type: GeographyType.optional(),
      sex: z.string().nullable().optional(),
      label: z.string().nullable().optional(),
      line_colour: ChartLineColours.nullable().optional(),
      line_type: ChartLineTypes.nullable().optional(),
    })
  ),
})

export const responseSchema = z.object({
  chart: z.string(),
  last_updated: z.string(),
})

type Response = z.infer<typeof responseSchema>

export type RequestParams = z.infer<typeof requestSchema>

export const getCharts = async (chart: RequestParams) => {
  const { plots, x_axis, y_axis, chart_width, chart_height } = chart

  const json: RequestParams = {
    plots: plots.map((plot) => plot),
    file_format: chartFormat,
    chart_width,
    chart_height,
    x_axis,
    y_axis,
  }

  try {
    const { data } = await api.post<Response>(`${getApiBaseUrl()}/charts/v3`, json, { responseType: 'json' })

    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
