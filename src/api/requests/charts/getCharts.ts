import { z } from 'zod'
import { api } from '@/api/api-utils'
import { getApiBaseUrl } from '../helpers'
import { Topics, Metrics, ChartTypes, FileFormats, Geography, GeographyType } from '@/api/models'

export const requestSchema = z.object({
  file_format: z.optional(FileFormats),
  plots: z.array(
    z.object({
      topic: Topics,
      metric: Metrics,
      stratum: z.optional(z.string()),
      geography: z.optional(Geography),
      geography_type: z.optional(GeographyType),
      chart_type: ChartTypes,
      date_from: z.optional(z.string().datetime()),
    })
  ),
})

type RequestParams = z.infer<typeof requestSchema>

export const getCharts = async (json: RequestParams) => {
  const res = await api.post(`${getApiBaseUrl()}/charts/v2`, { json }).text()
  return res
}
