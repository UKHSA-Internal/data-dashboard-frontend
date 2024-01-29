import { z } from 'zod'

import { Geography, GeographyType, Metrics, Topics } from '@/api/models'
import { client } from '@/api/utils/api.utils'
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
      date_from: z.string().nullable().optional(),
      date_to: z.string().nullable().optional(),
    })
  ),
})

export type RequestParams = z.infer<typeof requestSchema>

export const getDownloads = async (plots: RequestParams['plots'], format: RequestParams['file_format'] = 'csv') => {
  try {
    const body: RequestParams = {
      plots,
      file_format: format,
    }
    const { data } = await client<string>(`downloads/v2`, { body })

    return data
  } catch (error) {
    logger.error(error)
  }
}
