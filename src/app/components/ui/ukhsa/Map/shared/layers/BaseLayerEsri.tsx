/**
 * A reusable base tile layer component that supports ArcGIS Esri
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import { ComponentProps, useEffect } from 'react'
import VectorBasemapLayer from 'react-esri-leaflet/plugins/VectorBasemapLayer'
import { useMap } from 'react-leaflet'

type EsriProps = ComponentProps<typeof VectorBasemapLayer>

interface BaseLayerEsriProps extends Omit<EsriProps, 'name'> {
  name?: EsriProps['name']
  apiKey?: string
}

const BaseLayerEsri = ({ name = 'ArcGIS:Navigation', apiKey, ...rest }: BaseLayerEsriProps) => {
  const map = useMap()

  // VectorBasemapLayer plugin renders a canvas element with a few accessibility attributes that our
  // own <Map /> component is responsible for handling already. This effect checks for and removes
  // those attributes.
  // [TODO]: Move to a hook
  useEffect(() => {
    const container = map.getContainer()
    const vectorCanvasLayer = container.querySelector('canvas[role=region]')
    if (vectorCanvasLayer) {
      vectorCanvasLayer.removeAttribute('role')
      vectorCanvasLayer.removeAttribute('aria-label')
      vectorCanvasLayer.removeAttribute('tabindex')
    }
  }, [map])

  return <VectorBasemapLayer {...rest} name={name} apiKey={apiKey} />
}

export default BaseLayerEsri
