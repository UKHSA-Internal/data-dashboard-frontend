import { z } from 'zod'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

export const chartParameters = z.object({
  x_axis: z.string().nullable().optional(),
  y_axis: z.string().nullable().optional(),
  theme: z.string(),
  sub_theme: z.string(),
  date_from: z.string().nullable().optional(),
  date_to: z.string().nullable().optional(),
  age: z.string().nullable().optional(),
  sex: z.string().nullable().optional(),
  topic: z.string().nullable().optional(),
  metric: z.string().nullable().optional(),
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
    topic: z.string().nullable().optional(),
    metric: z.string().nullable().optional(),
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
        topic: z.string().nullable().optional(),
        metric: z.string().nullable().optional(),
        stratum: z.string().nullable().optional(),
        theme: z.string().nullable().optional(),
        sub_theme: z.string().nullable().optional(),
      }),
      plots: z.array(
        z.object({
          label: z.string().nullable().optional(),
          geography: z.string().nullable().optional(),
          geography_type: z.string().nullable().optional(),
          line_colour: z.string().nullable().optional(),
          age: z.string().nullable().optional(),
          sex: z.string().nullable().optional(),
          topic: z.string().nullable().optional(),
          metric: z.string().nullable().optional(),
          stratum: z.string().nullable().optional(),
          theme: z.string().nullable().optional(),
          sub_theme: z.string().nullable().optional(),
        })
      ),
    })
  ),
})

export type RequestParams = z.infer<typeof requestSchema>
export type charParams = z.infer<typeof chartParameters>

export const getSubplotDownloads = async (
  file_format: RequestParams['file_format'] = 'csv',
  target_threshold: RequestParams['target_threshold'] = null,
  target_threshold_label: RequestParams['target_threshold_label'] = null,
  chart_parameters: RequestParams['chart_parameters'],
  subplots: RequestParams['subplots']
) => {
  try {
    const body: RequestParams = {
      file_format,
      target_threshold,
      target_threshold_label,
      chart_parameters,
      subplots,
    }
    const { data } = await client<string>(`downloads/subplot/v1`, { body })

    return data
  } catch (error) {
    logger.error(error)
  }
}
