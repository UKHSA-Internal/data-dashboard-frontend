/**
 * A reusable base tile layer component that renders the OS Maps API
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import { TileLayer, type TileLayerProps } from 'react-leaflet'

interface BaseLayerProps extends Partial<TileLayerProps> {}

const BaseLayer = ({
  url = '/api/proxy/os-maps/{z}/{x}/{y}',
  attribution = `Contains OS data &copy; Crown copyright and database right ${new Date().getFullYear()}`,
  ...rest
}: BaseLayerProps) => {
  return <TileLayer {...rest} attribution={attribution} url={url} />
}

export default BaseLayer
