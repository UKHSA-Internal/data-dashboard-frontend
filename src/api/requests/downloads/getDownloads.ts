import { z } from 'zod'

import { Geography, GeographyType, Metrics, Topics } from '@/api/models'
import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

export const requestSchema = z.object({
  file_format: z.enum(['json', 'csv']),
  x_axis: z.enum(['age', 'geography', 'sex', 'stratum', 'date', 'metric']).optional().nullable(),
  confidence_intervals: z.boolean().default(false),
  plots: z.array(
    z.object({
      topic: Topics,
      metric: Metrics,
      stratum: z.optional(z.string()),
      geography: z.optional(Geography),
      geography_type: z.optional(GeographyType),
      date_from: z.string().nullable().optional(),
      date_to: z.string().nullable().optional(),
      age: z.string().nullable().optional(),
      sex: z.string().nullable().optional(),
    })
  ),
})

export type RequestParams = z.infer<typeof requestSchema>

export const getDownloads = async (
  plots: RequestParams['plots'],
  format: RequestParams['file_format'] = 'csv',
  x_axis: RequestParams['x_axis'] = null,
  confidence_intervals: RequestParams['confidence_intervals'] = false
) => {
  try {
    const body: RequestParams = {
      plots,
      x_axis,
      file_format: format,
      confidence_intervals,
    }
    const { data } = await client<string>(`downloads/v2`, { body })

    return data
  } catch (error) {
    logger.error(error)
  }
}
