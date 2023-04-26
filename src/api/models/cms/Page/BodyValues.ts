import { z } from 'zod'
import { Topics } from '../../Topics'
import { Metrics, PercentageMetrics } from '../../Metrics'

export const HeadlineWithNumber = z.object({
  topic: Topics,
  metric: Metrics,
  body: z.string(),
})

export const HeadlineWithTrend = z.object({
  topic: Topics,
  metric: Metrics,
  percentage_metric: PercentageMetrics,
  body: z.string(),
})
