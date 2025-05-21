import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { Announcements, View } from '@/app/components/ui/ukhsa'
import HealthAlertsLink from '@/app/components/ui/ukhsa/Links/HealthAlertsLink/HealthAlertsLink'
import { List } from '@/app/components/ui/ukhsa/List/List'
import { ListItem } from '@/app/components/ui/ukhsa/List/ListItem'
import { RelatedLinksWrapper } from '@/app/components/ui/ukhsa/RelatedLinks/RelatedLinksWrapper'
import { Breadcrumbs } from '@/app/components/ui/ukhsa/View/Breadcrumbs/Breadcrumbs'
import { Heading } from '@/app/components/ui/ukhsa/View/Heading/Heading'
import { renderCompositeBlock } from '@/app/utils/cms.utils'
import { cachingEnabled } from '@/config/constants'

import AlertList from './AlertList'

export const dynamic = cachingEnabled ? 'auto' : 'force-dynamic'

export async function generateMetadata({ params: { weather } }: { params: { weather: string } }): Promise<Metadata> {
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
    weather: HealthAlertTypes
  }
}

export default async function WeatherHealthAlert({ params: { weather } }: WeatherHealthAlertProps) {
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

  const {
    title,
    body,
    related_links: relatedLinks,
    related_links_layout: relatedLinksLayout,
    active_announcements: activeAnnouncements,
  } = await getPageBySlug<PageType.Composite>(weather)

  return (
    <View>
      <Breadcrumbs
        breadcrumbs={[
          { name: 'Home', link: '/' },
          { name: 'Weather health alerts', link: '/weather-health-alerts' },
        ]}
      />
      <Heading heading={title} />
      <Announcements announcements={activeAnnouncements} />
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">{body.map(renderCompositeBlock)}</div>
      </div>

      <Suspense>
        <HealthAlertsLink type={weather} className="govuk-!-margin-bottom-5" />
      </Suspense>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <div className="govuk-body">
            <hr
              className="govuk-section-break govuk-section-break--m govuk-section-break--visible govuk-!-margin-top-2 govuk-!-margin-bottom-2"
              role="presentation"
            />

            <AlertList type={weather} />
          </div>

          <h3 className="govuk-heading-m govuk-!-margin-top-8 govuk-!-margin-bottom-1">Further advice and guidance</h3>
          <List className="govuk-!-margin-bottom-7" aria-label="Further advice links">
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

        {relatedLinksLayout === 'Sidebar' ? (
          <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-6 sticky top-2">
            <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks} />
          </div>
        ) : null}
      </div>

      {relatedLinksLayout === 'Footer' ? (
        <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks} />
      ) : null}
    </View>
  )
}
