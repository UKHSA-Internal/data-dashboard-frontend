import { z } from 'zod'
import { api } from '@/api/api-utils'
import { getApiBaseUrl } from '../helpers'
import { Topics, Metrics, PercentageMetrics } from '@/api/models'

export const requestSchema = z.object({
  topic: z.enum(Topics),
  metric: z.enum(Metrics),
  percentage_metric: z.enum(PercentageMetrics),
})

export const responseSchema = z.object({
  value: z.coerce.number(),
  percentage_value: z.coerce.number(),
  direction: z.enum(['up', 'down', 'neutral']),
  colour: z.enum(['green', 'red', 'neutral']),
})

type RequestParams = z.infer<typeof requestSchema>

export const getTrends = async (params: RequestParams) => {
  const searchParams = new URLSearchParams(params)
  const res = await api.get(`${getApiBaseUrl()}/trends/v2`, { searchParams }).json()
  return responseSchema.safeParse(res)
}
