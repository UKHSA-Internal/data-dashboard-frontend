'use client'

import 'leaflet/dist/leaflet.css'

import clsx from 'clsx'
import { ControlPosition } from 'leaflet'
import { ComponentProps, ReactNode } from 'react'
import { MapContainer } from 'react-leaflet'

import { center, mapId, maxZoom, minZoom, zoom } from '@/app/constants/map.constants'

import { AttributionControl } from '../Map/shared/controls/AttributionControl'
import { ZoomControl } from '../Map/shared/controls/ZoomControl'
import { useMapRef } from '../Map/shared/hooks/useMapRef'
import BaseLayer from '../Map/shared/layers/BaseLayer'
import { UKHSALogoLayer } from '../Map/shared/layers/UKHSALogoLayer'

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

const MapTab = ({
  children,
  className,
  options: { attributionControlPosition, zoomControlPosition, ...options } = mapDefaults,
}: MapTabProps) => {
  const ref = useMapRef()

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
      {children}
    </MapContainer>
  )
}

export default MapTab
