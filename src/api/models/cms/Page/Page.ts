import { z } from 'zod'

import { Body } from './Body'
import { Meta } from './Meta'
import { RelatedLink } from './RelatedLinks'
import { Announcements } from './Announcements'

export const Page = z.object({
  id: z.number(),
  meta: Meta,
  title: z.string(),
  body: z.array(Body),
  // TODO: related_links_layout should appear on app pages?
  related_links_layout: z.optional(z.string()),
  related_links: z.array(RelatedLink),
  last_published_at: z.string().datetime(),
  seo_change_frequency: z.number(),
  seo_priority: z.coerce.number(),
  announcements: z.optional(Announcements),
})

export type Page = z.infer<typeof Page>
