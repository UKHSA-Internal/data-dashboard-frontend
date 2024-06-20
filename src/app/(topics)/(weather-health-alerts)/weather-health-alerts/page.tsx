import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import HealthAlertsLink from '@/app/components/ui/ukhsa/Links/HealthAlertsLink/HealthAlertsLink'
import { List } from '@/app/components/ui/ukhsa/List/List'
import { ListItem } from '@/app/components/ui/ukhsa/List/ListItem'
import { ListItemArrow, ListItemArrowLink, ListItemArrowParagraph } from '@/app/components/ui/ukhsa/List/ListItemArrow'
import { flags } from '@/app/constants/flags.constants'
import { renderCompositeBlock } from '@/app/utils/cms.utils'
import { getFeatureFlag } from '@/app/utils/flags.utils'

export async function generateMetadata() {
  const { enabled } = await getFeatureFlag(flags.weatherHealthAlert)

  if (!enabled)
    return {
      title: 'Page not found | UKHSA data dashboard',
      description: 'Error - Page not found',
    }

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
        <div className="govuk-grid-column-two-thirds-from-desktop">
          <div className="govuk-body">
            <hr
              className="govuk-section-break govuk-section-break--l govuk-section-break--visible"
              role="presentation"
            />

            <List aria-label="Weather health alerts">
              {childPages.success &&
                childPages.data.items.map(({ id: childId, title, meta }) => (
                  <ListItem key={childId} spacing="l">
                    <ListItemArrow>
                      <ListItemArrowLink href={`/weather-health-alerts/${meta.slug}`}>{title}</ListItemArrowLink>
                      {/* TODO: Child page description to come from the CMS in future. CDD-1980 */}
                      <ListItemArrowParagraph>{`View all ${meta.slug.split('-')[0]} health alerts currently in place in England`}</ListItemArrowParagraph>
                    </ListItemArrow>
                  </ListItem>
                ))}
            </List>
          </div>
        </div>

        <div className="govuk-grid-column-one-third-from-desktop govuk-!-margin-top-6 sticky top-2">
          <RelatedLinks variant="sidebar">
            {relatedLinks.map(({ title, url, id }) => (
              <RelatedLink key={id} title={title} url={url} />
            ))}
          </RelatedLinks>
        </div>
      </div>
    </View>
  )
}
