import { flag } from '@unleash/nextjs'
import { Metadata } from 'next'
import Link from 'next/link'

import { HealthAlertStatus, HealthAlertTypes } from '@/api/models/Alerts'
import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
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
import { renderCompositeBlock } from '@/app/utils/cms.utils'
import { extractHealthAlertTypeFromSlug } from '@/app/utils/weather-health-alert.utils'

export async function generateMetadata({ params: { weather } }: { params: { weather: string } }): Promise<Metadata> {
  const { enabled } = await flag(flags.adverseWeather)

  if (!enabled)
    return {
      title: 'Page not found | UKHSA data dashboard',
      description: 'Error - Page not found',
    }

  const {
    meta: { seo_title: title, search_description: description },
  } = await getPageBySlug<PageType.Composite>(weather)

  return {
    title,
    description,
  }
}

interface WeatherHealthAlertProps {
  params: {
    weather: 'heat-health-alerts' | 'cold-health-alerts'
  }
}

export default async function WeatherHealthAlert({ params: { weather } }: WeatherHealthAlertProps) {
  const type: HealthAlertTypes = extractHealthAlertTypeFromSlug(weather)

  const { regions, furtherAdviceLinks } = {
    // TODO: Regions data will come from alerts endpoints (CDD-1972)
    regions: [
      {
        id: 0,
        region: 'East Midlands',
        type: 'heat',
        level: 'Red',
        link: '/adverse-weather/heat-health-alerts/east-midlands',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
      {
        id: 1,
        region: 'East of England',
        type: 'heat',
        level: 'Red',
        link: '/adverse-weather/heat-health-alerts/east-of-england',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
      {
        id: 2,
        region: 'London',
        type: 'heat',
        level: 'Amber',
        link: '/adverse-weather/heat-health-alerts/london',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
      {
        id: 3,
        region: 'North East',
        type: 'heat',
        level: 'Yellow',
        link: '/adverse-weather/heat-health-alerts/north-east',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
      {
        id: 4,
        region: 'North West',
        type: 'heat',
        level: 'Yellow',
        link: '/adverse-weather/heat-health-alerts/north-west',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
      {
        id: 5,
        region: 'South East',
        type: 'heat',
        level: 'No alerts',
        link: '/adverse-weather/heat-health-alerts/south-east',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
      {
        id: 6,
        region: 'South West',
        type: 'heat',
        level: 'No alerts',
        link: '/adverse-weather/heat-health-alerts/south-west',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
      {
        id: 7,
        region: 'West Midlands',
        type: 'heat',
        level: 'No alerts',
        link: '/adverse-weather/heat-health-alerts/west-midlands',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
      {
        id: 8,
        region: 'Yorkshire and Humber',
        type: 'heat',
        level: 'No alerts',
        link: '/adverse-weather/heat-health-alerts/yorkshire-and-humber',
        lastUpdated: 'Updated 7:07am on 8 April 2024',
      },
    ],

    // Further advice links hardcoded currently, need to confirm these are correct and/or if they want them showing
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
  }

  const { title, body, related_links: relatedLinks } = await getPageBySlug<PageType.Composite>(weather)

  return (
    <View
      heading={title}
      breadcrumbs={[
        { name: 'Home', link: '/' },
        { name: 'Adverse Weather', link: '/adverse-weather' },
        { name: title, link: `/adverse-weather/${weather}` },
      ]}
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">{body.map(renderCompositeBlock)}</div>
      </div>

      <HealthAlertsLink type={type} className="govuk-!-margin-bottom-5" />

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

        <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-2 sticky top-2">
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
