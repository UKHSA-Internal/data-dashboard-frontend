/**
 * Choropleth wrapper around the react-leaflet GeoJSON component
 * Ensure to import this component dynamically in Next.js to optimise loading.
 */

'use client'

import Leaflet, { GeoJSONOptions, LeafletMouseEvent, Path, PathOptions } from 'leaflet'
import { ComponentProps, useCallback, useRef } from 'react'
import { GeoJSON, useMapEvents } from 'react-leaflet'

import { Feature, featureCollection } from '../data/geojson/ukhsa-regions'

/**
 * Extracted type of props that GeoJSON component accepts.
 */
type GeoJSONProps = ComponentProps<typeof GeoJSON>

/**
 * Props specific to the Choropleth component.
 */
interface ChoroplethProps extends Omit<GeoJSONProps, 'data'> {
  /**
   * Optional prop to override the data received by the underlying GeoJSON component from react-leaflet.
   * By default, this component automatically populates UKHSA-specific regional boundary data.
   */
  data?: GeoJSONProps['data']

  /**
   * Colours mapping object to associate a particular region id with one of the four available colours
   */
  featureColours: Record<number, 'green' | 'amber' | 'yellow' | 'red'>

  /**
   * The ID of the selected feature.
   */
  selectedFeatureId?: number | null

  /**
   * Callback that fires when individual features are clicked.
   */
  onSelectFeature?: (callback: (featureId: number | null) => number | null) => void

  /**
   * Optional theme object to override the GeoJSON styles.
   */
  theme?: PathOptions & {
    hover: PathOptions
    active: PathOptions
  }

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
  weight: 1,
  color: 'rgba(255,255, 255, 0.7)',
  fillOpacity: 0.55,
  hover: {
    fillOpacity: 0.65,
  },
  active: {
    fillOpacity: 0.86,
  },
} as const

/**
 * Choropleth is a wrapper around the GeoJSON component provided by `react-leaflet`.
 * It simplifies the process of rendering choropleth maps using UKHSA regional boundary data.
 * The data for UKHSA regions is automatically provided as the default data source, but you can optionally override it using the 'data' prop.
 * All props supported by the GeoJSON component are also supported by Choropleth.
 */
const ChoroplethLayer = <T extends LayerWithFeature>({
  featureColours,
  selectedFeatureId = null,
  onSelectFeature,
  data,
  theme = defaultTheme,
  className = 'transition-all duration-200',
  ...rest
}: ChoroplethProps) => {
  const clickedFeatureIdRef = useRef<number | null>(selectedFeatureId)

  const defaultOptions: GeoJSONLayer<T> = {
    onEachFeature: (feature, layer) => {
      layer.on({
        click: (event: CustomLeafletEvent) => {
          // Store the clicked ref
          if (layer.feature.id) {
            clickedFeatureIdRef.current = Number(layer.feature.id)
          }

          // Prevent map click events from firing
          Leaflet.DomEvent.stopPropagation(event)

          // Fire the callback prop if provided
          onSelectFeature?.((featureId) => {
            const feature = event.target.feature
            if (feature.id == featureId) {
              // Clicked same feature
              return null
            } else {
              // Clicked new feature
              return feature.id ? Number(feature.id) : null
            }
          })
        },
        mouseover: () => {
          // Skip hover styles if this feature is already active/clicked
          if (clickedFeatureIdRef.current === layer.feature.id) return
          layer.setStyle({ fillOpacity: theme.hover.fillOpacity })
        },
        mouseout: () => {
          // Skip hover styles if this feature is already active/clicked
          if (clickedFeatureIdRef.current === layer.feature.id) return
          layer.setStyle({ fillOpacity: theme.fillOpacity })
        },
      })
    },
  }

  // Setup map click events for interactions outside of the geojson features
  const MapEvents = useCallback(() => {
    useMapEvents({
      click() {
        if (selectedFeatureId) {
          onSelectFeature?.(() => null)
        }
      },
    })
    return null
  }, [onSelectFeature, selectedFeatureId])

  return (
    <>
      <MapEvents />
      <GeoJSON
        data={data ?? featureCollection}
        {...defaultOptions}
        style={(feature) => {
          // If the feature or its ID is not available, return an empty style
          if (!feature || !feature.id) return {}

          const { active, ...rest } = theme

          // Determine the fill opacity based on whether the feature is selected
          const fillOpacity = selectedFeatureId == feature.id ? active.fillOpacity : theme.fillOpacity

          // Define the base style for the feature
          const style: Leaflet.PathOptions = {
            ...rest,
            fillOpacity,
            className,
          }

          // Apply custom colours if the feature ID is present in the featureColours map
          if (feature.id in featureColours) {
            const colour = featureColours[Number(feature.id)]
            // Set the fill color using CSS variable and featureColours map
            style.fillColor = `var(--colour-${colour === 'amber' ? 'orange' : colour})`
          }

          return style
        }}
        {...rest}
      />
    </>
  )
}

export default ChoroplethLayer
