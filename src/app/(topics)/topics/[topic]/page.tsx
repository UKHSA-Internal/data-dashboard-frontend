import { Metadata } from 'next'

import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { Contents, ContentsItem, RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { warmStaticCache } from '@/app/utils/cache.utils'
import { renderCard } from '@/app/utils/cms.utils'
import { logger } from '@/lib/logger'

export const revalidate = 360

export async function generateMetadata({ params: { topic } }: { params: { topic: string } }): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug(topic, PageType.Topic)

  return {
    title: seo_title,
    description: search_description,
  }
}

export async function generateStaticParams() {
  const pages = await getPages(PageType.Topic).catch((err) => {
    logger.error(err)
  })

  if (pages && pages.success) {
    return pages.data.items.map((page) => ({
      topic: page.meta.slug,
    }))
  }

  return []
}

export default async function TopicPage({ params: { topic } }: { params: { topic: string } }) {
  const {
    title,
    body,
    page_description: description,
    last_published_at: lastUpdated,
    related_links: relatedLinks,
  } = await getPageBySlug(topic, PageType.Topic)

  await warmStaticCache<PageType.Topic>(body)

  return (
    <View heading={title} description={description} lastUpdated={lastUpdated}>
      <Contents>
        {body.map(({ id, value }) => (
          <ContentsItem key={id} heading={value.heading}>
            {value.content.map(renderCard)}
          </ContentsItem>
        ))}
      </Contents>
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
