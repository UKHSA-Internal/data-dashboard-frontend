'use client'

import 'leaflet/dist/leaflet.css'

import clsx from 'clsx'
import { ControlPosition } from 'leaflet'
import dynamic from 'next/dynamic'
import { ComponentProps, ReactNode, useMemo } from 'react'
import { MapContainer } from 'react-leaflet'

import ClientInformationCard from '@/app/components/ui/ukhsa/ClientInformationCard/ClientInformationCard'
import { AttributionControl } from '@/app/components/ui/ukhsa/Map/shared/controls/AttributionControl'
import { FullscreenControl } from '@/app/components/ui/ukhsa/Map/shared/controls/FullscreenControl'
import { MapLegendControl, ThresholdItemProps } from '@/app/components/ui/ukhsa/Map/shared/controls/MapLegendControl'
import { ZoomControl } from '@/app/components/ui/ukhsa/Map/shared/controls/ZoomControl'
import { useMapRef } from '@/app/components/ui/ukhsa/Map/shared/hooks/useMapRef'
import { UKHSALogoLayer } from '@/app/components/ui/ukhsa/Map/shared/layers/UKHSALogoLayer'
import { center, mapId, maxZoom, minZoom, zoom } from '@/app/constants/map.constants'
import { CoverControl } from '@/app/features/global-filter/components/global-filter-map/Map/controls/CoverControl'
import { useMapData, useSelectedFilters, useThresholdFilters } from '@/app/hooks/globalFilterHooks'
import { MapFeatureColour } from '@/app/utils/map.utils'

const { BaseLayer, CoverLayer } = {
  BaseLayer: dynamic(() => import('@/app/components/ui/ukhsa/Map/shared/layers/BaseLayer'), {
    ssr: false,
  }),
  CoverLayer: dynamic(() => import('@/app/features/global-filter/components/global-filter-map/Map/layers/CoverLayer'), {
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

  const { selectedGeographyFilters } = useSelectedFilters()

  const coverLayer = useMemo(() => {
    if (!mapData || mapDataLoading || mapDataError) return
    return (
      <CoverLayer
        dataThresholds={thresholdData}
        mapData={mapData.data}
        selectedGeographyFilters={selectedGeographyFilters}
      />
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thresholdData, mapData])

  return (
    <div className="relative" data-testid="ukhsa-map-container">
      <MapContainer
        {...options}
        id={mapId}
        minZoom={minZoom}
        maxZoom={maxZoom}
        zoom={7}
        ref={ref}
        className={clsx('relative h-[70vh] overflow-hidden ukhsa-focus', className)}
        style={{ zIndex: 1 }}
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
      {/* Show loading overlay when map data is being fetched */}
      {mapDataLoading && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center">
          <ClientInformationCard
            variant="loading"
            title="Map loading"
            message="Requesting map based on selected filters"
          />
        </div>
      )}
    </div>
  )
}
