import { z } from 'zod'

export const BodyType = z.enum(['text', 'headline_numbers_row_card', 'chart_with_headline_and_trend_card'])

export type BodyType = z.infer<typeof BodyType>
