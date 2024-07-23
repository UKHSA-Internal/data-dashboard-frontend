/**
 * A reusable map component using Leaflet for rendering maps.
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import 'leaflet/dist/leaflet.css'

import clsx from 'clsx'
import { ControlPosition, LatLngBounds } from 'leaflet'
import { ComponentProps, ReactNode } from 'react'
import { MapContainer } from 'react-leaflet'

import { center, mapId, maxZoom, minZoom, zoom } from '@/app/constants/map.constants'

import { AttributionControl } from './shared/controls/AttributionControl'
import { ZoomControl } from './shared/controls/ZoomControl'
import { useMapRef } from './shared/hooks/useMapRef'

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
  minZoom,
  maxZoom,
}

interface MapProps {
  children?: ReactNode
  options?: DefaultOptions
  className?: string
}

const Map = ({
  children,
  className,
  options: { attributionControlPosition, zoomControlPosition, ...options } = mapDefaults,
}: MapProps) => {
  const ref = useMapRef()

  return (
    <MapContainer
      {...options}
      id={mapId}
      maxBounds={new LatLngBounds([49.528423, -10.76418], [61.331151, 1.9134116])}
      ref={ref}
      className={clsx('relative overflow-hidden ukhsa-focus', className)}
      zoomControl={false}
    >
      <AttributionControl position={attributionControlPosition} />
      <ZoomControl position={zoomControlPosition} />
      {children}
    </MapContainer>
  )
}

export default Map
