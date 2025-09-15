/**
 * A reusable base tile layer component that supports OpenStreetMaps by default
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import { TileLayer, type TileLayerProps } from 'react-leaflet'

interface BaseLayerProps extends Partial<TileLayerProps> {}

const BaseLayer = ({
  url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.',
  ...rest
}: BaseLayerProps) => {
  return <TileLayer {...rest} attribution={attribution} url={url} />
}

export default BaseLayer
