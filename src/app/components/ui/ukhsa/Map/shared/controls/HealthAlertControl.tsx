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
import { getTagVariantFromStatus } from '@/app/utils/map.utils'
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
  const { t } = useTranslation('adverseWeather')

  const [category] = useQueryState(
    mapQueryKeys.alertType,
    parseAsStringLiteral<HealthAlertTypes>(['heat', 'cold']).withDefault('heat')
  )

  const alert = useWeatherHealthAlert()

  if (alert.isFetching) {
    return <DialogSkeleton />
  }

  if (alert.error || !alert.data) {
    return null
  }

  const { regionName, status, text, lastUpdated, firstPublished } = alert.data

  return (
    <>
      <SheetHeader>
        <ScrollArea className="h-[calc(100vh-75px)]">
          <SheetTitle className="mb-0 flex flex-wrap items-center gap-2">{regionName}</SheetTitle>
          <SummaryList>
            <SummaryListRow>
              <SummaryListKey>{t('map.alertDialog.typeKey')}</SummaryListKey>
              <SummaryListValue>{t('map.alertDialog.typeValue', { context: category })}</SummaryListValue>
            </SummaryListRow>
            <SummaryListRow>
              <SummaryListKey>{t('map.alertDialog.statusKey')}</SummaryListKey>
              <SummaryListValue>
                <div className={clsx(`govuk-tag capitalize`, getTagVariantFromStatus(status))}>
                  {status.toLowerCase()}
                </div>
              </SummaryListValue>
            </SummaryListRow>
            <SummaryListRow>
              <SummaryListKey>{t('map.alertDialog.dateKey')}</SummaryListKey>
              <SummaryListValue>
                {firstPublished ? t('map.alertDialog.firstPublished', { value: new Date(firstPublished) }) : '–'}
              </SummaryListValue>
            </SummaryListRow>
          </SummaryList>
          <div className="govuk-!-margin-top-3 govuk-body-s">
            <h3 className="govuk-heading-s">{t('map.alertDialog.textKey')}</h3>
            <p className="govuk-body">{text}</p>
          </div>
          <Link href={`/adverse-weather/${category}/${toSlug(regionName)}`} className="govuk-body">
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
