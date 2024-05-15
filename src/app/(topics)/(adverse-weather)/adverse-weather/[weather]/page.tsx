import { flag } from '@unleash/nextjs'
import Link from 'next/link'

import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import HealthAlertsLink from '@/app/components/ui/ukhsa/Links/HealthAlertsLink/HealthAlertsLink'
import { List } from '@/app/components/ui/ukhsa/List/List'
import { ListItem } from '@/app/components/ui/ukhsa/List/ListItem'
import {
  ListItemStatus,
  ListItemStatusContent,
  ListItemStatusIcon,
  ListItemStatusLink,
  ListItemStatusTag,
  ListItemStatusTimestamp,
} from '@/app/components/ui/ukhsa/List/ListItemStatus'
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

      <HealthAlertsLink className="govuk-!-margin-bottom-5" />

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <div className="govuk-body">
            <hr
              className="govuk-section-break govuk-section-break--m govuk-section-break--visible govuk-!-margin-top-1 govuk-!-margin-bottom-1"
              role="presentation"
            />

            <List>
              <ListItem spacing="s">
                <ListItemStatus>
                  <ListItemStatusIcon alertLevel="red" weather="heat" />
                  <ListItemStatusContent>
                    <ListItemStatusLink href="/">East Midlands</ListItemStatusLink>
                    <ListItemStatusTimestamp>Updated 7:07am on 8 April 2024</ListItemStatusTimestamp>
                  </ListItemStatusContent>
                  <ListItemStatusTag alertLevel="red" />
                </ListItemStatus>
              </ListItem>

              <ListItem spacing="s">
                <ListItemStatus>
                  <ListItemStatusIcon alertLevel="red" weather="heat" />
                  <ListItemStatusContent>
                    <ListItemStatusLink href="/">East of England</ListItemStatusLink>
                    <ListItemStatusTimestamp>Updated 7:07am on 8 April 2024</ListItemStatusTimestamp>
                  </ListItemStatusContent>
                  <ListItemStatusTag alertLevel="red" />
                </ListItemStatus>
              </ListItem>

              <ListItem spacing="s">
                <ListItemStatus>
                  <ListItemStatusIcon alertLevel="amber" weather="heat" />
                  <ListItemStatusContent>
                    <ListItemStatusLink href="/">London</ListItemStatusLink>
                    <ListItemStatusTimestamp>Updated 7:07am on 8 April 2024</ListItemStatusTimestamp>
                  </ListItemStatusContent>
                  <ListItemStatusTag alertLevel="amber" />
                </ListItemStatus>
              </ListItem>

              <ListItem spacing="s">
                <ListItemStatus>
                  <ListItemStatusIcon alertLevel="yellow" weather="heat" />
                  <ListItemStatusContent>
                    <ListItemStatusLink href="/">North East</ListItemStatusLink>
                    <ListItemStatusTimestamp>Updated 7:07am on 8 April 2024</ListItemStatusTimestamp>
                  </ListItemStatusContent>
                  <ListItemStatusTag alertLevel="yellow" />
                </ListItemStatus>
              </ListItem>

              <ListItem spacing="s">
                <ListItemStatus>
                  <ListItemStatusIcon alertLevel="yellow" weather="heat" />
                  <ListItemStatusContent>
                    <ListItemStatusLink href="/">North West</ListItemStatusLink>
                    <ListItemStatusTimestamp>Updated 7:07am on 8 April 2024</ListItemStatusTimestamp>
                  </ListItemStatusContent>
                  <ListItemStatusTag alertLevel="yellow" />
                </ListItemStatus>
              </ListItem>

              <ListItem spacing="s">
                <ListItemStatus>
                  <ListItemStatusIcon alertLevel="green" weather="heat" />
                  <ListItemStatusContent>
                    <ListItemStatusLink href="/">South East</ListItemStatusLink>
                    <ListItemStatusTimestamp>Updated 7:07am on 8 April 2024</ListItemStatusTimestamp>
                  </ListItemStatusContent>
                  <ListItemStatusTag alertLevel="no alerts" />
                </ListItemStatus>
              </ListItem>

              <ListItem spacing="s">
                <ListItemStatus>
                  <ListItemStatusIcon alertLevel="green" weather="heat" />
                  <ListItemStatusContent>
                    <ListItemStatusLink href="/">South West</ListItemStatusLink>
                    <ListItemStatusTimestamp>Updated 7:07am on 8 April 2024</ListItemStatusTimestamp>
                  </ListItemStatusContent>
                  <ListItemStatusTag alertLevel="no alerts" />
                </ListItemStatus>
              </ListItem>

              <ListItem spacing="s">
                <ListItemStatus>
                  <ListItemStatusIcon alertLevel="green" weather="heat" />
                  <ListItemStatusContent>
                    <ListItemStatusLink href="/">West Midlands</ListItemStatusLink>
                    <ListItemStatusTimestamp>Updated 7:07am on 8 April 2024</ListItemStatusTimestamp>
                  </ListItemStatusContent>
                  <ListItemStatusTag alertLevel="no alerts" />
                </ListItemStatus>
              </ListItem>

              <ListItem spacing="s">
                <ListItemStatus>
                  <ListItemStatusIcon alertLevel="green" weather="heat" />
                  <ListItemStatusContent>
                    <ListItemStatusLink href="/">Yorkshire and Humber</ListItemStatusLink>
                    <ListItemStatusTimestamp>Updated 7:07am on 8 April 2024</ListItemStatusTimestamp>
                  </ListItemStatusContent>
                  <ListItemStatusTag alertLevel="no alerts" />
                </ListItemStatus>
              </ListItem>
            </List>
          </div>

          <h3 className="govuk-heading-s govuk-!-margin-top-8 govuk-!-margin-bottom-1">Further advice and guidance</h3>
          <Link className="govuk-link govuk-link--no-visited-state" href="/">
            Hot weather and Health: Supporting vulnerable people
          </Link>

          <h3 className="govuk-heading-s govuk-!-margin-top-8 govuk-!-margin-bottom-1">UKHSA Action Cards</h3>
          <List>
            <ListItem showRule={false}>
              <Link className="govuk-link govuk-link--no-visited-state" href="/">
                Voluntary and community sector
              </Link>
            </ListItem>
            <ListItem showRule={false}>
              <Link className="govuk-link govuk-link--no-visited-state" href="/">
                Commissioners
              </Link>
            </ListItem>
            <ListItem showRule={false}>
              <Link className="govuk-link govuk-link--no-visited-state" href="/">
                Health and social care providers
              </Link>
            </ListItem>
          </List>
        </div>

        <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-1 sticky top-2">
          <RelatedLinks variant="sidebar">
            <RelatedLink title="Adverse weather help" url="/" />
            <RelatedLink title="What to do in adverse weather" url="/" />
          </RelatedLinks>
        </div>
      </div>
    </View>
  )
}
