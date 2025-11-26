/**
 * Calculates visible regions within the map view and generates screen reader text for accessibility.
 * It associates a number with each visible region and sets the region id in the URL state if keyed.
 * @param features - Array of GeoJSON features representing regions.
 * @returns A tuple containing JSX description and function to recalculate visible features.
 */
import Leaflet from 'leaflet'
import { parseAsString, useQueryState } from 'nuqs'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'
import { useDebounceCallback, useEventListener } from 'usehooks-ts'

import { geoJsonFeatureId, geoJsonFeatureName, mapDescriptionId, mapQueryKeys } from '@/app/constants/map.constants'

import { Feature } from '../data/geojson/ukhsa-regions'

const maxVisibleRegions = 9

export const useChoroplethKeyboardAccessibility = (features: Array<Feature>): [ReactElement, () => void] => {
  const [, setSelectedFeatureId] = useQueryState(mapQueryKeys.featureId, parseAsString)
  const debouncedSetSelectedFeatureId = useDebounceCallback(setSelectedFeatureId, 200)
  const map = useMap()
  const [visibleRegions, setVisibleRegions] = useState<Array<Feature>>([])

  // Detects visible features in the current map view.
  // This function is called once on map load and again on subsequent map move events.
  const calculateVisibleFeatures = useCallback(() => {
    const mapBounds = map.getBounds()
    const visibleRegions = features.filter((feature) => {
      const featureBounds = Leaflet.geoJSON(feature).getBounds()
      return mapBounds.intersects(featureBounds)
    })
    setVisibleRegions(visibleRegions)
  }, [features, map])

  useEffect(() => {
    // Run this effect once on mount
    calculateVisibleFeatures()
  }, [calculateVisibleFeatures])

  useEventListener('keydown', (event) => {
    if (visibleRegions.some((region, index) => index === Number(event.key) - 1)) {
      const id = visibleRegions[Number(event.key) - 1].properties[geoJsonFeatureId]
      debouncedSetSelectedFeatureId(String(id))
    }
  })

  const numVisibleRegions = visibleRegions.length

  // If there are more than 9 visible features, inform the user to zoom in for better selection.
  if (numVisibleRegions > maxVisibleRegions) {
    const description = (
      <div id={mapDescriptionId} className="govuk-visually-hidden">
        {`There are ${numVisibleRegions} or more visible regions. Please zoom in to refine results.`}
      </div>
    )
    return [description, calculateVisibleFeatures]
  }

  // Otherwise, provide instructions for selecting regions using keyboard numbers.
  const description = (
    <div id={mapDescriptionId} className="govuk-visually-hidden" data-testid="ukhsa-map-sr">
      {`${numVisibleRegions} regions highlighted in the map area. Use number keys to select a region.`}
      {visibleRegions.map((region, index) => {
        // TODO: Once integrated with API, add dynamic alert text.
        // TODO: See if we can use i18n for this instead.
        return `${index + 1}. ${region.properties[geoJsonFeatureName]}\n`
      })}
    </div>
  )

  return [description, calculateVisibleFeatures]
}
