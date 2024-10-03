import { z } from 'zod'

export const ChartLineColours = z.string()
export type ChartLineColours = z.infer<typeof ChartLineColours>

export const ChartLineTypes = z.string()
export type ChartLineTypes = z.infer<typeof ChartLineTypes>

export const ChartTypes = z
  .enum(['simple_line', 'waffle', 'line_with_shaded_section', 'bar', 'line_multi_coloured'])
  .or(z.string())
export type ChartTypes = z.infer<typeof ChartTypes>

export const ChartFigure = z
  .object({
    data: z.array(z.object({}).passthrough()),
    layout: z.object({}).passthrough(),
  })
  .passthrough()
export type ChartFigure = z.infer<typeof ChartFigure>
