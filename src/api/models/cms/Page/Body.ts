import { z } from 'zod'

import { Blocks } from './Blocks'
import { Chart } from './Chart'

/**
 * Body Discriminated Union Types
 * Variations of each object that can returned in the top-level body associated by the type key
 */

export const WithText = z.object({
  body: z.string(),
})

export const WithHeadlineNumbersRowCard = z.object({
  columns: z.array(
    z.object({
      id: z.string(),
      type: z.literal('column'),
      value: z.object({
        title: z.string(),
        rows: Blocks,
      }),
    })
  ),
})

export const WithChartHeadlineAndTrendCard = z.object({
  type: z.literal('chart_with_headline_and_trend_card'),
  id: z.string(),
  value: z.object({
    title: z.string(),
    body: z.string(),
    chart: Chart,
    x_axis: z.string().nullable(),
    y_axis: z.string().nullable(),
    headline_number_columns: Blocks,
  }),
})

export const WithChartCard = z.object({
  id: z.string(),
  type: z.literal('chart_card'),
  value: z.object({
    title: z.string(),
    body: z.string(),
    chart: Chart,
    x_axis: z.string().nullable(),
    y_axis: z.string().nullable(),
  }),
})

export const ChartRowColumns = z.array(z.union([WithChartHeadlineAndTrendCard, WithChartCard]))

export const ContentTypes = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('text_card'),
    value: WithText,
    id: z.string(),
  }),
  z.object({
    type: z.literal('headline_numbers_row_card'),
    value: WithHeadlineNumbersRowCard,
    id: z.string(),
  }),
  z.object({
    type: z.literal('chart_row_card'),
    value: z.object({
      columns: ChartRowColumns,
    }),
    id: z.string(),
  }),
])

export const Body = z.array(
  z.object({
    type: z.literal('section'),
    id: z.string(),
    value: z.object({
      heading: z.string(),
      content: z.array(ContentTypes),
    }),
  })
)

export type Body = z.infer<typeof Body>
