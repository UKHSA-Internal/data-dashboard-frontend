import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'

import { RichText } from '../components/cms'
import { RelatedLink, RelatedLinks, View } from '../components/ui/ukhsa'

export const revalidate = 3600 // revalidate every hour

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug(slug, PageType.Common)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function CommonPage({ params: { slug } }: { params: { slug: string } }) {
  const {
    title,
    body,
    last_published_at: lastUpdated,
    related_links: relatedLinks,
  } = await getPageBySlug(slug, PageType.Common)

  return (
    <View heading={title} lastUpdated={lastUpdated}>
      <RichText linkedHeadings>{body}</RichText>
      {relatedLinks.length && (
        <RelatedLinks>
          {relatedLinks.map(({ title, body, url, id }) => (
            <RelatedLink key={id} url={url} title={title}>
              {body}
            </RelatedLink>
          ))}
        </RelatedLinks>
      )}
    </View>
  )
}
