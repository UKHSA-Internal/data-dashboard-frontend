import { flag } from '@unleash/nextjs'

import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
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
    title: 'Health alerts page',
    description: 'Health alerts page description',
  }
}

export default async function WeatherHealthAlert() {
  const { title } = {
    title: 'Heat health alerts',
  }

  return (
    <View
      heading={title}
      breadcrumbs={[
        { name: 'Home', link: '/' },
        { name: 'Adverse Weather', link: '/adverse-weather' },
        { name: 'Heat Health Alerts', link: '/adverse-weather/heat-health-alerts' },
      ]}
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <div className="govuk-body">
            The alerting system provides an early warning when adverse temperatures are likely to impact on the health
            and wellbeing of the population. The Weather-Health Alerting System is provided by the UK Health Security
            Agency (UKHSA) in partnership with the Met Office. It’s intended to provide early warning to the health and
            social care sector, the responder community, the voluntary and community sector and government departments
            when adverse temperatures are likely to impact on the health and wellbeing of the population. The
            Weather-Health Alerting System is made up of the Heat-Health Alerts (HHA) and the Cold-Health Alerts (CHA).
            The Weather-Health Alerting System underpins the Adverse Weather and Health Plan.
          </div>
        </div>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <div className="govuk-body">
            <hr
              className="govuk-section-break govuk-section-break--l govuk-section-break--visible"
              role="presentation"
            />

            <List>
              <ListItem>
                <ListItemArrow>
                  <ListItemArrowLink href="/adverse-weather/cold-health-alerts">East midlands</ListItemArrowLink>
                  <ListItemArrowParagraph>
                    Check your risk of cold alerts, view latest messages and updates
                  </ListItemArrowParagraph>
                </ListItemArrow>
              </ListItem>

              <ListItem>
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
