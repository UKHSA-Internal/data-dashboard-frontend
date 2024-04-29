/**
 * A reusable map component using Leaflet for rendering maps.
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import 'leaflet/dist/leaflet.css'

import clsx from 'clsx'
import { ControlPosition } from 'leaflet'
import { ComponentProps, ReactNode } from 'react'
import { MapContainer, ZoomControl } from 'react-leaflet'

interface DefaultOptions extends ComponentProps<typeof MapContainer> {
  zoomControlPosition: ControlPosition
}

const mapDefaults: DefaultOptions = {
  zoom: 7,
  center: [52.7957, -1.5479],
  scrollWheelZoom: true,
  zoomControlPosition: 'bottomright',
}

interface MapProps {
  children?: ReactNode
  options?: DefaultOptions
  className?: string
}

const Map = ({ children, className, options: { zoomControlPosition, ...options } = mapDefaults }: MapProps) => (
  <MapContainer {...options} className={clsx('h-screen', className)} zoomControl={false}>
    <ZoomControl position={zoomControlPosition} />
    {children}
  </MapContainer>
)

export default Map
