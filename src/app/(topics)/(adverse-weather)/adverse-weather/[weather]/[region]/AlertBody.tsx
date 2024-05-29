'use client'

import { redirect } from 'next/navigation'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { RelatedLink, RelatedLinks } from '@/app/components/ui/ukhsa'
import { AlertBanner } from '@/app/components/ui/ukhsa/AlertBanner/AlertBanner'
import HealthAlertsLink from '@/app/components/ui/ukhsa/Links/HealthAlertsLink/HealthAlertsLink'
import useWeatherHealthAlert from '@/app/hooks/queries/useWeatherHealthAlert'
import useWeatherHealthAlertList from '@/app/hooks/queries/useWeatherHealthAlertList'
import { logger } from '@/lib/logger'

interface AlertProps {
  type: HealthAlertTypes
  region: string
  relatedLinks: Array<{
    meta: {
      type: string
    }
    title: string
    url: string
    id: number
    body?: string | undefined
  }>
}

export default function AlertBody({ type, region, relatedLinks }: AlertProps) {
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
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <AlertBanner type={type} level={healthAlert.data.status} />
        </div>
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <div className="govuk-body">{healthAlert.data.text}</div>
        </div>

        <div className="govuk-grid-column-one-quarter-from-desktop">
          <RelatedLinks variant="sidebar">
            {relatedLinks.map(({ title, url, id }) => (
              <RelatedLink key={id} title={title} url={url} />
            ))}
          </RelatedLinks>
        </div>
      </div>

      <HealthAlertsLink regionId={regionId} type={type} className="govuk-!-margin-bottom-5" />
    </>
  )
}
