import { z } from 'zod'

export const Stratum = z.string()

export type Stratum = z.infer<typeof Stratum>
