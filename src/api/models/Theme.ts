import { z } from 'zod'

export const Theme = z.string()

export type Theme = z.infer<typeof Theme>
