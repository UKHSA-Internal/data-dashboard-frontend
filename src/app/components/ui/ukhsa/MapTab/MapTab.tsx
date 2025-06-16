'use client'

import 'leaflet/dist/leaflet.css'

import clsx from 'clsx'
import { ControlPosition } from 'leaflet'
import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { ComponentProps, ReactNode, useMemo } from 'react'
import { CircleMarker, MapContainer, Tooltip } from 'react-leaflet'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { center, mapId, mapQueryKeys, maxZoom, minZoom, zoom } from '@/app/constants/map.constants'
import useWeatherHealthAlertList from '@/app/hooks/queries/useWeatherHealthAlertList'

import { AttributionControl } from '../Map/shared/controls/AttributionControl'
import { ZoomControl } from '../Map/shared/controls/ZoomControl'
import featureCollection from '../Map/shared/data/geojson/ukhsa-regions'
import { useMapRef } from '../Map/shared/hooks/useMapRef'
import BaseLayer from '../Map/shared/layers/BaseLayer'
import ChoroplethLayer from '../Map/shared/layers/ChoroplethLayer'
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

  const [type] = useQueryState(
    mapQueryKeys.alertType,
    parseAsStringLiteral<HealthAlertTypes>(['heat', 'cold']).withDefault('heat')
  )

  const alertsQuery = useWeatherHealthAlertList({ type })

  const choroplethLayer = useMemo(() => {
    if (!alertsQuery.data) return
    return (
      <ChoroplethLayer
        data={featureCollection}
        featureColours={Object.fromEntries(alertsQuery.data.map((alert) => [alert.geography_code, alert.status]))}
      />
    )
  }, [featureCollection, alertsQuery.data])

  return (
    <MapContainer
      {...options}
      id={mapId}
      minZoom={minZoom}
      maxZoom={maxZoom}
      ref={ref}
      className={clsx('relative h-[80vh] overflow-hidden ukhsa-focus', className)}
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
      {choroplethLayer}
      {children}
    </MapContainer>
  )
}

export default Map
