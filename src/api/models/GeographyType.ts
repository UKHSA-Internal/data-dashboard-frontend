import { z } from 'zod'

export const GeographyType = z.string()

export type GeographyType = z.infer<typeof GeographyType>
