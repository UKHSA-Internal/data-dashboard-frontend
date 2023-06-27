import { z } from 'zod'

import { ChartLineColours } from '../../ChartLineColours'
import { ChartLineTypes } from '../../ChartLineTypes'
import { ChartTypes } from '../../ChartTypes'
import { Geography } from '../../Geography'
import { GeographyType } from '../../GeographyType'
import { Metrics } from '../../Metrics'
import { Topics } from '../../Topics'

/**
 * Chart type
 */

const Plot = z.object({
  type: z.literal('plot'),
  id: z.string(),
  value: z.object({
    topic: Topics,
    metric: Metrics,
    chart_type: ChartTypes,
    date_from: z.optional(z.nullable(z.string().datetime())),
    date_to: z.optional(z.nullable(z.string().datetime())),
    stratum: z.optional(z.string()),
    geography: z.optional(Geography),
    geography_type: z.optional(GeographyType),
    label: z.optional(z.nullable(z.string())),
    line_colour: z.optional(z.nullable(ChartLineColours)),
    line_type: z.optional(z.nullable(ChartLineTypes)),
  }),
})

export const Chart = z.array(Plot)

export type Chart = z.infer<typeof Chart>
