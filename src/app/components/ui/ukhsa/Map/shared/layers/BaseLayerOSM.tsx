/**
 * A reusable base tile layer component that supports OSM (Ordinate Survey Maps)
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import { type TileLayerProps } from 'react-leaflet'
import VectorTileLayer from 'react-leaflet-vector-tile-layer'

import { ordinanceSurveyMapsLicense } from '@/app/constants/map.constants'
import useMapAuthToken from '@/app/hooks/queries/useMapAuthToken'

// The `transformRequest` method must be augmented as the `TileLayer` component is missing a type for this prop
declare module 'react-leaflet-vector-tile-layer' {
  interface VectorTileLayerProps {
    customProp?: string
    transformRequest: (url: string) =>
      | {
          url: string
          headers: { Authorization: string }
        }
      | undefined
  }
}

interface BaseLayerProps extends Partial<TileLayerProps> {}

const attribution = `\n\n© Crown copyright ${new Date().getFullYear()} OS ${ordinanceSurveyMapsLicense}. Use of this data is subject to terms and conditions.\n
You are granted a non-exclusive, royalty free revocable licence solely to view the licensed data for non-commercial purposes for the period during which UKHSA makes it available; You are not permitted to copy, sub-license, distribute, sell or otherwise make available the licensed data to third parties in any form; and Third party rights to enforce the terms of this licence shall be reserved to OS.\n
Ⓗ Hawlfraint y Goron ${new Date().getFullYear()} Arolwg Ordnans ${ordinanceSurveyMapsLicense}. Defnyddio data hwn yn amodol ar delerau ac amodau.\nRhoddir trwydded ddirymiadwy, anghyfyngedig a heb freindal i chi i weld y data trwyddedig at ddibenion anfasnachol am y cyfnod y mae ar gael gan UKHSA. Ni chewch gopïo, is-drwyddedu, dosbarthu na gwerthu unrhyw ran o’r data hwn i drydydd partïon mewn unrhyw ffurf; ac. Yr Arolwg Ordnans fydd yn cadw’r hawlio trydydd parti i orfodi amodau’r drwydded hon.
`

const BaseLayerOSM = ({ ...rest }: BaseLayerProps) => {
  const {
    data: { token },
  } = useMapAuthToken()
  return (
    <VectorTileLayer
      {...rest}
      key={token} // Ensures the refreshed token is injected properly by forcing a re-render after the token is refetched once expired
      styleUrl={`https://api.os.uk/maps/vector/v1/vts/resources/styles?key=${token}`}
      attribution={attribution}
      transformRequest={(url) => {
        if (url.startsWith('https://api.os.uk')) {
          const newUrl = new URL(url)
          if (!newUrl.searchParams.has('key')) newUrl.searchParams.append('key', token)
          if (!newUrl.searchParams.has('srs')) newUrl.searchParams.append('srs', '3857')
          return {
            url: new Request(newUrl).url,
            headers: { Authorization: 'Bearer ' + token },
          }
        }
      }}
      accessToken={token}
    />
  )
}

export default BaseLayerOSM
