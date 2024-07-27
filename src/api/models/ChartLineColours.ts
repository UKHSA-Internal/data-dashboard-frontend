import { z } from 'zod'

export const ChartLineColours = z.string()

export type ChartLineColours = z.infer<typeof ChartLineColours>
