import { z } from 'zod'

export const GeographyType = z.enum(['', 'Nation'])

export type GeographyType = z.infer<typeof GeographyType>
