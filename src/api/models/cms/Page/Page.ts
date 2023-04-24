import type { RelatedLinks } from './RelatedLinks'
import type { PageBody } from './Body'
import type { Meta } from './Meta'

export type Page = {
  id: number
  meta: Meta
  title: string
  body: PageBody[]
  related_links: RelatedLinks
  last_published_at: string
}
