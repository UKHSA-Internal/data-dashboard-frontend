import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { View } from '@/app/components/ui/ukhsa'
import HealthAlertsLink from '@/app/components/ui/ukhsa/Links/HealthAlertsLink/HealthAlertsLink'
import { List } from '@/app/components/ui/ukhsa/List/List'
import { ListItem } from '@/app/components/ui/ukhsa/List/ListItem'
import { ListItemArrow, ListItemArrowLink, ListItemArrowParagraph } from '@/app/components/ui/ukhsa/List/ListItemArrow'
import { RelatedLinks, RelatedSidebarLink } from '@/app/components/ui/ukhsa/RelatedLinks/v2/RelatedLinks'
import { renderCompositeBlock } from '@/app/utils/cms.utils'

export const dynamic = 'force-dynamic'

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
  } = await getPageBySlug<PageType.Composite>('weather-health-alerts', {
    type: PageType.Composite,
  })

  const childPages = await getPages({ child_of: id.toString() })

  return (
    <View heading={title} breadcrumbs={[{ name: 'Home', link: '/' }]}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <div className="govuk-body">{body.map(renderCompositeBlock)}</div>
        </div>
      </div>

      <HealthAlertsLink type="heat" className="govuk-!-margin-top-1 govuk-!-margin-bottom-1" />

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

        <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-6 sticky top-2">
          <RelatedLinks variant="sidebar">
            {relatedLinks.map(({ title, url, id }) => (
              <RelatedSidebarLink key={id} title={title} url={url} />
            ))}
          </RelatedLinks>
        </div>
      </div>
    </View>
  )
}
