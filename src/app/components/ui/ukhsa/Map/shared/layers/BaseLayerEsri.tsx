/**
 * A reusable base tile layer component that supports ArcGIS Esri
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import { ComponentProps } from 'react'
import VectorBasemapLayer from 'react-esri-leaflet/plugins/VectorBasemapLayer'

import useEsriMapAuthToken from '@/app/hooks/queries/useEsriMapAuthToken'

import { useBaseLayerEsri } from '../hooks/useBaseLayerEsri'

type EsriProps = ComponentProps<typeof VectorBasemapLayer>

interface BaseLayerEsriProps extends Omit<EsriProps, 'name'> {
  name?: EsriProps['name']
}

const BaseLayerEsri = ({ name = 'ArcGIS:Navigation', ...rest }: BaseLayerEsriProps) => {
  useBaseLayerEsri()
  const { data: token } = useEsriMapAuthToken()
  if (!token) return null
  return <VectorBasemapLayer {...rest} name={name} token={token} />
}

export default BaseLayerEsri
