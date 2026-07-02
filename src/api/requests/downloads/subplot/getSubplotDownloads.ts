import { z } from 'zod'

import { client } from '@/api/utils/api.utils'
import { auth } from '@/auth'
import { auditLog, logger } from '@/lib/logger'

export const chartParameters = z.object({
  x_axis: z.string().nullable().optional(),
  y_axis: z.string().nullable().optional(),
  theme: z.string(),
  sub_theme: z.string(),
  date_from: z.string().nullable().optional(),
  date_to: z.string().nullable().optional(),
  age: z.string().nullable().optional(),
  sex: z.string().nullable().optional(),
  stratum: z.string().nullable().optional(),
  metric_value_ranges: z.array(
    z
      .object({
        start: z.string(),
        end: z.string(),
      })
      .nullable()
      .optional()
  ),
})

export const requestSchema = z.object({
  is_public: z.boolean().default(true),
  file_format: z.enum(['json', 'csv']),
  target_threshold: z.string().nullable().optional(),
  target_threshold_label: z.string().nullable().optional(),
  chart_parameters: z.object({
    x_axis: z.string().nullable().optional(),
    y_axis: z.string().nullable().optional(),
    theme: z.string(),
    sub_theme: z.string(),
    date_from: z.string().nullable().optional(),
    date_to: z.string().nullable().optional(),
    age: z.string().nullable().optional(),
    sex: z.string().nullable().optional(),
    stratum: z.string().nullable().optional(),
    metric_value_ranges: z.array(
      z
        .object({
          start: z.string(),
          end: z.string(),
        })
        .nullable()
        .optional()
    ),
  }),
  subplots: z.array(
    z.object({
      subplot_title: z.string(),
      subplot_parameters: z.object({
        age: z.string().nullable().optional(),
        sex: z.string().nullable().optional(),
        topic: z.string(),
        metric: z.string(),
        stratum: z.string().nullable().optional(),
      }),
      plots: z.array(
        z.object({
          label: z.string().nullable().optional(),
          geography: z.string(),
          geography_type: z.string(),
          line_colour: z.string().nullable().optional(),
          age: z.string().nullable().optional(),
          sex: z.string().nullable().optional(),
          stratum: z.string().nullable().optional(),
        })
      ),
    })
  ),
})

export type RequestParams = z.infer<typeof requestSchema>
export type charParams = z.infer<typeof chartParameters>

export const getSubplotDownloads = async (
  is_public: RequestParams['is_public'],
  file_format: RequestParams['file_format'] = 'csv',
  target_threshold: RequestParams['target_threshold'] = null,
  target_threshold_label: RequestParams['target_threshold_label'] = null,
  chart_parameters: RequestParams['chart_parameters'],
  subplots: RequestParams['subplots'],
  authToken?: string | null
) => {
  try {
    if (!is_public) {
      const session = await auth()
      if (session) {
        auditLog(session.userId ?? '', 'FILE_DOWNLOAD', `${file_format} - ${JSON.stringify(subplots)}`)
      }
    }

    const body: RequestParams = {
      is_public,
      file_format,
      target_threshold,
      target_threshold_label,
      chart_parameters,
      subplots,
    }
    const { data } = await client<string>(`downloads/subplot/v1`, {
      body,
      headers: authToken ? { 'X-UHD-AUTH': authToken } : undefined,
    })

    return data
  } catch (error) {
    logger.error(error)
  }
}
