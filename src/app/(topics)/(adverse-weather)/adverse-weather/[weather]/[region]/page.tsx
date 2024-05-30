import { flag } from '@unleash/nextjs'
import { Metadata } from 'next'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { flags } from '@/app/constants/flags.constants'
import { useTranslation } from '@/app/i18n'
import { extractHealthAlertTypeFromSlug } from '@/app/utils/weather-health-alert.utils'

import AlertBody from './AlertBody'

export async function generateMetadata({ params: { region } }: { params: { region: string } }): Promise<Metadata> {
  const { enabled } = await flag(flags.adverseWeather)

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
  const { t } = await useTranslation('adverseWeather')

  const type: HealthAlertTypes = extractHealthAlertTypeFromSlug(weather)

  const { related_links: relatedLinks } = await getPageBySlug<PageType.Composite>(weather)

  return (
    <View
      heading={t('weatherAlert', { region })}
      lastUpdated=""
      breadcrumbs={[
        { name: 'Home', link: '/' },
        { name: 'Adverse Weather', link: '/adverse-weather' },
        { name: 'Heat Health Alerts', link: `/adverse-weather/${weather}` },
      ]}
    >
      <div className="govuk-grid-row">
        <AlertBody type={type} region={region} />

        <div className="govuk-grid-column-one-quarter-from-desktop">
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
