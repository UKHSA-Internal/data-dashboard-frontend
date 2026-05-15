import { z } from 'zod'

import { Geography, GeographyType, Metrics, Topics } from '@/api/models'
import { client } from '@/api/utils/api.utils'
import { auth } from '@/auth'
import { auditLog, logger } from '@/lib/logger'

export const requestSchema = z.object({
  isPublic: z.boolean().default(true),
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
  isPublic: RequestParams['isPublic'],
  plots: RequestParams['plots'],
  format: RequestParams['file_format'] = 'csv',
  x_axis: RequestParams['x_axis'] = null,
  confidence_intervals: RequestParams['confidence_intervals'] = false
) => {
  try {
    if (!isPublic) {
      const session = await auth()
      if (session) {
        auditLog(session.userId ?? '', 'FILE_DOWNLOAD', `${format} - ${JSON.stringify(plots)}`)
      }
    }

    const body: RequestParams = {
      isPublic,
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
