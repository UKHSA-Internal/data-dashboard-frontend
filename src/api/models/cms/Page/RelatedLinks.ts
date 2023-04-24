import { z } from 'zod'

const RelatedLink = z.object({
  id: z.number(),
  meta: z.object({
    type: z.string(),
  }),
  title: z.string(),
  body: z.string(),
  url: z.string(),
})

export const RelatedLinks = z.array(RelatedLink)

export type RelatedLinks = z.infer<typeof RelatedLinks>
