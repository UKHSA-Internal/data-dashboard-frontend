import { z } from 'zod'

import { client } from '@/api/utils/api.utils'
import { isSSR } from '@/app/utils/app.utils'
import { logger } from '@/lib/logger'

export const requestSchema = z.object({
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

export const responseSchema = z.array(
  z.object({
    reference: z.string(),
    values: z.array(
      z.object({
        label: z.string(),
        value: z.string().nullable().optional(),
        in_reporting_delay_period: z.boolean(),
      })
    ),
  })
)

export type RequestParams = z.infer<typeof requestSchema>
export type Response = z.infer<typeof responseSchema>

export const getSubplotTables = async (body: RequestParams) => {
  try {
    const path = isSSR ? `tables/subplot/v1` : `proxy/tables/subplot/v1`
    const { data } = await client<Response>(path, { body })
    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
