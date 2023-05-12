import { z } from 'zod'

export const ChartLineTypes = z.enum(['', 'SOLID', 'DASH'])

export type ChartLineTypes = z.infer<typeof ChartLineTypes>
