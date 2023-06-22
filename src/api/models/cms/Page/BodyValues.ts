import { Metrics, PercentageMetrics } from '../../Metrics'

import { Topics } from '../../Topics'
import { z } from 'zod'

/**
 * Headline and Trend data types
 */

export const HeadlineNumber = z.object({
  type: z.literal('headline_number'),
  value: z.object({
    topic: Topics,
    metric: Metrics,
    body: z.string(),
  }),
  id: z.string(),
})

export const TrendNumber = z.object({
  type: z.literal('trend_number'),
  value: z.object({
    topic: Topics,
    metric: Metrics,
    percentage_metric: PercentageMetrics,
    body: z.string(),
  }),
  id: z.string(),
})

export const PercentageNumber = z.object({
  type: z.literal('percentage_number'),
  value: z.object({
    topic: Topics,
    metric: Metrics,
    body: z.string(),
  }),
  id: z.string(),
})
