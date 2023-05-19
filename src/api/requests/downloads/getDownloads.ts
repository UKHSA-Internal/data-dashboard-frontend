import { z } from 'zod'
import { api } from '@/api/api-utils'
import { getApiBaseUrl } from '../helpers'
import { Topics, Metrics, Geography, GeographyType } from '@/api/models'
import { logger } from '@/lib/logger'

export const requestSchema = z.object({
  file_format: z.enum(['json', 'csv']),
  plots: z.array(
    z.object({
      topic: Topics,
      metric: Metrics,
      stratum: z.optional(z.string()),
      geography: z.optional(Geography),
      geography_type: z.optional(GeographyType),
      date_from: z.optional(z.nullable(z.string().datetime())),
      date_to: z.optional(z.nullable(z.string().datetime())),
    })
  ),
})

type RequestParams = z.infer<typeof requestSchema>

export const getDownloads = async (plots: RequestParams['plots'], format: RequestParams['file_format'] = 'csv') => {
  try {
    const json: RequestParams = {
      plots,
      file_format: format,
    }
    const res = await api.post(`${getApiBaseUrl()}/downloads/v2`, { json })

    if (format === 'csv') return res.text()
    if (format === 'json') return res.json()
  } catch (error) {
    logger.error(error)
  }
}
