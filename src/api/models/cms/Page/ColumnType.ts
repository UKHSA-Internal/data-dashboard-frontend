import { z } from 'zod'

export const ColumnType = z.enum([
  'headline_and_trend_component',
  'dual_headline_component',
  'single_headline_component',
])

export type ColumnType = z.infer<typeof ColumnType>
