/**
 * A reusable base tile layer component that supports ArcGIS Esri
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import { ComponentProps } from 'react'
import VectorBasemapLayer from 'react-esri-leaflet/plugins/VectorBasemapLayer'

type EsriProps = ComponentProps<typeof VectorBasemapLayer>

interface BaseLayerEsriProps extends Omit<EsriProps, 'name'> {
  name?: EsriProps['name']
  apiKey?: string
}

const BaseLayerEsri = ({ name = 'ArcGIS:Navigation', apiKey, ...rest }: BaseLayerEsriProps) => {
  return <VectorBasemapLayer {...rest} name={name} apiKey={apiKey} />
}

export default BaseLayerEsri
