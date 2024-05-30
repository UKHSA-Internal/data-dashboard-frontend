'use client'

import { redirect } from 'next/navigation'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { AlertBanner } from '@/app/components/ui/ukhsa/AlertBanner/AlertBanner'
import HealthAlertsLink from '@/app/components/ui/ukhsa/Links/HealthAlertsLink/HealthAlertsLink'
import useWeatherHealthAlert from '@/app/hooks/queries/useWeatherHealthAlert'
import useWeatherHealthAlertList from '@/app/hooks/queries/useWeatherHealthAlertList'
import { logger } from '@/lib/logger'

interface AlertProps {
  type: HealthAlertTypes
  region: string
}

export default function AlertBody({ type, region }: AlertProps) {
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

  const { status, text } = healthAlert.data

  return (
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
  )
}
