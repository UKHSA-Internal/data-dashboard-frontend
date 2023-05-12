import { z } from 'zod'

export const ChartTypes = z.enum(['simple_line', 'waffle', 'line_with_shaded_section', 'bar', 'line_multi_coloured'])

export type ChartTypes = z.infer<typeof ChartTypes>
