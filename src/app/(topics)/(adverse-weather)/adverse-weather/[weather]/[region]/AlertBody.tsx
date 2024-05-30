'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { AlertBanner } from '@/app/components/ui/ukhsa/AlertBanner/AlertBanner'
import HealthAlertsLink from '@/app/components/ui/ukhsa/Links/HealthAlertsLink/HealthAlertsLink'
import useWeatherHealthAlert from '@/app/hooks/queries/useWeatherHealthAlert'
import useWeatherHealthAlertList from '@/app/hooks/queries/useWeatherHealthAlertList'
import { useTranslation } from '@/app/i18n/client'
import { extractHealthAlertTypeFromSlug } from '@/app/utils/weather-health-alert.utils'
import { logger } from '@/lib/logger'

interface AlertProps {
  weather: string
  region: string
  relatedLinks: ReactNode
}

export default function AlertBody({ relatedLinks, weather, region }: AlertProps) {
  const { t } = useTranslation('adverseWeather')
  const { t: ct } = useTranslation('common')

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

  const { regionName, status, text, lastUpdated } = healthAlert.data

  const breadcrumbs = [
    { name: 'Home', link: '/' },
    { name: 'Adverse Weather', link: '/adverse-weather' },
    { name: 'Heat Health Alerts', link: `/adverse-weather/${weather}` },
  ]

  return (
    <div>
      <div className="govuk-breadcrumbs govuk-!-margin-top-2">
        <ol className="govuk-breadcrumbs__list">
          {breadcrumbs.map(({ name, link }, key) => (
            <li key={key} className="govuk-breadcrumbs__list-item">
              <Link className="govuk-breadcrumbs__link" href={link}>
                {name}
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <h1 className="govuk-heading-xl govuk-!-margin-bottom-4">{t('weatherAlert', { regionName })}</h1>

      <p className="govuk-!-margin-bottom-4 govuk-body-s">
        {ct('lastUpdated', { value: new Date(lastUpdated ?? '') })}
      </p>

      <div className="govuk-grid-row">
        <>
          <div className="govuk-grid-column-three-quarters-from-desktop">
            <AlertBanner type={type} level={status} />
          </div>
          <div className="govuk-grid-column-three-quarters-from-desktop ">
            <div
              className="govuk-body [&_li]:mb-2 [&_li]:ml-4 [&_li]:list-disc [&_li]:text-left [&_ul]:py-0"
              dangerouslySetInnerHTML={{ __html: text }}
            />

            <HealthAlertsLink regionId={regionId} type={type} className="govuk-!-margin-bottom-5" />
          </div>
        </>

        {relatedLinks}
      </div>
    </div>
  )
}
