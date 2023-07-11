import * as z from 'zod'

export const feedbackSchema = z
  .object({
    reason: z.string().optional().nullable(),
    did_you_find_everything: z.enum(['yes', 'no']),
    improve_experience: z.string().optional().nullable(),
    like_to_see: z.string().optional().nullable(),
  })
  .required()
