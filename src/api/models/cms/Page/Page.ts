import { z } from 'zod'

import { Body } from './Body'
import { Meta } from './Meta'
import { RelatedLink } from './RelatedLinks'

export const Page = z.object({
  id: z.number(),
  meta: Meta,
  title: z.string(),
  body: z.array(Body),
  related_links: z.array(RelatedLink),
  last_published_at: z.string().datetime(),
  seo_change_frequency: z.number(),
  seo_priority: z.coerce.number(),
})

export type Page = z.infer<typeof Page>
