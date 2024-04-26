'use client'

import Leaflet, { GeoJSONOptions, LeafletMouseEvent, Path, PathOptions } from 'leaflet'
import { ComponentProps, useCallback, useRef } from 'react'
import { GeoJSON, useMapEvents } from 'react-leaflet'

import { Feature, featureCollection, FeatureProperties } from './geojson/ukhsa-regions'

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
   * The ID of the selected feature.
   */
  selectedFeatureId: number | null

  /**
   * Callback that fires when individual features are clicked.
   */
  onSelectFeature: (callback: (featureId: number | null) => number | null) => void

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
const Choropleth = <T extends LayerWithFeature>({
  selectedFeatureId,
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
          onSelectFeature((featureId) => {
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
          if (clickedFeatureIdRef.current === layer.feature.id) return
          layer.setStyle({ fillOpacity: theme.fillOpacity })
        },
        mouseout: () => {
          if (clickedFeatureIdRef.current === layer.feature.id) return
          layer.setStyle({ fillOpacity: theme.fillOpacity })
        },
      })
    },
  }

  const MapEvents = useCallback(() => {
    useMapEvents({
      click() {
        if (selectedFeatureId) {
          onSelectFeature(() => null)
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
          if (!feature || !feature.properties) return {}

          const { active, ...rest } = theme

          const properties = feature.properties as FeatureProperties

          const isClicked = selectedFeatureId == feature.id
          const fillOpacity = isClicked ? active.fillOpacity : theme.fillOpacity

          // TODO: This needs to be refactored so the mapping of status/colours is dynamically driven
          switch (properties.phec16nm) {
            case 'North East':
            case 'North West':
              return {
                ...rest,
                fillOpacity,
                fillColor: 'var(--colour-red)',
                className,
              }
            case 'East of England':
            case 'London':
              return {
                ...rest,
                fillOpacity,
                fillColor: 'var(--colour-orange)',
                className,
              }
          }
          return {
            ...rest,
            fillOpacity,
            fillColor: 'var(--colour-green)',
            className,
          }
        }}
        {...rest}
      />
    </>
  )
}

export default Choropleth
