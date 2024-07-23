'use client'

import dynamic from 'next/dynamic'
import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { useMemo } from 'react'
import { useDebounceValue, useWindowSize } from 'usehooks-ts'

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
import { center, mapQueryKeys } from '@/app/constants/map.constants'
import useWeatherHealthAlertList from '@/app/hooks/queries/useWeatherHealthAlertList'
import { useTranslation } from '@/app/i18n/client'
import { MapTileProvider } from '@/app/types'

const { Map, BaseLayer, BaseLayerOSM, ChoroplethLayer, HealthAlertControl } = {
  Map: dynamic(() => import('@/app/components/ui/ukhsa/Map/Map'), {
    ssr: false,
    loading: () => <Skeleton className="h-screen" />,
  }),
  BaseLayer: dynamic(() => import('@/app/components/ui/ukhsa/Map/shared/layers/BaseLayer'), {
    ssr: false,
  }),
  BaseLayerOSM: dynamic(() => import('@/app/components/ui/ukhsa/Map/shared/layers/BaseLayerOSM'), {
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
  mapTileProvider: MapTileProvider
}

export default function HealthAlertsMapDialog({ featureCollection, mapTileProvider }: HealthAlertsMapDialogProps) {
  const { t } = useTranslation('weatherHealthAlerts')
  const [, setError] = useQueryState(mapQueryKeys.error)
  const [mapOpen, setMapOpen] = useQueryState(mapQueryKeys.view, parseAsStringLiteral<'map'>(['map']))

  const { width } = useWindowSize()
  const [debouncedWidth] = useDebounceValue(width, 250)

  const [type] = useQueryState(
    mapQueryKeys.alertType,
    parseAsStringLiteral<HealthAlertTypes>(['heat', 'cold']).withDefault('heat')
  )

  const alertsQuery = useWeatherHealthAlertList({ type })

  const baseLayer = useMemo(() => {
    if (mapTileProvider === 'OrdinanceSurveyMaps') {
      return <BaseLayerOSM />
    }
    return <BaseLayer />
  }, [mapTileProvider])

  const choroplethLayer = useMemo(() => {
    if (!alertsQuery.data) return
    return (
      <ChoroplethLayer
        data={featureCollection}
        featureColours={Object.fromEntries(alertsQuery.data.map((alert) => [alert.geography_code, alert.status]))}
        mapTileProvider={mapTileProvider}
      />
    )
  }, [featureCollection, alertsQuery.data, mapTileProvider])

  const healthAlertControl = useMemo(() => {
    return <HealthAlertControl />
  }, [])

  if (!mapOpen) return null

  if (alertsQuery.error || !alertsQuery.data) {
    setError('map')
    return null
  }

  const calculateZoom = () => {
    if (debouncedWidth < 420) return 6
    if (debouncedWidth >= 420 && debouncedWidth < 768) return 6
    if (debouncedWidth >= 768 && debouncedWidth < 1024) return 7
    if (debouncedWidth >= 1024 && debouncedWidth < 1150) return 8
    return 8
  }

  return (
    <Dialog open={!!mapOpen} onOpenChange={(isOpen) => !isOpen && setMapOpen(null)}>
      <DialogOverlay />
      <DialogContent
        fullscreen
        className="p-0 no-js:hidden"
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

        <Map
          key={debouncedWidth} // Force Re-render the map when the window width changes (i.e. browser resize or device orientation change)
          options={
            mapTileProvider === 'OrdinanceSurveyMaps'
              ? {
                  center,
                  zoom: calculateZoom(),
                  minZoom: calculateZoom(),
                  maxZoom: 12,
                  attributionControlPosition: 'bottomright',
                  zoomControlPosition: 'bottomright',
                }
              : undefined
          }
        >
          {baseLayer}
          {choroplethLayer}
          {healthAlertControl}
        </Map>
      </DialogContent>
    </Dialog>
  )
}
