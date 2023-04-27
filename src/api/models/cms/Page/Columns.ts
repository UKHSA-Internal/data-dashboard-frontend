import { z } from 'zod'
import { HeadlineWithTrend, HeadlineWithNumber } from './BodyValues'

/**
 * Column types
 * Variations of type of column that can appear in the headline row card
 */

export const HeadlineAndTrend = z.object({
  id: z.string(),
  type: z.literal('headline_and_trend_component'),
  value: z.object({
    title: z.string(),
    headline_number: HeadlineWithNumber,
    trend_number: HeadlineWithTrend,
  }),
})

export const DualHeadline = z.object({
  id: z.string(),
  type: z.literal('dual_headline_component'),
  value: z.object({
    title: z.string(),
    top_headline_number: HeadlineWithNumber,
    bottom_headline_number: HeadlineWithNumber,
  }),
})

export const SingleHeadline = z.object({
  id: z.string(),
  type: z.literal('single_headline_component'),
  value: z.object({
    title: z.string(),
    headline_number: HeadlineWithNumber,
  }),
})
