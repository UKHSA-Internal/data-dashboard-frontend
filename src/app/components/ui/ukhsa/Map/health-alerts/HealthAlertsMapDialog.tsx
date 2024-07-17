'use client'

import dynamic from 'next/dynamic'
import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { useMemo } from 'react'

import { HealthAlertTypes } from '@/api/models/Alerts'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/app/components/ui/ukhsa/Dialog/Dialog'
import ExitMapIcon from '@/app/components/ui/ukhsa/Icons/ExitMap'
import { type GeoJSONProps } from '@/app/components/ui/ukhsa/Map/shared/layers/ChoroplethLayer'
import { Skeleton } from '@/app/components/ui/ukhsa/Skeleton/Skeleton'
import { mapQueryKeys } from '@/app/constants/map.constants'
import useWeatherHealthAlertList from '@/app/hooks/queries/useWeatherHealthAlertList'
import { useTranslation } from '@/app/i18n/client'

const { Map, BaseLayer, ChoroplethLayer, HealthAlertControl } = {
  Map: dynamic(() => import('@/app/components/ui/ukhsa/Map/Map'), {
    ssr: false,
    loading: () => <Skeleton className="h-screen" />,
  }),
  BaseLayer: dynamic(() => import('@/app/components/ui/ukhsa/Map/shared/layers/BaseLayerOSM'), {
    ssr: false,
  }),
  ChoroplethLayer: dynamic(() => import('@/app/components/ui/ukhsa/Map/shared/layers/ChoroplethLayer'), {
    ssr: false,
  }),
  HealthAlertControl: dynamic(() => import('@/app/components/ui/ukhsa/Map/shared/controls/HealthAlertControl'), {
    ssr: false,
  }),
}

interface HealthAlertsMapDialogProps {
  featureCollection: GeoJSONProps['data']
}

export default function HealthAlertsMapDialog({ featureCollection }: HealthAlertsMapDialogProps) {
  const { t } = useTranslation('weatherHealthAlerts')
  const [, setError] = useQueryState(mapQueryKeys.error)
  const [mapOpen, setMapOpen] = useQueryState(mapQueryKeys.view, parseAsStringLiteral<'map'>(['map']))

  const [type] = useQueryState(
    mapQueryKeys.alertType,
    parseAsStringLiteral<HealthAlertTypes>(['heat', 'cold']).withDefault('heat')
  )

  const alertsQuery = useWeatherHealthAlertList({ type })

  const baseLayer = useMemo(() => {
    return <BaseLayer />
  }, [])

  const choroplethLayer = useMemo(() => {
    if (!alertsQuery.data) return
    return (
      <ChoroplethLayer
        data={featureCollection}
        featureColours={Object.fromEntries(alertsQuery.data.map((alert) => [alert.geography_code, alert.status]))}
      />
    )
  }, [featureCollection, alertsQuery.data])

  const healthAlertControl = useMemo(() => {
    return <HealthAlertControl />
  }, [])

  if (!mapOpen) return null

  if (alertsQuery.error || !alertsQuery.data) {
    setError('map')
    return null
  }

  return (
    <Dialog open={!!mapOpen} onOpenChange={(isOpen) => !isOpen && setMapOpen(null)}>
      <DialogOverlay />
      <DialogContent
        className="w-3/4 p-0 no-js:hidden"
        closeButton={
          <DialogClose className="govuk-button govuk-button--secondary ukhsa-map__button absolute z-[1000] inline-flex gap-2">
            <ExitMapIcon />
            {t('map.exitBtn')}
          </DialogClose>
        }
      >
        <DialogHeader aria-hidden className="govuk-visually-hidden">
          <DialogTitle>{t('map.title')}</DialogTitle>
        </DialogHeader>

        <Map>
          {baseLayer}
          {choroplethLayer}
          {healthAlertControl}
        </Map>
      </DialogContent>
    </Dialog>
  )
}
