'use client'

import 'leaflet/dist/leaflet.css'

import clsx from 'clsx'
import { ControlPosition } from 'leaflet'
import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { ComponentProps, ReactNode, useMemo } from 'react'
import { CircleMarker, MapContainer, Tooltip, useMap } from 'react-leaflet'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { center, mapId, mapQueryKeys, maxZoom, minZoom, zoom } from '@/app/constants/map.constants'
import useWeatherHealthAlertList from '@/app/hooks/queries/useWeatherHealthAlertList'

import { AttributionControl } from '../Map/shared/controls/AttributionControl'
import { ZoomControl } from '../Map/shared/controls/ZoomControl'
import localAuthoritiesFeatureCollection from '../Map/shared/data/geojson/local-authorities'
import { useMapRef } from '../Map/shared/hooks/useMapRef'
import BaseLayer from '../Map/shared/layers/BaseLayer'
import ChoroplethLayer from '../Map/shared/layers/ChoroplethLayer'
import { UKHSALogoLayer } from '../Map/shared/layers/UKHSALogoLayer'
import regionFeatureCollection from '../Map/shared/data/geojson/ukhsa-regions'
import countriesFeatureCollection from '../Map/shared/data/geojson/countries'
import MultiLayerControl from '../Map/shared/controls/MultiLayerControl'
import CoverLayer from '../Map/shared/layers/CoverLayer'

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

  const [type] = useQueryState(
    mapQueryKeys.alertType,
    parseAsStringLiteral<HealthAlertTypes>(['heat', 'cold']).withDefault('heat')
  )

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
      <CoverLayer />
      {children}
    </MapContainer>
  )
}

export default Map
