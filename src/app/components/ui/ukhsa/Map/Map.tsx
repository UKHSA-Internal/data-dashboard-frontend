'use client'

import 'leaflet/dist/leaflet.css'

import clsx from 'clsx'
import { ControlPosition } from 'leaflet'
import { ComponentProps, ReactNode } from 'react'
import { MapContainer, ZoomControl } from 'react-leaflet'

// GeoJSON data

// []. ability to provide a custom tile provider (url/apikey) <Map.BaseLayer /> (name = openstreetmaps/esri)
// []. override various defaults options
//      - center of map
//      - default zoom
// []. custom styles/classname (extend div element?)
// []. map boundaries? i.e. no zoomable outside of uk
// []. <Map.Choropleth /> child component
//      [x] Provide geojson data as prop
//      [x] geojson feature identifier (featureNameIdentifier)
//      [] Ability to specify a theme mapping for each status (status 1 = red, status 2 = orange etc)
//      [] Ability to provide mapping of region to a status/colour
//      [x] callback fired on click of each feature
// [] refs on all components

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
  <MapContainer {...options} className={clsx('h-[50vh]', className)} zoomControl={false}>
    <ZoomControl position={zoomControlPosition} />
    {children}
  </MapContainer>
)

export default Map
