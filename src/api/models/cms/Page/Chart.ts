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
    stratum: z.string().optional(),
    geography: Geography.optional(),
    geography_type: GeographyType.optional(),
    sex: z.string().nullable().optional(),
    age: z.string().nullable().optional(),
    date_from: z.string().nullable().optional(),
    date_to: z.string().nullable().optional(),
    label: z.string().nullable().optional(),
    line_colour: ChartLineColours.nullable().optional(),
    line_type: ChartLineTypes.nullable().optional(),
    use_smooth_lines: z.boolean().optional(),
    use_markers: z.boolean().optional(),
  }),
})

export const Chart = z.array(Plot)

export type Chart = z.infer<typeof Chart>
