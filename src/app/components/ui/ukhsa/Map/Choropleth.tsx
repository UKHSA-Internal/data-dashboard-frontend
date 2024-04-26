'use client'

import Leaflet, { LeafletMouseEvent } from 'leaflet'
import { ComponentProps, useCallback, useRef } from 'react'
import { GeoJSON, useMapEvents } from 'react-leaflet'

import { Feature, featureCollection, FeatureProperties } from './geojson/ukhsa-regions'

// Extracting the type of props that GeoJSON component accepts
type GeoJSONProps = ComponentProps<typeof GeoJSON>

// Defining the props specific to the Choropleth component, excluding the 'data' prop which will be handled separately
interface ChoroplethProps extends Omit<GeoJSONProps, 'data'> {
  /**
   * Optional prop to override the data received by the underlying GeoJSON component from react-leaflet.
   * By default, this component automatically populates UKHSA-specific regional boundary data.
   */
  data?: GeoJSONProps['data']

  selectedFeatureId?: number | null

  /**
   * Optional callback prop that fires when individual features are clicked.
   */
  onSelectFeature?: (callback: (featureId: number | null) => number | null) => void
}

interface CustomLeafletEvent extends LeafletMouseEvent {
  target: {
    feature: Feature
  }
}

/**
 * Choropleth is a wrapper around the GeoJSON component provided by `react-leaflet`.
 * It simplifies the process of rendering choropleth maps using UKHSA regional boundary data.
 * The data for UKHSA regions is automatically provided as the default data source, but you can optionally override it using the 'data' prop.
 * All props supported by the GeoJSON component are also supported by Choropleth.
 */
const Choropleth = ({ selectedFeatureId, onSelectFeature, data, ...rest }: ChoroplethProps) => {
  // const [selectedFeatureId, setFeatureIdUrlParam] = useQueryState('fid')

  // TODO: Progamatically set styles instead of useState
  // const [hoveredFeature, setHoveredFeature] = useState<Feature | null>()
  const hoveredFeatureRef = useRef<Feature | null>()

  const handleClick = (event: CustomLeafletEvent) => {
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
  }

  const handleMouseOver = (event: CustomLeafletEvent) => {
    const feature = event.target.feature
    hoveredFeatureRef.current = feature
    // setHoveredFeature(feature)
  }

  const handleMouseOut = () => {
    // setHoveredFeature(null)
    hoveredFeatureRef.current = null
  }

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
        onEachFeature={(feature, layer) => {
          layer.on({
            click: handleClick,
            mouseover: handleMouseOver,
            mouseout: handleMouseOut,
          })
        }}
        style={(feature) => {
          if (!feature || !feature.properties) return {}

          const properties = feature.properties as FeatureProperties

          const featureId = feature.id
          const isHovered = hoveredFeatureRef.current?.id === featureId
          const isClicked = selectedFeatureId == featureId

          const fillOpacity = isClicked ? 0.85 : isHovered ? 0.65 : 0.55
          const className = 'transition-all duration-200'

          switch (properties.phec16nm) {
            case 'North East':
            case 'North West':
              return {
                weight: 1,
                color: 'white',
                fillColor: 'var(--colour-red)',
                fillOpacity,
                className,
              }
            case 'East of England':
            case 'London':
              return {
                weight: 1,
                color: 'white',
                fillColor: 'var(--colour-orange)',
                fillOpacity,
                className,
              }
          }
          return {
            weight: 1,
            color: 'white',
            fillColor: 'var(--colour-green)',
            fillOpacity,
            className,
          }
        }}
        {...rest}
      />
    </>
  )
}

export default Choropleth
