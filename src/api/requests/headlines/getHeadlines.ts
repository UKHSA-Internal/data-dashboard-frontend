import { z } from 'zod'
import { api } from '@/api/api-utils'
import { getApiBaseUrl } from '../helpers'
import { Topics, Metrics, Geography, GeographyType } from '@/api/models'

export const requestSchema = z.object({
  topic: z.enum(Topics),
  metric: z.enum(Metrics),
  geography_type: z.enum(GeographyType),
  geography: z.enum(Geography),
})

export const responseSchema = z.object({
  value: z.string(),
})

type RequestParams = z.infer<typeof requestSchema>

export const getHeadlines = async (params: RequestParams) => {
  const searchParams = new URLSearchParams(params)
  const res = await api.get(`${getApiBaseUrl()}/headlines/v2`, { searchParams }).json()
  return responseSchema.safeParse(res)
}
