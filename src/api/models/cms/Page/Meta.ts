import { z } from 'zod'

export const Meta = z.object({
  type: z.string(),
  detail_url: z.string(),
  html_url: z.nullable(z.string()),
  slug: z.string(),
  show_in_menus: z.boolean(),
  seo_title: z.string(),
  search_description: z.string(),
  first_published_at: z.string(),
  alias_of: z.null(),
  parent: z.object({
    id: z.number(),
    meta: z.object({
      type: z.string(),
      detail_url: z.string(),
      html_url: z.nullable(z.string()),
    }),
    title: z.string(),
  }),
})

export type Meta = z.infer<typeof Meta>
