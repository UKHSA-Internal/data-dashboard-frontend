import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { renderSection } from '@/app/utils/cms.utils'

import { HOMEPAGE_CMS_SLUG } from '../constants/app.constants'

export async function generateMetadata(): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug<PageType.Home>(HOMEPAGE_CMS_SLUG, { type: PageType.Home })

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
  } = await getPageBySlug<PageType.Home>(HOMEPAGE_CMS_SLUG, { type: PageType.Home })

  return (
    <View heading={title} description={description} showWelcome>
      {body.map(renderSection)}
      <RelatedLinks variant="footer">
        {relatedLinks.map(({ title, body, url, id }) => (
          <RelatedLink key={id} url={url} title={title}>
            {body}
          </RelatedLink>
        ))}
      </RelatedLinks>
    </View>
  )
}
