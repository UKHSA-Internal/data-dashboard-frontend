import { z } from 'zod'
import { api } from '@/api/api-utils'
import { getApiBaseUrl } from '../../helpers'
import { Topics, Metrics, ChartTypes, FileFormats } from '@/api/models'

export const requestSchema = z.object({
  chart_type: z.enum(ChartTypes),
  metric: z.enum(Metrics),
  topic: z.enum(Topics),
  date_from: z.optional(z.string().datetime()),
  file_format: z.optional(z.enum(FileFormats)),
})

type RequestParams = z.infer<typeof requestSchema>

export const getCharts = async (json: RequestParams) => {
  const res = await api.post(`${getApiBaseUrl()}/charts/v2`, { json }).text()
  return res
}
