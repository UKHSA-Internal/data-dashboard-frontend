import { z } from 'zod'

export const Topics = z
  .enum(['COVID-19', 'Influenza', 'Adenovirus', 'RSV', 'Rhinovirus', 'Parainfluenza', 'hMPV'])
  .or(z.string())

export type Topics = z.infer<typeof Topics>
