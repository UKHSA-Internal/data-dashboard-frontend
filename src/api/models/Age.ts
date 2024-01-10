import { z } from 'zod'

export const Age = z.string()

export type Age = z.infer<typeof Age>
