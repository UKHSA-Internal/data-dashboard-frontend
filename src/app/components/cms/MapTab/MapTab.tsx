'use client'

import 'leaflet/dist/leaflet.css'

import clsx from 'clsx'
import { ControlPosition } from 'leaflet'
import { ComponentProps, ReactNode } from 'react'
import { MapContainer } from 'react-leaflet'

import { center, mapId, maxZoom, minZoom, zoom } from '@/app/constants/map.constants'

import { AttributionControl } from '../../ui/ukhsa/Map/shared/controls/AttributionControl'
import { MapLegendControl } from '../../ui/ukhsa/Map/shared/controls/MapLegendControl'
import { ZoomControl } from '../../ui/ukhsa/Map/shared/controls/ZoomControl'
import { useMapRef } from '../../ui/ukhsa/Map/shared/hooks/useMapRef'
import BaseLayer from '../../ui/ukhsa/Map/shared/layers/BaseLayer'
import { UKHSALogoLayer } from '../../ui/ukhsa/Map/shared/layers/UKHSALogoLayer'
import { MapFeatureColour } from '@/app/utils/map.utils'

interface DefaultOptions extends ComponentProps<typeof MapContainer> {
  zoomControlPosition: ControlPosition
  attributionControlPosition: ControlPosition
}

const mapDefaults: DefaultOptions = {
  zoom,
  center,
  scrollWheelZoom: true,
  attributionControlPosition: 'bottomright',
  zoomControlPosition: 'bottomright',
}

interface MapTabProps {
  children?: ReactNode
  options?: DefaultOptions
  className?: string
}

export const MapTab = ({
  children,
  className,
  options: { attributionControlPosition, zoomControlPosition, ...options } = mapDefaults,
}: MapTabProps) => {
  const ref = useMapRef()

  const legendItems = [
    { colour: MapFeatureColour.COLOUR_10_PINK, title: 'over 95%' },
    { colour: MapFeatureColour.COLOUR_12_BLUE, title: '90% - 95%' },
    { colour: MapFeatureColour.COLOUR_9_DEEP_PLUM, title: '85% - 90%' },
    { colour: MapFeatureColour.COLOUR_6_LIGHT_PURPLE, title: '80% - 85%' },
    { colour: MapFeatureColour.COLOUR_1_DARK_BLUE, title: 'under 80%' },
  ]

  return (
    <>
      <MapContainer
        {...options}
        id={mapId}
        minZoom={minZoom}
        maxZoom={maxZoom}
        zoom={6}
        ref={ref}
        className={clsx('relative h-[70vh] overflow-hidden ukhsa-focus', className)}
        zoomControl={false}
      >
        <UKHSALogoLayer position="topright" />
        <AttributionControl position={attributionControlPosition} />
        <ZoomControl position={zoomControlPosition} />
        <BaseLayer />
        {children}
      </MapContainer>
      <MapLegendControl legendItems={legendItems} />
    </>
  )
}
