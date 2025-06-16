/**
 * Choropleth wrapper around the react-leaflet GeoJSON component
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import Leaflet, { GeoJSONOptions, LeafletMouseEvent, Path, PathOptions } from 'leaflet'
import { parseAsString, useQueryState } from 'nuqs'
import { ComponentProps, useRef } from 'react'
import { GeoJSON, useMap, useMapEvents } from 'react-leaflet'

import { HealthAlertStatus } from '@/api/models/Alerts'
import { geoJsonFeatureId, mapQueryKeys } from '@/app/constants/map.constants'
import {
  getActiveCssVariableFromColour,
  getCssVariableFromColour,
  getHoverCssVariableFromColour,
} from '@/app/utils/weather-health-alert.utils'

import { Feature } from '../data/geojson/ukhsa-regions'
import { useChoroplethKeyboardAccessibility } from '../hooks/useChoroplethKeyboardEvents'

/**
 * Extracted type of props that GeoJSON component accepts.
 */
export type GeoJSONProps = ComponentProps<typeof GeoJSON>

/**
 * Props specific to the Choropleth component.
 */
interface ChoroplethProps extends Omit<GeoJSONProps, 'data'> {
  /**
   * Optional prop to override the data received by the underlying GeoJSON component from react-leaflet.
   * By default, this component automatically populates UKHSA-specific regional boundary data.
   */
  data: GeoJSONProps['data']

  /**
   * Colours mapping object to associate a particular region id with one of the four available colours
   */
  featureColours: Record<string, HealthAlertStatus>

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
    feature: Feature
  }
}

interface LayerWithFeature extends Path {
  feature: Feature
}

interface GeoJSONLayer<T extends LayerWithFeature> extends GeoJSONOptions {
  /**
   * Callback function called once for each feature found in the GeoJSON data.
   */
  onEachFeature?: (feature: Feature, layer: T) => void
}

const defaultTheme = {
  weight: 2,
  color: 'rgba(255, 255, 255, 1)',
  fillOpacity: 1,
} as const

/**
 * Choropleth is a wrapper around the GeoJSON component provided by `react-leaflet`.
 * It simplifies the process of rendering choropleth maps using UKHSA regional boundary data.
 * The data for UKHSA regions is automatically provided as the default data source, but you can optionally override it using the 'data' prop.
 * All props supported by the GeoJSON component are also supported by Choropleth.
 */
const ChoroplethLayer = <T extends LayerWithFeature>({
  featureColours,
  data,
  theme = defaultTheme,
  className = 'transition-all duration-150 !outline-none',
  ...rest
}: ChoroplethProps) => {
  const [selectedFeatureId, setSelectedFeatureId] = useQueryState(mapQueryKeys.featureId, parseAsString)

  const featuresRef = useRef<Array<Feature>>([])

  const clickedFeatureIdRef = useRef<string | null>(selectedFeatureId)
  const map = useMap()

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

          map.setView(latlng, 8)

          // Prevent map click events from firing
          Leaflet.DomEvent.stopPropagation(event)

          // Fire the callback prop if provided
          setSelectedFeatureId((featureId) => {
            const feature = event.target.feature
            if (feature.id == featureId) {
              // Clicked same feature
              return null
            } else {
              // Clicked new feature
              return feature.properties[geoJsonFeatureId]
            }
          })
        },
        mouseover: () => {
          // Skip hover styles if this feature is already active/clicked
          if (clickedFeatureIdRef.current === layer.feature.id) return
          console.log('Feature information:', JSON.stringify(feature))

          const colour = featureColours[feature.properties[geoJsonFeatureId]] as HealthAlertStatus
          const hoverColour = getHoverCssVariableFromColour(colour)
          layer.setStyle({ fillColor: hoverColour })
          layer
            .bindTooltip(`<h1>ToolTip Example</h1><b>Region</b>: London<br /><b>Vaccine Uptake</b>:${'>'}95</>`, {
              permanent: false,
              opacity: 1,
              direction: 'center',
            })
            .openTooltip()
        },
        mouseout: () => {
          // Skip hover styles if this feature is already active/clicked
          if (clickedFeatureIdRef.current === layer.feature.id) return

          const colour = featureColours[feature.properties[geoJsonFeatureId]] as HealthAlertStatus
          layer.setStyle({
            fillColor: getCssVariableFromColour(colour),
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
    })
    return null
  }

  return (
    <>
      {screenReaderText}
      <MapEvents />
      <GeoJSON
        data={data}
        {...defaultOptions}
        style={(feature) => {
          // If the feature or its ID is not available, return an empty style
          if (!feature || !feature.id) return {}

          const currentFeatureId = feature.properties[geoJsonFeatureId]
          const isSelected = selectedFeatureId == currentFeatureId

          // Define the base style for the feature
          const style: Leaflet.PathOptions = {
            ...theme,
            className,
          }

          // Apply custom colours if the feature ID is present in the featureColours map
          if (currentFeatureId in featureColours) {
            const colour = featureColours[currentFeatureId]
            if (isSelected) {
              style.fillColor = getActiveCssVariableFromColour(colour)
            } else {
              style.fillColor = getCssVariableFromColour(colour)
            }
          }

          return style
        }}
        {...rest}
      />
    </>
  )
}

export default ChoroplethLayer
