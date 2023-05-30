import { api } from '@/api/api-utils'
import { z } from 'zod'
import { getApiBaseUrl } from '../helpers'
import { logger } from '@/lib/logger'
import { ChartTypes, Geography, GeographyType, Metrics, Topics } from '@/api/models'

export const requestSchema = z.object({
  plots: z.array(
    z.object({
      topic: Topics,
      metric: Metrics,
      stratum: z.optional(z.string()),
      geography: z.optional(Geography),
      geography_type: z.optional(GeographyType),
      chart_type: z.optional(ChartTypes),
      date_from: z.optional(z.nullable(z.string().datetime())),
      date_to: z.optional(z.nullable(z.string().datetime())),
    })
  ),
})

export const responseSchema = z.array(
  z.object({
    date: z.string(),
    values: z.array(
      z.object({
        label: z.string(),
        value: z.coerce.number().nullable(),
      })
    ),
  })
)

type RequestParams = z.infer<typeof requestSchema>
export type Response = z.infer<typeof responseSchema>

export const getTabular = async (plots: RequestParams['plots']) => {
  try {
    const json: RequestParams = { plots }
    const res = await api.post(`${getApiBaseUrl()}/tables/v2`, { json }).json()
    return responseSchema.safeParse(res)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
