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
    tag_manager_event_id: z.string().nullable(),
    x_axis: z.string().nullable(),
    y_axis: z.string().nullable(),
    headline_number_columns: Blocks,
  }),
})

export const WithChartCard = z.object({
  id: z.string(),
  type: z.enum(['chart_card', 'headline_chart_card']),
  value: z.object({
    title: z.string(),
    body: z.string(),
    chart: Chart,
    tag_manager_event_id: z.string().nullable(),
    x_axis: z.string().nullable(),
    y_axis: z.string().nullable(),
  }),
})

export const ChartRowColumns = z.array(z.union([WithChartHeadlineAndTrendCard, WithChartCard]))

export const CardTypes = z.discriminatedUnion('type', [
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
      content: z.array(CardTypes),
    }),
  })
)

export type Body = z.infer<typeof Body>

export const CompositeBody = z.array(
  z.discriminatedUnion('type', [
    z.object({
      type: z.literal('text'),
      value: z.string(),
      id: z.string(),
    }),
    z.object({
      type: z.literal('code_block'),
      value: z.object({
        heading: z.string(),
        content: z.array(
          z.object({
            type: z.literal('code_snippet'),
            value: z.object({
              language: z.string(),
              code: z.string(),
            }),
            id: z.string(),
          })
        ),
      }),
      id: z.string(),
    }),
    z.object({
      type: z.literal('internal_button'),
      value: z.object({
        text: z.string(),
        button_type: z.enum(['BULK_DOWNLOAD']),
        endpoint: z.string(),
        method: z.enum(['POST', 'GET']),
      }),
      id: z.string(),
    }),
    z.object({
      type: z.literal('external_button'),
      value: z.object({
        text: z.string(),
        url: z.string(),
        button_type: z.string().toLowerCase(),
        icon: z.string(),
      }),
      id: z.string(),
    }),
  ])
)

export type CompositeBody = z.infer<typeof CompositeBody>
