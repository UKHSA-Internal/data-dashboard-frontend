import { z } from 'zod'
import { HeadlineWithTrend, HeadlineWithNumber } from './BodyValues'
import { Topics } from '../../Topics'
import { Metrics } from '../../Metrics'
import { ChartTypes } from '../../ChartTypes'
import { Geography } from '../../Geography'
import { GeographyType } from '../../GeographyType'
import { DualHeadline, HeadlineAndTrend, SingleHeadline } from './Columns'

/**
 * Body Discriminated Union Types
 * Variations of each object that can returned in the top-level body associated by the type key
 */

export const WithText = z.object({
  body: z.string(),
})

export const WithHeadlineNumbersRowCard = z.object({
  columns: z.array(z.discriminatedUnion('type', [HeadlineAndTrend, DualHeadline, SingleHeadline])),
})

export const WithChartHeadlineAndTrendCard = z.object({
  columns: z.array(
    z.object({
      type: z.literal('chart_with_headline_and_trend_card'),
      id: z.string(),
      value: z.object({
        title: z.string(),
        body: z.string(),
        chart: z.array(
          z.object({
            type: z.literal('plot'),
            id: z.string(),
            value: z.object({
              topic: Topics,
              metric: Metrics,
              chart_type: ChartTypes,
              date_from: z.nullable(z.string().datetime()),
              date_to: z.nullable(z.string().datetime()),
              stratum: z.string(),
              geography: Geography,
              geography_type: GeographyType,
            }),
          })
        ),
        headline_number_columns: z.array(
          z.discriminatedUnion('type', [
            z.object({
              id: z.string(),
              type: z.literal('headline_number'),
              value: HeadlineWithNumber,
            }),
            z.object({
              id: z.string(),
              type: z.literal('trend_number'),
              value: HeadlineWithTrend,
            }),
          ])
        ),
      }),
    })
  ),
})

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
    value: WithChartHeadlineAndTrendCard,
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
