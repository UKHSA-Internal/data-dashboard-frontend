import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'

import { RelatedLink, RelatedLinks, View } from './components/ui/ukhsa'
import { warmStaticCache } from './utils/cache.utils'
import { renderSection } from './utils/cms.utils'

export async function generateMetadata(): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug('respiratory-viruses', PageType.Home)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function HomePage() {
  const {
    title,
    body,
    page_description: description,
    related_links: relatedLinks,
  } = await getPageBySlug('respiratory-viruses', PageType.Home)

  await warmStaticCache<PageType.Home>(body)

  return (
    <View heading={title} description={description} showWelcome>
      {body.map(renderSection)}
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
