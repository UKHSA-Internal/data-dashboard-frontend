/**
 * A reusable map component using Leaflet for rendering maps.
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import 'leaflet/dist/leaflet.css'

import clsx from 'clsx'
import { ControlPosition } from 'leaflet'
import { ComponentProps, ReactNode } from 'react'
import { MapContainer } from 'react-leaflet'

import { center, mapId, maxZoom, minZoom, zoom } from '@/app/constants/map.constants'

import { AttributionControl } from './shared/controls/AttributionControl'
import { KeyControl } from './shared/controls/KeyControl'
import { ZoomControl } from './shared/controls/ZoomControl'
import { useMapRef } from './shared/hooks/useMapRef'
import { UKHSALogoLayer } from './shared/layers/UKHSALogoLayer'

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
      minZoom={minZoom}
      maxZoom={maxZoom}
      ref={ref}
      className={clsx('relative h-screen overflow-hidden ukhsa-focus', className)}
      zoomControl={false}
    >
      <UKHSALogoLayer position="topright" />
      <KeyControl position="bottomleft" keyItems={['Green', 'Yellow', 'Amber', 'Red']} />
      <AttributionControl position={attributionControlPosition} />
      <ZoomControl position={zoomControlPosition} />
      {children}
    </MapContainer>
  )
}

export default Map
