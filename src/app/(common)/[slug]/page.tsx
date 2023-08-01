import { Metadata } from 'next'

import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { logger } from '@/lib/logger'

export const revalidate = 360

export const revalidate = 360

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
