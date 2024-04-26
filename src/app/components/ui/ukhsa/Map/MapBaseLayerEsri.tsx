/**
 * A reusable base tile layer component that supports ArcGIS Esri
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import { ComponentProps } from 'react'
import VectorBasemapLayer from 'react-esri-leaflet/plugins/VectorBasemapLayer'

type EsriProps = ComponentProps<typeof VectorBasemapLayer>

interface MapBaseLayerEsriProps extends Omit<EsriProps, 'name'> {
  name?: EsriProps['name']
  apiKey?: string
}

const MapBaseLayerEsri = ({ name = 'ArcGIS:Navigation', apiKey, ...rest }: MapBaseLayerEsriProps) => {
  return <VectorBasemapLayer {...rest} name={name} apiKey={apiKey} />
}

export default MapBaseLayerEsri
