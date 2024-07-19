/**
 * A reusable base tile layer component that supports ArcGIS Esri
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import { ComponentProps } from 'react'
import VectorBasemapLayer from 'react-esri-leaflet/plugins/VectorBasemapLayer'

import useMapAuthToken from '@/app/hooks/queries/useMapAuthToken'

import { useBaseLayerEsri } from '../hooks/useBaseLayerEsri'

type EsriProps = ComponentProps<typeof VectorBasemapLayer>

interface BaseLayerEsriProps extends Omit<EsriProps, 'name'> {
  name?: EsriProps['name']
}

const BaseLayerEsri = ({ name = 'ArcGIS:Navigation', ...rest }: BaseLayerEsriProps) => {
  useBaseLayerEsri()
  const {
    data: { token },
  } = useMapAuthToken()
  if (!token) return null
  return (
    <VectorBasemapLayer
      {...rest}
      key={token} // Ensures the refreshed token is injected properly by forcing a re-render after the token is refetched once expired
      name={name}
      token={token}
    />
  )
}

export default BaseLayerEsri
