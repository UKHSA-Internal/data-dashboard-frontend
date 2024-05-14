import { flag } from '@unleash/nextjs'
import Link from 'next/link'

import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { List } from '@/app/components/ui/ukhsa/List/List'
import { ListItem } from '@/app/components/ui/ukhsa/List/ListItem'
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
              className="govuk-section-break govuk-section-break--m govuk-section-break--visible"
              role="presentation"
            />

            <List>
              <ListItem>
                <div className="">Icon</div>
                <Link href="/">East Midlands</Link>
                <span>Updated 7:07am on 8 April 2024</span>
                <div>RED</div>
              </ListItem>
              <ListItem>East of England</ListItem>
              <ListItem>London</ListItem>
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
