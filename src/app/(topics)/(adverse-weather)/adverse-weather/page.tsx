import { flag } from '@unleash/nextjs'

import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import HealthAlertsLink from '@/app/components/ui/ukhsa/Links/HealthAlertsLink/HealthAlertsLink'
import { List } from '@/app/components/ui/ukhsa/List/List'
import { ListItem } from '@/app/components/ui/ukhsa/List/ListItem'
import { ListItemArrow, ListItemArrowLink, ListItemArrowParagraph } from '@/app/components/ui/ukhsa/List/ListItemArrow'
import { flags } from '@/app/constants/flags.constants'

export async function generateMetadata() {
  const { enabled } = await flag(flags.adverseWeather)

  if (!enabled)
    return {
      title: 'Page not found',
      description: 'Error - Page not found',
    }

  return {
    title: 'Extreme events category page',
    description: 'Extreme events category page description',
  }
}

export default async function AdverseWeather() {
  const { title } = {
    title: 'Adverse Weather',
  }

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
          <div className="govuk-body">
            Summary of weather health alerts data in England. For more detailed data, go to the individual event pages.
            The Weather-Health Alerting System is provided by the UK Health Security Agency (UKHSA) in partnership with
            the Met Office.
          </div>
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
              <ListItem spacing="l">
                <ListItemArrow>
                  <ListItemArrowLink href="/adverse-weather/cold-health-alerts">
                    Cold weather-health alerts
                  </ListItemArrowLink>
                  <ListItemArrowParagraph>
                    Check your risk of cold alerts, view latest messages and updates
                  </ListItemArrowParagraph>
                </ListItemArrow>
              </ListItem>

              <ListItem spacing="l">
                <ListItemArrow>
                  <ListItemArrowLink href="/adverse-weather/heat-health-alerts">
                    Heat weather-health alerts
                  </ListItemArrowLink>
                  <ListItemArrowParagraph>
                    Check your risk of heat alerts, view latest messages and updates
                  </ListItemArrowParagraph>
                </ListItemArrow>
              </ListItem>
            </List>
          </div>
        </div>

        <div className="govuk-grid-column-one-third-from-desktop govuk-!-margin-top-6 sticky top-2">
          <RelatedLinks variant="sidebar">
            <RelatedLink title="Adverse weather help" url="/" />
            <RelatedLink title="What to do in adverse weather" url="/" />
          </RelatedLinks>
        </div>
      </div>
    </View>
  )
}
