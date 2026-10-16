/**
 * A reusable base tile layer component that renders the OS Maps API
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import { Rectangle, TileLayer, type TileLayerProps } from 'react-leaflet'

import { franceMaskBounds, mapSeaColour, maxBounds } from '@/app/constants/map.constants'

interface BaseLayerProps extends Partial<TileLayerProps> {}

const BaseLayer = ({
  url = '/api/proxy/os-maps/{z}/{x}/{y}',
  attribution = `Contains OS data &copy; Crown copyright and database right ${new Date().getFullYear()}`,
  bounds = maxBounds,
  ...rest
}: BaseLayerProps) => {
  return (
    <>
      <TileLayer {...rest} attribution={attribution} url={url} bounds={bounds} />
      {franceMaskBounds.map((frBounds) => (
        <Rectangle
          key={frBounds.toString()}
          bounds={frBounds}
          interactive={false}
          pathOptions={{
            fillColor: mapSeaColour,
            fillOpacity: 1,
            stroke: false,
          }}
        />
      ))}
    </>
  )
}

export default BaseLayer
