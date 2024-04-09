import { Metadata } from 'next'
import Link from 'next/link'

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
      <Link className="govuk-button govuk-button--secondary inline-flex gap-2" href={'/weather-health-alerts'}>
        <svg focusable="false" width="15" height="20" viewBox="0 0 15 20">
          <path
            d="M15,7.5c0.009,3.778 -4.229,9.665 -7.5,12.5c-3.271,-2.835 -7.509,-8.722 -7.5,-12.5c0,-4.142 3.358,-7.5 7.5,-7.5c4.142,0 7.5,3.358 7.5,7.5Zm-7.5,5.461c3.016,0 5.461,-2.445 5.461,-5.461c0,-3.016 -2.445,-5.461 -5.461,-5.461c-3.016,0 -5.461,2.445 -5.461,5.461c0,3.016 2.445,5.461 5.461,5.461Z"
            fill="currentColor"
          ></path>
        </svg>
        View map of weather health alerts
      </Link>
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
