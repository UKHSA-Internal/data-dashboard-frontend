import { Metadata } from 'next'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RelatedLinks, RelatedSidebarLink } from '@/app/components/ui/ukhsa/RelatedLinks/v2/RelatedLinks'

import AlertBody from './AlertBody'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params: { region } }: { params: { region: string } }): Promise<Metadata> {
  return {
    title: `Weather alert for ${region} | UKHSA data dashboard`,
    description: `Weather alert for ${region}`,
  }
}

interface WeatherHealthAlertProps {
  params: {
    weather: HealthAlertTypes
    region: string
  }
}

export default async function Alert({ params: { weather, region } }: WeatherHealthAlertProps) {
  const { related_links: relatedLinks } = await getPageBySlug<PageType.Composite>(weather)

  return (
    <AlertBody
      weather={weather}
      region={region}
      relatedLinks={
        <div className="govuk-grid-column-one-quarter-from-desktop">
          <RelatedLinks variant="sidebar">
            {relatedLinks.map(({ title, url, id }) => (
              <RelatedSidebarLink key={id} title={title} url={url} />
            ))}
          </RelatedLinks>
        </div>
      }
    />
  )
}
