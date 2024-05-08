import { flag } from '@unleash/nextjs'
import Link from 'next/link'

import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { List } from '@/app/components/ui/ukhsa/List/List'
import { ListItem, ListItemArrow } from '@/app/components/ui/ukhsa/List/ListItem'
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

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <div className="govuk-body">
            <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />

            <List>
              <ListItem>
                <ListItemArrow>
                  <h2 className="govuk-heading-m">
                    <Link
                      className="govuk-link govuk-link--no-visited-state after:absolute after:inset-0 after:content-['']"
                      href="/adverse-weather/cold-health-alerts"
                    >
                      Cold weather-health alerts
                    </Link>
                  </h2>
                  <p className="govuk-body-m">Check your risk of cold alerts, view latest messages and updates</p>
                </ListItemArrow>
              </ListItem>

              <ListItem>
                <ListItemArrow>
                  <h2 className="govuk-heading-m">
                    <Link
                      className="govuk-link govuk-link--no-visited-state after:absolute after:inset-0 after:content-['']"
                      href="/adverse-weather/heat-health-alerts"
                    >
                      Heat weather-health alerts
                    </Link>
                  </h2>
                  <p className="govuk-body-m">Check your risk of heat alerts, view latest messages and updates</p>
                </ListItemArrow>
              </ListItem>
            </List>
          </div>
        </div>

        <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-6 sticky top-2">
          <RelatedLinks variant="sidebar">
            <RelatedLink title="Adverse weather help" url="/" />
            <RelatedLink title="What to do in adverse weather" url="/" />
          </RelatedLinks>
        </div>
      </div>
    </View>
  )
}
