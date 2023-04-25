import { z } from 'zod'

export const Geography = z.enum(['', 'England'])

export type Geography = z.infer<typeof Geography>
