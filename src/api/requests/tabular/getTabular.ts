import { api } from '@/api/api-utils'
import { Metrics, Topics } from '@/api/models'
import { z } from 'zod'
import { getApiBaseUrl } from '../helpers'
import { logger } from '@/lib/logger'

export const requestSchema = z.object({
  topic: Topics,
  metric: Metrics,
})

export const responseSchema = z.array(
  z.object({
    date: z.string(),
    value: z.coerce.number(),
  })
)

type RequestParams = z.infer<typeof requestSchema>
export type Response = z.infer<typeof responseSchema>

export const getTabular = async ({ topic, metric }: RequestParams) => {
  try {
    const res = await api.get(`${getApiBaseUrl()}/tabular/${topic}/${metric}`).json()
    return responseSchema.safeParse(res)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
