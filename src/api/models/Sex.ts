import { z } from 'zod'

export const Sex = z.enum(['all', 'm', 'f'])

export type Sex = z.infer<typeof Sex>
