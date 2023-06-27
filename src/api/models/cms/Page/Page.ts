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
})

export type Page = z.infer<typeof Page>
