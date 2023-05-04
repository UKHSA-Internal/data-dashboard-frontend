import { api } from '@/api/api-utils'
import { Metrics, Topics } from '@/api/models'
import { z } from 'zod'
import { getApiBaseUrl } from '../helpers'

export const requestSchema = z.object({
  topic: Topics,
  metric: Metrics,
})

export const responseSchema = z.array(
  z.object({
    date: z.string(),
    value: z.string(),
  })
)

type RequestParams = z.infer<typeof requestSchema>

export const getTabular = async (params: RequestParams) => {
  const searchParams = new URLSearchParams(params)
  const res = await api.get(`${getApiBaseUrl()}/tabular`, { searchParams }).json()
  return responseSchema.safeParse(res)
}
