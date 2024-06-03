import { flag } from '@unleash/nextjs'
import { Metadata } from 'next'
import Link from 'next/link'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import HealthAlertsLink from '@/app/components/ui/ukhsa/Links/HealthAlertsLink/HealthAlertsLink'
import { List } from '@/app/components/ui/ukhsa/List/List'
import { ListItem } from '@/app/components/ui/ukhsa/List/ListItem'
import { flags } from '@/app/constants/flags.constants'
import { renderCompositeBlock } from '@/app/utils/cms.utils'
import { extractHealthAlertTypeFromSlug } from '@/app/utils/weather-health-alert.utils'

import AlertList from './AlertList'

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

  const { furtherAdviceLinks } = {
    // Further advice links hardcoded currently
    furtherAdviceLinks: [
      {
        id: 0,
        name: 'UKHSA Adverse Weather and Health Plan and supporting evidence',
        link: 'https://www.gov.uk/government/publications/adverse-weather-and-health-plan',
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
      {
        id: 4,
        name: 'Local resilience forums: contact details guidance',
        link: 'https://www.gov.uk/guidance/local-resilience-forums-contact-details',
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

            <AlertList type={type} />
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
