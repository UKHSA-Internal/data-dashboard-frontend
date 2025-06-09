'use client'

import 'leaflet/dist/leaflet.css'

import clsx from 'clsx'
import { ControlPosition } from 'leaflet'
import { ComponentProps, ReactNode } from 'react'
import { CircleMarker, MapContainer, Tooltip } from 'react-leaflet'

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
      <AttributionControl position={attributionControlPosition} />
      <ZoomControl position={zoomControlPosition} />
      <BaseLayer />
      <CircleMarker center={[51.51, -0.12]} pathOptions={{ color: 'red' }} radius={20}>
        <Tooltip>
          <h1>ToolTip Example</h1>
          <b>Region</b>: London
          <br />
          <b>Vaccine Uptake</b>:{'>'}95
        </Tooltip>
      </CircleMarker>
      {children}
    </MapContainer>
  )
}

export default Map
