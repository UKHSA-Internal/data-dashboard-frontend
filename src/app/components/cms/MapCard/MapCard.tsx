'use client'

import 'leaflet/dist/leaflet.css'

import clsx from 'clsx'
import { ControlPosition } from 'leaflet'
import dynamic from 'next/dynamic'
import { ComponentProps, ReactNode, useMemo } from 'react'
import { MapContainer } from 'react-leaflet'

import { center, mapId, maxZoom, minZoom, zoom } from '@/app/constants/map.constants'
import { useMapData, useThresholdFilters } from '@/app/hooks/globalFilterHooks'
import { formatDate } from '@/app/utils/date.utils'
import { MapFeatureColour } from '@/app/utils/map.utils'

import { AttributionControl } from '../../ui/ukhsa/Map/shared/controls/AttributionControl'
import { CoverControl } from '../../ui/ukhsa/Map/shared/controls/CoverControl'
import { FullscreenControl } from '../../ui/ukhsa/Map/shared/controls/FullscreenControl'
import { MapLegendControl, ThresholdItemProps } from '../../ui/ukhsa/Map/shared/controls/MapLegendControl'
import { ZoomControl } from '../../ui/ukhsa/Map/shared/controls/ZoomControl'
import { useMapRef } from '../../ui/ukhsa/Map/shared/hooks/useMapRef'
import { UKHSALogoLayer } from '../../ui/ukhsa/Map/shared/layers/UKHSALogoLayer'

const { BaseLayer, CoverLayer } = {
  BaseLayer: dynamic(() => import('@/app/components/ui/ukhsa/Map/shared/layers/BaseLayer'), {
    ssr: false,
  }),
  CoverLayer: dynamic(() => import('@/app/components/ui/ukhsa/Map/shared/layers/CoverLayer'), {
    ssr: false,
  }),
}

interface DefaultOptions extends ComponentProps<typeof MapContainer> {
  zoomControlPosition: ControlPosition
  attributionControlPosition: ControlPosition
  fullscreenControlPosition: ControlPosition
}

const mapDefaults: DefaultOptions = {
  zoom,
  center,
  scrollWheelZoom: true,
  attributionControlPosition: 'bottomright',
  zoomControlPosition: 'bottomright',
  fullscreenControlPosition: 'bottomright',
}

interface MapCardProps {
  children?: ReactNode
  options?: DefaultOptions
  className?: string
}

export default function MapCard({
  children,
  className,
  options: { attributionControlPosition, zoomControlPosition, fullscreenControlPosition, ...options } = mapDefaults,
}: MapCardProps) {
  const ref = useMapRef()

  const thresholdFilters = useThresholdFilters()

  const thresholdData: ThresholdItemProps[] = thresholdFilters!.thresholds.map((threshold) => {
    return {
      colour: threshold.value.colour as MapFeatureColour,
      boundary_minimum_value: threshold.value.boundary_minimum_value,
      boundary_maximum_value: threshold.value.boundary_maximum_value,
      label: threshold.value.label,
    }
  })

  const { mapData, mapDataLoading, mapDataError } = useMapData()

  const coverLayer = useMemo(() => {
    if (!mapData || mapDataLoading || mapDataError) return
    return <CoverLayer dataThresholds={thresholdData} mapData={mapData.data} />
  }, [thresholdData, mapData])

  let date
  if (mapData) {
    const { latest_date } = mapData
    date = `Last updated ${formatDate(latest_date)}`
  }

  return (
    <>
      {date && <p className="govuk-body-s govuk-!-margin-bottom-2 pt-0 italic text-dark-grey">{date}</p>}
      <MapContainer
        {...options}
        id={mapId}
        minZoom={minZoom}
        maxZoom={maxZoom}
        zoom={7}
        ref={ref}
        className={clsx('relative h-[70vh] overflow-hidden ukhsa-focus', className)}
        zoomControl={false}
      >
        <UKHSALogoLayer position="topright" />
        <CoverControl position="topleft" className="gap-2 p-2 sm:flex" />
        <AttributionControl position={attributionControlPosition} />
        <ZoomControl position={zoomControlPosition} />
        <FullscreenControl position={fullscreenControlPosition} />
        <BaseLayer />
        {coverLayer}
        {children}
      </MapContainer>
      <MapLegendControl thresholdData={thresholdData} />
    </>
  )
}
