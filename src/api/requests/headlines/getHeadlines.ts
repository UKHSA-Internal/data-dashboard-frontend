import { z } from 'zod'
import { api } from '@/api/api-utils'
import { getApiBaseUrl } from '../helpers'
import { Topics, Metrics, Geography, GeographyType } from '@/api/models'

export const requestSchema = z.object({
  topic: Topics,
  metric: Metrics,
  geography_type: z.optional(GeographyType),
  geography: z.optional(Geography),
})

export const responseSchema = z.object({
  value: z.coerce.number(),
})

type RequestParams = z.infer<typeof requestSchema>

export const getHeadlines = async (params: RequestParams) => {
  const searchParams = new URLSearchParams({ ...params, geography: 'England', geography_type: 'Nation' })
  const res = await api.get(`${getApiBaseUrl()}/headlines/v2`, { searchParams }).json()
  return responseSchema.safeParse(res)
}
