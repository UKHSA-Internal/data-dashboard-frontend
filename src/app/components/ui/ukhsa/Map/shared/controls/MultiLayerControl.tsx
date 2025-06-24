import { ControlPosition } from 'leaflet'
import { useMap } from 'react-leaflet'
import Control from 'react-leaflet-custom-control'

import { mapId, mapQueryKeys } from '@/app/constants/map.constants'
import { useMemo } from 'react'
import ChoroplethLayer from '../layers/ChoroplethLayer'
import localAuthoritiesFeatureCollection from '../data/geojson/local-authorities'
import regionFeatureCollection from '../data/geojson/ukhsa-regions'
import countriesFeatureCollection from '../data/geojson/countries'
import useWeatherHealthAlertList from '@/app/hooks/queries/useWeatherHealthAlertList'
import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { HealthAlertTypes } from '@/api/models/Alerts'

const MultiLayerControl = () => {
  const map = useMap()
  const zoomLevel = map.getZoom()


  const choroplethLayer = useMemo(() => {
    console.log('zoom level: ', map.getZoom())
    //Zoomed out to be able to see whole nation
    if (map.getZoom() >= 8) {
      return (
        <>
          <ChoroplethLayer data={countriesFeatureCollection} />
        </>
      )
    }
    // Zoomed out to be able to see Regions
    if (map.getZoom() >= 5) {
      return (
        <>
          <ChoroplethLayer data={regionFeatureCollection} />
        </>
      )
    }
    //Zoomed in to be able to see local authorities
    if (map.getZoom() < 5) {
      return (
        <>
          <ChoroplethLayer data={localAuthoritiesFeatureCollection} />
        </>
      )
    }
  }, [localAuthoritiesFeatureCollection, regionFeatureCollection, countriesFeatureCollection, zoomLevel])

  return <>{choroplethLayer}</>
}

export default MultiLayerControl
