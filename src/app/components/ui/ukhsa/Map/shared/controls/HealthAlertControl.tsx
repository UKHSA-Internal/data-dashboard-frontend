'use client'

import Link from 'next/link'
import { parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs'
import { Suspense } from 'react'
import Control from 'react-leaflet-custom-control'

import { type HealthAlertTypes } from '@/api/models/Alerts'
import { ScrollArea, ScrollBar } from '@/app/components/ui/ukhsa/ScrollArea/ScrollArea'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/app/components/ui/ukhsa/Sheet/Sheet'
import { Skeleton } from '@/app/components/ui/ukhsa/Skeleton/Skeleton'
import {
  SummaryList,
  SummaryListKey,
  SummaryListRow,
  SummaryListValue,
} from '@/app/components/ui/ukhsa/SummaryList/SummaryList'
import { mapQueryKeys } from '@/app/constants/map.constants'
import useWeatherHealthAlert from '@/app/hooks/queries/useWeatherHealthAlert'
import { useTranslation } from '@/app/i18n/client'
import { toSlug } from '@/app/utils/app.utils'
import { getTailwindBackgroundFromColour, getTextColourCssFromColour } from '@/app/utils/weather-health-alert.utils'
import { clsx } from '@/lib/clsx'

const DialogSkeleton = () => (
  <div className="govuk-!-padding-4 mt-[70px] flex flex-col gap-4">
    <Skeleton className="mb-1 h-4 w-1/4" />
    <div className="flex flex-col gap-5">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
)

const AlertDialogContent = () => {
  const { t } = useTranslation('weatherHealthAlerts')

  const [category] = useQueryState(
    mapQueryKeys.alertType,
    parseAsStringLiteral<HealthAlertTypes>(['heat', 'cold']).withDefault('heat')
  )

  const [regionId] = useQueryState(mapQueryKeys.featureId, parseAsString.withDefault(''))

  const [type] = useQueryState(
    mapQueryKeys.alertType,
    parseAsStringLiteral<HealthAlertTypes>(['heat', 'cold']).withDefault('heat')
  )

  const alert = useWeatherHealthAlert({ type, regionId })

  if (alert.isFetching) {
    return <DialogSkeleton />
  }

  if (alert.error || !alert.data) {
    return null
  }

  const { regionName, status, text, riskScore, impact, likelihood, lastUpdated, firstPublished, expiryDate } =
    alert.data

  return (
    <>
      <SheetHeader>
        <ScrollArea className="h-[calc(100vh-90px)]">
          <SheetTitle className="mb-0 flex flex-wrap items-center gap-2">{regionName}</SheetTitle>
          <SummaryList className="govuk-!-margin-bottom-3" aria-label="Weather health alerts summary">
            <SummaryListRow>
              <SummaryListKey>{t('map.alertDialog.typeKey')}</SummaryListKey>
              <SummaryListValue>{t('map.alertDialog.typeValue', { context: category })}</SummaryListValue>
            </SummaryListRow>
            <SummaryListRow>
              <SummaryListKey>{t('map.alertDialog.statusKey')}</SummaryListKey>
              <SummaryListValue>
                <div
                  className={clsx(
                    `govuk-tag capitalize`,
                    getTextColourCssFromColour(status),
                    getTailwindBackgroundFromColour(status)
                  )}
                >
                  {status == 'Green' ? t('map.no-alert') : t('map.alert', { level: status.toLowerCase() })}
                </div>
              </SummaryListValue>
            </SummaryListRow>

            {status === 'Green' ? null : (
              <>
                <SummaryListRow>
                  <SummaryListKey>{t('map.alertDialog.riskKey')}</SummaryListKey>
                  <SummaryListValue className={'font-bold'}>{riskScore}</SummaryListValue>
                </SummaryListRow>
                <SummaryListRow>
                  <SummaryListKey>{t('map.alertDialog.impactKey')}</SummaryListKey>
                  <SummaryListValue>{impact}</SummaryListValue>
                </SummaryListRow>
                <SummaryListRow>
                  <SummaryListKey className={'whitespace-nowrap'}>{t('map.alertDialog.likelihoodKey')}</SummaryListKey>
                  <SummaryListValue>{likelihood}</SummaryListValue>
                </SummaryListRow>
                <SummaryListRow>
                  <SummaryListKey>{t('map.alertDialog.dateKey')}</SummaryListKey>
                  <SummaryListValue>
                    {firstPublished ? t('map.alertDialog.firstPublished', { value: new Date(firstPublished) }) : '–'}
                  </SummaryListValue>
                </SummaryListRow>
                <SummaryListRow>
                  <SummaryListKey>{t('map.alertDialog.expiryKey')}</SummaryListKey>
                  <SummaryListValue>
                    {expiryDate ? t('map.alertDialog.expiryDate', { value: new Date(expiryDate) }) : '–'}
                  </SummaryListValue>
                </SummaryListRow>
              </>
            )}
          </SummaryList>
          <div className="govuk-!-margin-top-3 govuk-body-s">
            <h3 className="govuk-heading-s">{t('map.alertDialog.textKey')}</h3>
            <div
              className="govuk-body [&_li]:mb-2 [&_li]:ml-4 [&_li]:list-disc [&_li]:text-left [&_ul]:py-0"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>

          {status === 'Green' ? null : (
            <>
              <h3 className="govuk-heading-s govuk-!-margin-bottom-2">{t('map.alertDialog.riskMatrixKey')}</h3>
              <div className="pb-3">
                <img
                  src={'/assets/images/risk-matrix.png'}
                  height={'350'}
                  width={'350'}
                  alt="Risk Matrix for the Weather Health Alert risk score metric."
                />
              </div>
            </>
          )}

          <Link href={`/weather-health-alerts/${category}/${toSlug(regionName)}`} className="govuk-body mb-0">
            {t('map.alertDialog.alertCta')}
          </Link>
          {lastUpdated ? (
            <>
              <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
              <p className="govuk-body-xs mb-2">{t('map.alertDialog.lastUpdated', { value: new Date(lastUpdated) })}</p>
            </>
          ) : null}
          <ScrollBar />
        </ScrollArea>
      </SheetHeader>
    </>
  )
}

export default function HealthAlertControl() {
  const [selectedFeatureId, setSelectedFeatureId] = useQueryState(mapQueryKeys.featureId, parseAsString)

  return (
    <Control position="bottomleft">
      <Sheet
        open={Boolean(selectedFeatureId)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedFeatureId(null)
          }
        }}
      >
        <SheetContent side="left">
          <Suspense fallback={<DialogSkeleton />}>
            <AlertDialogContent />
          </Suspense>
        </SheetContent>
      </Sheet>
    </Control>
  )
}
