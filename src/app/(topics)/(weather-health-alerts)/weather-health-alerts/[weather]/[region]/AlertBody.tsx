'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { RelatedLinksLayout } from '@/api/models/cms/Page'
import { AlertBanner } from '@/app/components/ui/ukhsa/AlertBanner/AlertBanner'
import HealthAlertsLink from '@/app/components/ui/ukhsa/Links/HealthAlertsLink/HealthAlertsLink'
import {
  SummaryList,
  SummaryListKey,
  SummaryListRow,
  SummaryListValue,
} from '@/app/components/ui/ukhsa/SummaryList/SummaryList'
import useWeatherHealthAlert from '@/app/hooks/queries/useWeatherHealthAlert'
import useWeatherHealthAlertList from '@/app/hooks/queries/useWeatherHealthAlertList'
import { useTranslation } from '@/app/i18n/client'
import { getTagVariantFromStatus } from '@/app/utils/weather-health-alert.utils'
import { logger } from '@/lib/logger'

interface AlertProps {
  weather: HealthAlertTypes
  region: string
  relatedLinks: ReactNode
  relatedLinksLayout: RelatedLinksLayout
}

export default function AlertBody({ relatedLinks, relatedLinksLayout, weather, region }: AlertProps) {
  const { t } = useTranslation(['weatherHealthAlerts', 'common'])

  const type: HealthAlertTypes = weather
  const weatherType = type.charAt(0).toUpperCase() + type.slice(1)

  const healthAlertsList = useWeatherHealthAlertList({ type })

  if (healthAlertsList.error || !healthAlertsList.data) {
    logger.error(healthAlertsList.error)
    return redirect('/error')
  }

  const regionId = healthAlertsList.data.find((regionAlert) => regionAlert.slug === region)?.geography_code ?? ''

  // eslint-disable-next-line react-hooks/rules-of-hooks -- TODO: Fix rule of hooks warning
  const healthAlert = useWeatherHealthAlert({ type, regionId })

  if (healthAlert.error || !healthAlert.data) {
    logger.error(healthAlert.error)
    return redirect('/error')
  }

  const { regionName, status, text, lastUpdated, firstPublished, expiryDate } = healthAlert.data

  const breadcrumbs = [
    { name: 'Home', link: '/' },
    { name: 'Weather health alerts', link: '/weather-health-alerts' },
    { name: `${type} health alerts`, link: `/weather-health-alerts/${weather}` },
  ]

  const firstPublishedDate = firstPublished
    ? t('map.alertDialog.firstPublished', { value: new Date(firstPublished) })
    : '–'
  const alertExpiryDate = expiryDate ? t('map.alertDialog.expiryDate', { value: new Date(expiryDate) }) : '-'

  return (
    <div>
      <div className="govuk-breadcrumbs govuk-!-margin-top-2">
        <ol className="govuk-breadcrumbs__list capitalize" aria-label="breadcrumbs">
          {breadcrumbs.map(({ name, link }, key) => (
            <li key={key} className="govuk-breadcrumbs__list-item">
              <Link className="govuk-breadcrumbs__link" href={link}>
                {name}
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <h1 className="govuk-heading-xl govuk-!-margin-bottom-4">{t('weatherAlert', { weatherType, regionName })}</h1>

      <p className="govuk-!-margin-bottom-4 govuk-body-s">
        {lastUpdated ? t('lastUpdated', { value: new Date(lastUpdated) }) : null}
      </p>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          {status === 'Green' ? null : (
            <AlertBanner type={type} level={status} dateFrom={firstPublishedDate} dateTo={alertExpiryDate} />
          )}
        </div>
        <div className="govuk-grid-column-three-quarters-from-desktop ">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-three-quarters-from-desktop ">
              <SummaryList aria-label="Alert details">
                <SummaryListRow>
                  <SummaryListKey>{t('map.alertDialog.typeKey')}</SummaryListKey>
                  <SummaryListValue>{t('map.alertDialog.typeValue', { context: type })}</SummaryListValue>
                </SummaryListRow>
                <SummaryListRow>
                  <SummaryListKey>{t('map.alertDialog.statusKey')}</SummaryListKey>
                  <SummaryListValue>
                    <div className={clsx(`govuk-tag capitalize`, getTagVariantFromStatus(status))}>{status}</div>
                  </SummaryListValue>
                </SummaryListRow>
                <SummaryListRow>
                  <SummaryListKey>{t('map.alertDialog.dateKey')}</SummaryListKey>
                  <SummaryListValue>{firstPublishedDate}</SummaryListValue>
                </SummaryListRow>
                <SummaryListRow>
                  <SummaryListKey>{t('map.alertDialog.expiryKey')}</SummaryListKey>
                  <SummaryListValue>{alertExpiryDate}</SummaryListValue>
                </SummaryListRow>
              </SummaryList>
            </div>
          </div>
          <h3 className="govuk-heading-s govuk-!-margin-bottom-2">{t('map.alertDialog.textKey')}</h3>
          <div
            className="govuk-body [&_li]:mb-2 [&_li]:ml-4 [&_li]:list-disc [&_li]:text-left [&_ul]:py-0"
            dangerouslySetInnerHTML={{ __html: text }}
          />

          <HealthAlertsLink regionId={regionId} type={type} className="govuk-!-margin-bottom-5" />
        </div>

        {relatedLinksLayout === 'Sidebar' ? (
          <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-7 sticky top-2">
            {relatedLinks}
          </div>
        ) : null}
      </div>

      {relatedLinksLayout === 'Footer' ? relatedLinks : null}
    </div>
  )
}
