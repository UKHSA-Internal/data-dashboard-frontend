/**
 * A reusable base tile layer component that supports OSM (Ordinate Survey Maps)
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import { type TileLayerProps } from 'react-leaflet'
import VectorTileLayer from 'react-leaflet-vector-tile-layer'

import useEsriMapAuthToken from '@/app/hooks/queries/useEsriMapAuthToken'

interface BaseLayerProps extends Partial<TileLayerProps> {}

const BaseLayerOSM = ({
  attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  ...rest
}: BaseLayerProps) => {
  const { data: token } = useEsriMapAuthToken()
  return (
    <VectorTileLayer
      {...rest}
      styleUrl={`https://api.os.uk/maps/vector/v1/vts/resources/styles?key=${token}`}
      transformRequest={(url, resourceType) => {
        if (url.startsWith('https://api.os.uk')) {
          url = new URL(url)
          if (!url.searchParams.has('key')) url.searchParams.append('key', apiKey)
          if (!url.searchParams.has('srs')) url.searchParams.append('srs', 3857)
          return {
            url: new Request(url).url,
            headers: { Authorization: 'Bearer ' + token },
          }
        }
      }}
      accessToken={token}
    />
  )
}

export default BaseLayerOSM
