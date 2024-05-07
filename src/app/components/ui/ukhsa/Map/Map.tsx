/**
 * A reusable map component using Leaflet for rendering maps.
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import 'leaflet/dist/leaflet.css'

import clsx from 'clsx'
import { ControlPosition, Map as MapType } from 'leaflet'
import { ComponentProps, ReactNode, useCallback } from 'react'
import { MapContainer } from 'react-leaflet'

import { mapId, mapRole, mapTitle } from '@/app/constants/map.constants'

import { AttributionControl } from './shared/controls/AttributionControl'
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
  // This callback is responsible for dynamically setting our interactive accessibility
  // attributes to the underlying Leaflet container element. Their <MapContainer /> component
  // does provide the ability to add custom attributes.
  // [TODO]: Move to a hook
  const mapRefCallback = useCallback((node: MapType | null) => {
    if (node) {
      const container = node.getContainer()
      container.setAttribute('tabindex', '0')
      container.setAttribute('role', mapRole)
      container.setAttribute('aria-label', mapTitle)
      container.setAttribute('aria-labelledby', 'viewportDescription')
    }
  }, [])

  return (
    <MapContainer
      {...options}
      id={mapId}
      minZoom={6}
      maxZoom={10}
      ref={mapRefCallback}
      className={clsx('h-screen', className)}
      zoomControl={false}
    >
      <div id="viewportDescription" className="govuk-visually-hidden">
        {/* TODO */}
        UKHSA Weather health alerts map viewer. 9 regions highlighed in the map area with 3 active alerts. Use number
        keys to select. 1: London - No alerts 2: North East - 1 yellow alert 3: North West - 1 amber alert 4: West
        Midlands - 1 amber alert 5: East Midlands - No alerts
      </div>
      <AttributionControl position={attributionControlPosition} />
      <ZoomControl position={zoomControlPosition} />

      {children}
    </MapContainer>
  )
}

export default Map
