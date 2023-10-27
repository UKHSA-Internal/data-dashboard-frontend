import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug('whats-new-v2', PageType.WhatsNewParent)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function WhatsNewParentPage() {
  const {
    title,
    body,
    last_published_at: lastUpdated,
    related_links: relatedLinks,
  } = await getPageBySlug('whats-new-v2', PageType.WhatsNewParent)

  return (
    <View heading={title} lastUpdated={lastUpdated}>
      <RichText linkedHeadings>{body}</RichText>
      <RelatedLinks>
        {relatedLinks.map(({ title, body, url, id }) => (
          <RelatedLink key={id} url={url} title={title}>
            {body}
          </RelatedLink>
        ))}
      </RelatedLinks>
    </View>
  )
}