import { z } from 'zod'

export const Geography = z.string()

export type Geography = z.infer<typeof Geography>
