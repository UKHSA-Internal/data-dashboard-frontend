'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { useMemo } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/ukhsa/Dialog/Dialog'
import ExitMapIcon from '@/app/components/ui/ukhsa/Icons/ExitMap'
import { type GeoJSONProps } from '@/app/components/ui/ukhsa/Map/shared/layers/ChoroplethLayer'
import { Skeleton } from '@/app/components/ui/ukhsa/Skeleton/Skeleton'
import { mapQueryKeys } from '@/app/constants/map.constants'

import { useChoroplethFeatureColours } from '../shared/hooks/useChoroplethFeatureColours'

const { Map, BaseLayer, ChoroplethLayer, HealthAlertControl } = {
  Map: dynamic(() => import('@/app/components/ui/ukhsa/Map/Map'), {
    ssr: false,
    loading: () => <Skeleton className="h-screen" />,
  }),
  BaseLayer: dynamic(() => import('@/app/components/ui/ukhsa/Map/shared/layers/BaseLayerEsri'), {
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
  const [, setError] = useQueryState(mapQueryKeys.error)
  const [mapOpen] = useQueryState(mapQueryKeys.view, parseAsStringLiteral<'map'>(['map']))
  const router = useRouter()
  const featureColours = useChoroplethFeatureColours()

  const baseLayer = useMemo(() => {
    return <BaseLayer token={process.env.NEXT_PUBLIC_ESRI_API_KEY} />
  }, [])

  const choroplethLayer = useMemo(() => {
    if (!featureColours) return null
    return <ChoroplethLayer data={featureCollection} featureColours={featureColours} />
  }, [featureCollection, featureColours])

  const healthAlertControl = useMemo(() => {
    return <HealthAlertControl />
  }, [])

  if (!mapOpen) return null

  if (!featureColours) {
    setError('map')
    return null
  }

  return (
    <Dialog
      open={!!mapOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          router.back()
        }
      }}
    >
      <DialogContent
        className="p-0 no-js:hidden"
        fullscreen
        closeButton={
          <Link
            href="/"
            className="govuk-button govuk-button--secondary ukhsa-map__button absolute z-[1000] inline-flex gap-2"
          >
            <ExitMapIcon />
            Exit map
          </Link>
        }
      >
        <DialogHeader aria-hidden className="govuk-visually-hidden">
          <DialogTitle>Weather health alerts map</DialogTitle>
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
