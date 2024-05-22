'use client'

import Link from 'next/link'
import { parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs'
import { Suspense } from 'react'
import Control from 'react-leaflet-custom-control'

import { type HealthAlertTypes } from '@/api/models/Alerts'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/app/components/ui/ukhsa/Sheet/Sheet'
import { mapQueryKeys } from '@/app/constants/map.constants'
import { useTranslation } from '@/app/i18n/client'

import { ScrollArea, ScrollBar } from '../../../ScrollArea/ScrollArea'
import { Skeleton } from '../../../Skeleton/Skeleton'
import { useSelectedAlert } from '../hooks/useSelectedAlert'

function DialogSkeleton() {
  return (
    <div className="govuk-!-padding-4 mt-[70px]">
      <Skeleton className="mb-3 h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}

function AlertDialogContent() {
  const { t } = useTranslation('adverseWeather')
  const alert = useSelectedAlert()

  const [category] = useQueryState(
    mapQueryKeys.alertType,
    parseAsStringLiteral<HealthAlertTypes>(['heat', 'cold']).withDefault('heat')
  )

  if (!alert) {
    return <DialogSkeleton />
  }

  const { geography_name: regionName, status, text, refresh_date: lastUpdated, period_start: firstPublished } = alert

  return (
    <>
      <SheetHeader>
        <ScrollArea className="h-[calc(100vh-75px)]">
          <SheetTitle className="mb-0 flex flex-wrap items-center gap-2">{regionName}</SheetTitle>
          <dl className="govuk-summary-list">
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">{t('map.alertDialog.typeKey')}</dt>
              <dd className="govuk-summary-list__value">{t('map.alertDialog.typeValue', { context: category })}</dd>
            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">{t('map.alertDialog.statusKey')}</dt>
              <dd className="govuk-summary-list__value">
                {/* TODO: Move this colour logic to a function */}
                <div
                  className={`govuk-tag capitalize ${status === 'Amber' ? 'govuk-tag--orange' : `govuk-tag--${status.toLowerCase()}`} mb-[2px]`}
                >
                  {status.toLowerCase()}
                </div>
              </dd>
            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">{t('map.alertDialog.dateKey')}</dt>
              <dd className="govuk-summary-list__value">
                {t('map.alertDialog.firstPublished', { value: new Date(firstPublished) })}
              </dd>
            </div>
          </dl>

          <div className="govuk-!-margin-top-3">
            <strong></strong>
          </div>
          <div className="govuk-!-margin-top-3 govuk-body-s">
            <h3 className="govuk-heading-s">{t('map.alertDialog.textKey')}</h3>
            <p className="govuk-body">{text}</p>
          </div>
          {/* TODO: Create a util for the region name conversion between lower snake case and capitlised with spaces */}
          <Link
            href={`/adverse-weather/${category}/${regionName.toLowerCase().replaceAll(' ', '-')}`}
            className="govuk-body"
          >
            {t('map.alertDialog.alertCta')}
          </Link>
          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
          <p className="govuk-body-xs mb-2">{t('map.alertDialog.lastUpdated', { value: new Date(lastUpdated) })}</p>
          <ScrollBar />
        </ScrollArea>
      </SheetHeader>
    </>
  )
}

export default function HealthAlertControl() {
  const [selectedFeatureId, setSelectedFeatureId] = useQueryState(mapQueryKeys.featureId, parseAsString)

  return (
    <Control position="topleft">
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
