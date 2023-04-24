import { z } from 'zod'

export const Topics = z.enum(['COVID-19', 'Influenza'])

export type Topics = z.infer<typeof Topics>
