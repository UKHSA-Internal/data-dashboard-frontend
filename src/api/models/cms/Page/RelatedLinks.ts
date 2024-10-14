import { z } from 'zod'

export const RelatedLink = z.object({
  id: z.number(),
  meta: z.object({
    type: z.string(),
  }),
  title: z.string(),
  body: z.optional(z.string()),
  url: z.string(),
})
export const RelatedLinks = z.array(RelatedLink)
export type RelatedLinks = z.infer<typeof RelatedLinks>

export const RelatedLinksLayout = z.enum(['Sidebar', 'Footer'])
export type RelatedLinksLayout = z.infer<typeof RelatedLinksLayout>
