import { flag } from '@unleash/nextjs'
import Link from 'next/link'

import { HealthAlertStatus, HealthAlertTypes } from '@/api/models/Alerts'
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
  const { title, body, regions, relatedLinks, furtherAdviceLinks } = {
    title: 'Heat health alerts',
    body: 'The alerting system provides an early warning when adverse temperatures are likely to impact on the health and wellbeing of the population. The Weather-Health Alerting System is provided by the UK Health Security Agency (UKHSA) in partnership with the Met Office. It’s intended to provide early warning to the health and social care sector, the responder community, the voluntary and community sector and government departments when adverse temperatures are likely to impact on the health and wellbeing of the population. The Weather-Health Alerting System is made up of the Heat-Health Alerts (HHA) and the Cold-Health Alerts (CHA). The Weather-Health Alerting System underpins the Adverse Weather and Health Plan.',
    regions: [
      {
        id: 0,
        region: 'East Midlands',
        type: 'heat',
        level: 'red',
        link: '/adverse-weather/heat-health-alerts/east-midlands',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
      {
        id: 1,
        region: 'East of England',
        type: 'heat',
        level: 'red',
        link: '/adverse-weather/heat-health-alerts/east-of-england',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
      {
        id: 2,
        region: 'London',
        type: 'heat',
        level: 'amber',
        link: '/adverse-weather/heat-health-alerts/london',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
      {
        id: 3,
        region: 'North East',
        type: 'heat',
        level: 'yellow',
        link: '/adverse-weather/heat-health-alerts/north-east',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
      {
        id: 4,
        region: 'North West',
        type: 'heat',
        level: 'yellow',
        link: '/adverse-weather/heat-health-alerts/north-west',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
      {
        id: 5,
        region: 'South East',
        type: 'heat',
        level: 'no alerts',
        link: '/adverse-weather/heat-health-alerts/south-east',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
      {
        id: 6,
        region: 'South West',
        type: 'heat',
        level: 'no alerts',
        link: '/adverse-weather/heat-health-alerts/south-west',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
      {
        id: 7,
        region: 'West Midlands',
        type: 'heat',
        level: 'no alerts',
        link: '/adverse-weather/heat-health-alerts/west-midlands',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
      {
        id: 8,
        region: 'Yorkshire and Humber',
        type: 'heat',
        level: 'no alerts',
        link: '/adverse-weather/heat-health-alerts/yorkshire-and-humber',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
    ],
    furtherAdviceLinks: [
      {
        id: 0,
        name: 'UKHSA Adverse Weather and Health Plan and supporting evidence',
        link: 'https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/1171545/Adverse-weather-health-plan-2023.pdf',
      },
      {
        id: 1,
        name: 'Find the latest weather forecasts and warnings',
        link: 'https://www.metoffice.gov.uk/',
      },
      {
        id: 2,
        name: 'Met Office National Severe Weather Warning Service',
        link: 'https://www.metoffice.gov.uk/weather/warnings-and-advice/uk-warnings',
      },
      {
        id: 3,
        name: 'Flood Alerts and Warnings',
        link: 'https://check-for-flooding.service.gov.uk/alerts-and-warnings',
      },
    ],
    relatedLinks: [
      { title: 'Adverse weather help', url: '/', id: 0 },
      { title: 'What to do in adverse weather', url: '/', id: 1 },
    ],
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
          <div className="govuk-body">{body}</div>
        </div>
      </div>

      <HealthAlertsLink className="govuk-!-margin-bottom-5" />

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <div className="govuk-body">
            <hr
              className="govuk-section-break govuk-section-break--m govuk-section-break--visible govuk-!-margin-top-2 govuk-!-margin-bottom-2"
              role="presentation"
            />

            <List>
              {regions.map(({ id, region, type, level, link, lastUpdated }) => (
                <ListItem key={id} spacing="s">
                  <ListItemStatus>
                    {/* TODO: Remove type cast after integration*/}
                    <ListItemStatusIcon
                      level={level as HealthAlertStatus | 'No alerts'}
                      type={type as HealthAlertTypes}
                    />
                    <ListItemStatusContent>
                      <ListItemStatusLink href={link}>{region}</ListItemStatusLink>
                      <ListItemStatusTimestamp>{lastUpdated}</ListItemStatusTimestamp>
                    </ListItemStatusContent>
                    {/* TODO: Remove type cast */}
                    <ListItemStatusTag
                      level={level as HealthAlertStatus | 'No alerts'}
                      type={type as HealthAlertTypes}
                      region={region}
                    />
                  </ListItemStatus>
                </ListItem>
              ))}
            </List>
          </div>

          <h3 className="govuk-heading-m govuk-!-margin-top-8 govuk-!-margin-bottom-1">Further advice and guidance</h3>
          <List className="govuk-!-margin-bottom-7">
            {furtherAdviceLinks.map(({ id, name, link }) => (
              <ListItem key={id} showRule={false}>
                <Link
                  className="govuk-link govuk-link--no-visited-state"
                  href={link}
                  rel="noreferrer nofollow"
                  target="_blank"
                >
                  {name}
                </Link>
              </ListItem>
            ))}
          </List>
        </div>

        <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-1 sticky top-2">
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
