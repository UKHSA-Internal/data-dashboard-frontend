import { flag } from '@unleash/nextjs'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { AlertBanner } from '@/app/components/ui/ukhsa/AlertBanner/AlertBanner'
import HealthAlertsLink from '@/app/components/ui/ukhsa/Links/HealthAlertsLink/HealthAlertsLink'
import { flags } from '@/app/constants/flags.constants'
import useWeatherHealthAlert from '@/app/hooks/queries/useWeatherHealthAlert'
import useWeatherHealthAlertList from '@/app/hooks/queries/useWeatherHealthAlertList'
import { extractHealthAlertTypeFromSlug } from '@/app/utils/weather-health-alert.utils'
import { logger } from '@/lib/logger'

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
  const type: HealthAlertTypes = extractHealthAlertTypeFromSlug(weather)

  const healthAlertsList = useWeatherHealthAlertList({ type })

  if (healthAlertsList.error || !healthAlertsList.data) {
    logger.error(healthAlertsList.error)
    return redirect('/error')
  }

  const regionId = healthAlertsList.data.find((regionAlert) => regionAlert.slug === region)?.geography_code ?? ''

  const healthAlert = useWeatherHealthAlert({ type, regionId })

  if (healthAlert.error || !healthAlert.data) {
    logger.error(healthAlert.error)
    return redirect('/error')
  }

  return (
    <View
      heading={`Weather alert for ${region}`}
      lastUpdated=""
      breadcrumbs={[
        { name: 'Home', link: '/' },
        { name: 'Adverse Weather', link: '/adverse-weather' },
        { name: 'Heat Health Alerts', link: '/adverse-weather/heat-health-alerts' },
        { name: 'East Midlands', link: '/adverse-weather/heat-health-alerts/east-midlands' },
      ]}
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <AlertBanner type={type} level={healthAlert.data.status} />
        </div>
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <div className="govuk-body">{healthAlert.data.text}</div>
        </div>

        {/* TODO: Pull related links from parent */}
        <div className="govuk-grid-column-one-quarter-from-desktop">
          <RelatedLinks variant="sidebar">
            <RelatedLink title="Adverse weather help" url="/" />
            <RelatedLink title="What to do in adverse weather" url="/" />
          </RelatedLinks>
        </div>
      </div>

      <HealthAlertsLink regionId={regionId} type={type} className="govuk-!-margin-bottom-5" />
    </View>
  )
}
