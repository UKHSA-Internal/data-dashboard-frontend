import { Suspense } from 'react'

import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { View } from '@/app/components/ui/ukhsa'
import HealthAlertsLink from '@/app/components/ui/ukhsa/Links/HealthAlertsLink/HealthAlertsLink'
import { List } from '@/app/components/ui/ukhsa/List/List'
import { ListItem } from '@/app/components/ui/ukhsa/List/ListItem'
import { ListItemArrow, ListItemArrowLink, ListItemArrowParagraph } from '@/app/components/ui/ukhsa/List/ListItemArrow'
import { RelatedLinksWrapper } from '@/app/components/ui/ukhsa/RelatedLinks/RelatedLinksWrapper'
import { Breadcrumbs } from '@/app/components/ui/ukhsa/View/Breadcrumbs/Breadcrumbs'
import { Heading } from '@/app/components/ui/ukhsa/View/Heading/Heading'
import { renderCompositeBlock } from '@/app/utils/cms.utils'
import { cachingEnabled } from '@/config/constants'

export const dynamic = cachingEnabled ? 'auto' : 'force-dynamic'
export const revalidate = 60

export async function generateMetadata() {
  const {
    meta: { seo_title: title, search_description: description },
  } = await getPageBySlug('weather-health-alerts', { type: PageType.Composite })

  return {
    title,
    description,
  }
}

export default async function WeatherHealthAlerts() {
  const {
    id,
    title,
    body,
    related_links: relatedLinks,
    related_links_layout: relatedLinksLayout,
  } = await getPageBySlug<PageType.Composite>('weather-health-alerts', {
    type: PageType.Composite,
  })

  const childPages = await getPages({ child_of: id.toString() })

  return (
    <View>
      <Breadcrumbs breadcrumbs={[{ name: 'Home', link: '/' }]} />
      <Heading heading={title} />
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <div className="govuk-body">{body.map(renderCompositeBlock)}</div>
        </div>
      </div>

      <Suspense>
        <HealthAlertsLink type="cold" className="govuk-!-margin-top-1 govuk-!-margin-bottom-1" />
      </Suspense>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <div className="govuk-body">
            <hr
              className="govuk-section-break govuk-section-break--l govuk-section-break--visible"
              role="presentation"
            />

            <List aria-label="Weather health alerts">
              {childPages.success &&
                childPages.data.items.map(({ id: childId, title, meta: { slug, search_description: description } }) => (
                  <ListItem key={childId} spacing="l">
                    <ListItemArrow>
                      <ListItemArrowLink href={`/weather-health-alerts/${slug}`}>{title}</ListItemArrowLink>
                      <ListItemArrowParagraph>{description}</ListItemArrowParagraph>
                    </ListItemArrow>
                  </ListItem>
                ))}
            </List>
          </div>
        </div>

        {relatedLinksLayout === 'Sidebar' ? (
          <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-6 sticky top-2">
            <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks} />
          </div>
        ) : null}
      </div>

      {relatedLinksLayout === 'Footer' ? (
        <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks} />
      ) : null}
    </View>
  )
}
