/**
 * Cover wrapper around the react-leaflet GeoJSON component
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import Leaflet, { GeoJSONOptions, LeafletMouseEvent, Path, PathOptions } from 'leaflet'
import { parseAsString, useQueryState } from 'nuqs'
import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react'
import { GeoJSON, useMap, useMapEvents } from 'react-leaflet'

import { MapDataList } from '@/api/models/Maps'
import { mapQueryKeys } from '@/app/constants/map.constants'
import {
  getActiveCssVariableFromColour,
  getCssVariableFromColour,
  getHoverCssVariableFromColour,
  MapFeatureColour,
} from '@/app/utils/map.utils'

import { ThresholdItemProps } from '../controls/MapLegendControl'
import countriesFeatureCollection, { Feature as CountriesFeature } from '../data/geojson/countries'
import localAuthoritiesFeatureCollection, {
  Feature as LocalAuthoritiesFeature,
} from '../data/geojson/local-authorities'
import regionFeatureCollection, { Feature as RegionFeature } from '../data/geojson/ukhsa-regions'
import { useChoroplethKeyboardAccessibility } from '../hooks/useChoroplethKeyboardEvents'

/* eslint-disable @typescript-eslint/no-explicit-any*/

/**
 * Extracted type of props that GeoJSON component accepts.
 */
export type GeoJSONProps = ComponentProps<typeof GeoJSON>

/**
 * Props specific to the Choropleth component.
 */
interface CoverLayerProps extends Omit<GeoJSONProps, 'data'> {
  mapData: MapDataList
  dataThresholds: ThresholdItemProps[]
  /**
   * Optional prop to override the data received by the underlying GeoJSON component from react-leaflet.
   * By default, this component automatically populates UKHSA-specific regional boundary data.
   */
  data?: GeoJSONProps['data']

  /**
   * The ID of the selected feature.
   */
  selectedFeatureId?: string | null

  /**
   * Callback that fires when individual features are clicked.
   */
  onSelectFeature?: (callback: (featureId: string | null) => string | null) => void

  /**
   * Optional theme object to override the GeoJSON styles.
   */
  theme?: PathOptions

  /**
   * Optional class name to attach to each feature.
   */
  className?: string
}

interface CustomLeafletEvent extends LeafletMouseEvent {
  target: {
    feature: LocalAuthoritiesFeature & RegionFeature & CountriesFeature
  }
}

interface LayerWithFeature extends Path {
  feature: LocalAuthoritiesFeature & RegionFeature & CountriesFeature
}

interface GeoJSONLayer<T extends LayerWithFeature> extends GeoJSONOptions {
  /**
   * Callback function called once for each feature found in the GeoJSON data.
   */
  onEachFeature?: (feature: LocalAuthoritiesFeature & RegionFeature & CountriesFeature, layer: T) => void
}

const defaultTheme = {
  weight: 2,
  color: 'rgb(21, 22, 21)',
  fillColor: 'rgba(62, 62, 62, 0.8)',
  fillOpacity: 1,
} as const

type DataLevel = 'countries' | 'regions' | 'local-authorities'

/**
 * Choropleth is a wrapper around the GeoJSON component provided by `react-leaflet`.
 * It simplifies the process of rendering choropleth maps using UKHSA regional boundary data.
 * The data for UKHSA regions is automatically provided as the default data source, but you can optionally override it using the 'data' prop.
 * All props supported by the GeoJSON component are also supported by Choropleth.
 */
const CoverLayer = <T extends LayerWithFeature>({
  theme = defaultTheme,
  className = 'transition-all duration-150 outline-none',
  dataThresholds: thresholdData,
  mapData,
  ...rest
}: CoverLayerProps) => {
  const [selectedFeatureId, setSelectedFeatureId] = useQueryState(mapQueryKeys.featureId, parseAsString)

  // State for zoom-dependent data loading
  const [dataLevel, setDataLevel] = useState<DataLevel>('countries')
  const [geoJsonData, setGeoJsonData] = useState<any>(countriesFeatureCollection)
  const [renderKey, setRenderKey] = useState(0)
  const activeTooltipLayerRef: { current: T | null } = useRef(null)

  const featuresRef = useRef<Array<LocalAuthoritiesFeature & RegionFeature & CountriesFeature>>([])

  const clickedFeatureIdRef = useRef<string | null>(selectedFeatureId)
  const map = useMap()

  const getDataLevel = useCallback(() => {
    return 'local-authorities'
  }, [])

  const loadGeoJsonData = useCallback(async (level: DataLevel) => {
    try {
      let newData

      switch (level) {
        case 'local-authorities':
          const englishLocalAuthorityFeatures = localAuthoritiesFeatureCollection.features.filter((feature) =>
            feature.properties.LAD24CD.startsWith('E')
          )
          localAuthoritiesFeatureCollection.features = englishLocalAuthorityFeatures
          newData = [regionFeatureCollection, localAuthoritiesFeatureCollection]
          break
        case 'regions':
          newData = regionFeatureCollection
          break
        default:
          newData = regionFeatureCollection
          break
      }

      setGeoJsonData(newData)

      // Clear features ref to rebuild with new data
      featuresRef.current = []
    } catch (error) {
      console.error(`Error loading GeoJSON data for level ${level}:`, error)
      // Fallback to countries data on error
      setGeoJsonData(countriesFeatureCollection)
    }
  }, [])

  const geoJsonFeatureId = 'LAD24CD' satisfies keyof LocalAuthoritiesFeature['properties']

  useEffect(() => {
    if (map) {
      const initialDataLevel = getDataLevel()
      setDataLevel(initialDataLevel)
      loadGeoJsonData(initialDataLevel)
    }
  }, [map, getDataLevel, loadGeoJsonData])

  /**
   * Load new data when data level changes
   */
  useEffect(() => {
    loadGeoJsonData(dataLevel)
  }, [dataLevel, loadGeoJsonData])

  useEffect(() => {
    setRenderKey((prev) => prev + 1)
  }, [dataLevel])

  const defaultOptions: GeoJSONLayer<T> = {
    onEachFeature: (feature, layer) => {
      featuresRef.current = [...featuresRef.current, feature]

      layer.on({
        add: (event) => {
          const testId = `feature-${feature.properties[geoJsonFeatureId]}`
          event.target.getElement().setAttribute('data-testid', testId)
        },
        click: (event: CustomLeafletEvent) => {
          // Store the clicked ref
          if (layer.feature.id) {
            clickedFeatureIdRef.current = layer.feature.properties[geoJsonFeatureId]
          }
          const latlng = Leaflet.latLng(feature.properties.LAT, feature.properties.LONG)

          if (map.getZoom() < 8) {
            map.setView(latlng, 8)
          }

          // Prevent map click events from firing
          Leaflet.DomEvent.stopPropagation(event)

          // Close any existing tooltip from previous feature
          if (activeTooltipLayerRef.current && activeTooltipLayerRef.current !== layer) {
            activeTooltipLayerRef.current.closeTooltip().unbindTooltip()
          }

          // Fire the callback prop if provided
          setSelectedFeatureId((featureId) => {
            const feature = event.target.feature
            const currentFeatureId = feature.properties[geoJsonFeatureId]

            if (currentFeatureId === featureId) {
              // Clicked same feature - close tooltip and deselect
              if (activeTooltipLayerRef.current) {
                activeTooltipLayerRef.current.closeTooltip().unbindTooltip()
                activeTooltipLayerRef.current = null
              }
              return null
            } else {
              // Clicked new feature - create and open tooltip
              const featureData = getFeatureData(layer.feature.properties[geoJsonFeatureId])
              activeTooltipLayerRef.current = layer
                .bindTooltip(
                  `
                  <h1></h1><b>Local Authority</b>: ${feature.properties['LAD24NM']}
                  <br />
                  <b>Vaccine Uptake</b>:${featureData?.metric_value}</>
                  `,
                  {
                    permanent: true, // This keeps it open while moving cursor
                    opacity: 1,
                    direction: 'center',
                  }
                )
                .openTooltip()

              return currentFeatureId
            }
          })
        },
        mouseover: () => {
          // Skip hover styles if this feature is already active/clicked
          if (clickedFeatureIdRef.current === layer.feature.id) return
          const featureData = getFeatureData(layer.feature.properties[geoJsonFeatureId])
          if (!featureData) return
          const colour = getThresholdColour(featureData)
          const hoverColour = getHoverCssVariableFromColour(colour as MapFeatureColour)
          layer.setStyle({ fillColor: hoverColour })
        },
        mouseout: () => {
          // Skip hover styles if this feature is already active/clicked
          if (clickedFeatureIdRef.current === layer.feature.id) return
          const featureData = getFeatureData(layer.feature.properties[geoJsonFeatureId])
          if (!featureData) return
          const colour = getThresholdColour(featureData)
          layer.setStyle({
            fillColor: getCssVariableFromColour(colour as MapFeatureColour),
            fillOpacity: theme.fillOpacity,
          })
        },
      })
    },
  }

  const [screenReaderText, updateScreenReaderText] = useChoroplethKeyboardAccessibility(featuresRef.current)

  // Setup map click events for interactions outside of the geojson features
  const MapEvents = () => {
    useMapEvents({
      click() {
        if (selectedFeatureId) {
          setSelectedFeatureId(null)
        }
      },
      moveend() {
        updateScreenReaderText()
      },
      zoomend() {
        const newDataLevel = getDataLevel()

        if (newDataLevel !== dataLevel) {
          setDataLevel(newDataLevel)
        }
      },
    })
    return null
  }

  const getCurrentData = () => {
    return geoJsonData
  }

  const getFeatureData = (featureId: any) => {
    if (!mapData) return
    return mapData.find((element: any) => element.geography_code === featureId)
  }

  const getThresholdColour = (featureData: any): MapFeatureColour | undefined => {
    const processedMetricValue = (featureData.metric_value / 100).toFixed(2)

    let thresholdColour
    thresholdData.forEach((threshold: any) => {
      if (
        processedMetricValue >= threshold.boundary_minimum_value &&
        processedMetricValue <= threshold.boundary_maximum_value
      ) {
        thresholdColour = threshold.colour
      }
    })

    return thresholdColour
  }

  const getStyleForFeatureCollection = (feature: any, featureCollection: any) => {
    if (!feature || !feature.id) return {}

    // Base style
    const style: Leaflet.PathOptions = {
      ...theme,
      className,
    }

    // find feature data
    const featureData = getFeatureData(feature.properties[geoJsonFeatureId])

    const currentFeatureId = feature.properties[geoJsonFeatureId]
    const isSelected = selectedFeatureId == currentFeatureId

    // Apply different styling based on feature collection name
    if (featureCollection.name === 'Local Authorities') {
      if (featureData) {
        const colour = getThresholdColour(featureData)
        if (isSelected) {
          style.fillColor = getActiveCssVariableFromColour(colour as MapFeatureColour)
        } else {
          style.fillColor = getCssVariableFromColour(colour as MapFeatureColour)
        }
      }
      style.fillOpacity = 1
      style.color = 'rgb(255, 255, 255)'
      style.weight = 1
    } else if (featureCollection.name === 'Regions') {
      style.fillColor = 'rgba(99, 232, 89, 0)'
      style.fillOpacity = 0
      style.color = 'rgb(0, 0, 0)'
      style.weight = 5
    }
    return style
  }

  const renderGeoJsonLayers = () => {
    const geoJsonFeatures = getCurrentData()
    if (Array.isArray(geoJsonFeatures)) {
      return geoJsonFeatures.map((featureCollection, index) => (
        <GeoJSON
          key={`geojson-${dataLevel}-${renderKey}-${index}`}
          data={featureCollection}
          {...defaultOptions}
          style={(feature) => getStyleForFeatureCollection(feature, featureCollection)}
          {...rest}
        />
      ))
    }
    return (
      <GeoJSON
        key={`geojson-${dataLevel}-${renderKey}`}
        data={getCurrentData()}
        {...defaultOptions}
        style={(feature) => {
          // If the feature or its ID is not available, return an empty style
          if (!feature || !feature.id) return {}

          // Define the base style for the feature
          const style: Leaflet.PathOptions = {
            ...theme,
            className,
          }
          return style
        }}
        {...rest}
      />
    )
  }

  return (
    <>
      {screenReaderText}
      <MapEvents />
      {renderGeoJsonLayers()}
    </>
  )
}

export default CoverLayer
