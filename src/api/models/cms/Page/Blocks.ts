import { z } from 'zod'

import { requestSchema as headlinesSchema } from '@/api/requests/headlines/getHeadlines'
import { requestSchema as trendsSchema } from '@/api/requests/trends/getTrends'

/**
 * Headline and Trend data types
 */

export const HeadlineNumber = z.object({
  type: z.literal('headline_number'),
  value: headlinesSchema.extend({
    body: z.string(),
  }),
  id: z.string(),
})

export const TrendNumber = z.object({
  type: z.literal('trend_number'),
  value: trendsSchema.extend({
    body: z.string(),
  }),
  id: z.string(),
})

export const PercentageNumber = z.object({
  type: z.literal('percentage_number'),
  value: headlinesSchema.extend({
    body: z.string(),
  }),
  id: z.string(),
})

export const Blocks = z.array(z.discriminatedUnion('type', [HeadlineNumber, TrendNumber, PercentageNumber]))
