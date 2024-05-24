import { flag } from '@unleash/nextjs'

import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import HealthAlertsLink from '@/app/components/ui/ukhsa/Links/HealthAlertsLink/HealthAlertsLink'
import { List } from '@/app/components/ui/ukhsa/List/List'
import { ListItem } from '@/app/components/ui/ukhsa/List/ListItem'
import { ListItemArrow, ListItemArrowLink } from '@/app/components/ui/ukhsa/List/ListItemArrow'
import { flags } from '@/app/constants/flags.constants'
import { renderCompositeBlock } from '@/app/utils/cms.utils'

export async function generateMetadata() {
  const { enabled } = await flag(flags.adverseWeather)

  if (!enabled)
    return {
      title: 'Page not found | UKHSA data dashboard',
      description: 'Error - Page not found',
    }

  const {
    meta: { seo_title: title, search_description: description },
  } = await getPageBySlug('adverse-weather', { type: PageType.Composite })

  return {
    title,
    description,
  }
}

export default async function AdverseWeather() {
  const {
    id,
    title,
    body,
    related_links: relatedLinks,
  } = await getPageBySlug<PageType.Composite>('adverse-weather', {
    type: PageType.Composite,
  })

  const childPages = await getPages({ child_of: id.toString() })

  // TODO: Investigate hardcoding the listItem body. Check with client
  // const { adverseWeatherAlerts } = {
  //   adverseWeatherAlerts: [
  //     {
  //       id: 0,
  //       name: 'Cold health alerts',
  //       link: '/adverse-weather/cold-health-alerts',
  //       body: 'Check your risk of cold alerts, view latest messages and updates',
  //     },
  //     {
  //       id: 1,
  //       name: 'Heat health alerts',
  //       link: '/adverse-weather/heat-health-alerts',
  //       body: 'Check your risk of heat alerts, view latest messages and updates',
  //     },
  //   ],
  // }

  return (
    <View
      heading={title}
      breadcrumbs={[
        { name: 'Home', link: '/' },
        { name: 'Adverse Weather', link: '/adverse-weather' },
      ]}
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <div className="govuk-body">{body.map(renderCompositeBlock)}</div>
        </div>
      </div>

      <HealthAlertsLink className="govuk-!-margin-top-1 govuk-!-margin-bottom-1" />

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds-from-desktop">
          <div className="govuk-body">
            <hr
              className="govuk-section-break govuk-section-break--l govuk-section-break--visible"
              role="presentation"
            />

            <List>
              {childPages.success &&
                childPages.data.items.map(({ id: childId, title, meta }) => (
                  <ListItem key={childId} spacing="l">
                    <ListItemArrow>
                      <ListItemArrowLink href={`/adverse-weather/${meta.slug}`}>{title}</ListItemArrowLink>
                      {/* <ListItemArrowParagraph>{body}</ListItemArrowParagraph> */}
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
