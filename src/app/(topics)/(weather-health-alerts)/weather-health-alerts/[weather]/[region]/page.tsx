import { Metadata } from 'next'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RelatedLink, RelatedLinks } from '@/app/components/ui/ukhsa'
import { flags } from '@/app/constants/flags.constants'
import { getFeatureFlag } from '@/app/utils/flags.utils'

import AlertBody from './AlertBody'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params: { region } }: { params: { region: string } }): Promise<Metadata> {
  const { enabled } = await getFeatureFlag(flags.weatherHealthAlert)

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
              <RelatedLink key={id} title={title} url={url} />
            ))}
          </RelatedLinks>
        </div>
      }
    />
  )
}
