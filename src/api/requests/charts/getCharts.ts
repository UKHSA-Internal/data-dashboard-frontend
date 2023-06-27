import { z } from 'zod'

import { api } from '@/api/api-utils'
import { ChartTypes, FileFormats, Geography, GeographyType, Metrics, Topics } from '@/api/models'
import { logger } from '@/lib/logger'
import { chartFormat, chartSizes } from '@/styles/Theme'

import { getApiBaseUrl } from '../helpers'

export const requestSchema = z.object({
  file_format: z.optional(FileFormats),
  chart_height: z.number(),
  chart_width: z.number(),
  plots: z.array(
    z.object({
      topic: Topics,
      metric: Metrics,
      stratum: z.optional(z.string()),
      geography: z.optional(Geography),
      geography_type: z.optional(GeographyType),
      chart_type: ChartTypes,
      date_from: z.optional(z.nullable(z.string().datetime())),
      date_to: z.optional(z.nullable(z.string().datetime())),
    })
  ),
})

export const responseSchema = z.object({
  chart: z.string(),
  last_updated: z.string(),
})

type Response = z.infer<typeof responseSchema>

export type RequestParams = z.infer<typeof requestSchema>

export const getCharts = async (plots: RequestParams['plots'], size: 'narrow' | 'wide' = 'narrow') => {
  const json: RequestParams = {
    plots,
    chart_width: chartSizes[size].width,
    chart_height: chartSizes[size].height,
    file_format: chartFormat,
  }

  try {
    const { data } = await api.post<Response>(`${getApiBaseUrl()}/charts/v3`, json, { responseType: 'json' })
    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
