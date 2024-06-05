import { flag } from '@unleash/nextjs'
import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RelatedLink, RelatedLinks } from '@/app/components/ui/ukhsa'
import { flags } from '@/app/constants/flags.constants'

import AlertBody from './AlertBody'

export async function generateMetadata({ params: { region } }: { params: { region: string } }): Promise<Metadata> {
  const { enabled } = await flag(flags.weatherHealthAlert)

  if (!enabled)
    return {
      title: 'Page not found | UKHSA data dashboard',
      description: 'Error - Page not found',
    }

  return {
    title: `Weather alert for ${region} | UKHSA data dashboard`,
    description: `Weather alert for ${region}`,
  }
}

interface WeatherHealthAlertProps {
  params: {
    weather: 'heat-health-alerts' | 'cold-health-alerts'
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
              <RelatedLink key={id} title={title} url={url} />
            ))}
          </RelatedLinks>
        </div>
      }
    />
  )
}
