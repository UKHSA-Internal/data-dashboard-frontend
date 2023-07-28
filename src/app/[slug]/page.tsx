import { Metadata } from 'next'

import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { logger } from '@/lib/logger'

import { RichText } from '../components/cms'
import { RelatedLink, RelatedLinks, View } from '../components/ui/ukhsa'

// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#segment-cache-configuration
export const revalidate = 600

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug(slug, PageType.Common)

  return {
    title: seo_title,
    description: search_description,
  }
}

export async function generateStaticParams() {
  const pages = await getPages(PageType.Common).catch((err) => {
    logger.error(err)
  })

  if (pages && pages.success) {
    return pages.data.items.map((page) => ({
      slug: page.meta.slug,
    }))
  }

  return []
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
