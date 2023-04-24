import { z } from 'zod'

export const ChartTypes = z.enum(['simple_line', 'waffle', 'line_with_shaded_section'])
