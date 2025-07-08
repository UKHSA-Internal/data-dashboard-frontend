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
    { colour: 'dark-purple', title: 'over 95%' },
    { colour: 'dark-blue', title: '90% - 95%' },
    { colour: 'light-blue', title: '85% - 90%' },
    { colour: 'purple', title: '80% - 85%' },
    { colour: 'pink', title: 'under 80%' },
  ]

  return (
    <MapContainer
      {...options}
      id={mapId}
      minZoom={minZoom}
      maxZoom={maxZoom}
      zoom={6}
      ref={ref}
      className={clsx('relative h-[80vh] overflow-hidden ukhsa-focus', className)}
      zoomControl={false}
    >
      <UKHSALogoLayer position="topright" />
      <AttributionControl position={attributionControlPosition} />
      <ZoomControl position={zoomControlPosition} />
      <BaseLayer />
      <MapLegendControl position="bottomleft" legendItems={legendItems} />
      {children}
    </MapContainer>
  )
}
