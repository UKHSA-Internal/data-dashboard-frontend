/**
 * A reusable map component using Leaflet for rendering maps.
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import 'leaflet/dist/leaflet.css'

import clsx from 'clsx'
import { ControlPosition, Map as MapType } from 'leaflet'
import { ComponentProps, ReactNode, useRef } from 'react'
import { MapContainer } from 'react-leaflet'

import AttributionControl from './shared/controls/AttributionControl'
import { ZoomControl } from './shared/controls/ZoomControl'

interface DefaultOptions extends ComponentProps<typeof MapContainer> {
  zoomControlPosition: ControlPosition
  attributionControlPosition: ControlPosition
}

const mapDefaults: DefaultOptions = {
  zoom: 7,
  center: [52.7957, -1.5479],
  scrollWheelZoom: true,
  attributionControlPosition: 'bottomright',
  zoomControlPosition: 'bottomright',
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
  const mapRef = useRef<MapType | null>(null)

  return (
    <MapContainer {...options} ref={mapRef} className={clsx('h-screen', className)} zoomControl={false}>
      <AttributionControl position={attributionControlPosition} />
      <ZoomControl position={zoomControlPosition} />

      {children}
    </MapContainer>
  )
}

export default Map
