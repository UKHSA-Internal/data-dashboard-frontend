import { LatLngExpression } from 'leaflet'

import { Feature } from '../components/ui/ukhsa/Map/shared/data/geojson/ukhsa-regions'

/**
 * Identifier for the container of our Leaflet map.
 * This ID is important for accessibility, as it's referenced by `aria-controls` attributes
 * in various controls.
 */
export const mapId = 'viewport'

/**
 * Element ID that describes the map, used by the `aria-describedby` attribute on the map container.
 * This ID assists accessibility by providing a description for the map.
 */
export const mapDescriptionId = 'viewportDescription'

/**
 * Accessible role for the container of the Leaflet map.
 * This role ensures accessibility for users of assistive technologies.
 */
export const mapRole = 'application'

/**
 * Title for the container of the Leaflet map.
 * This title is read aloud for screen readers.
 */
export const mapTitle = 'Interactive adverse weather map viewer'

// Default map zoom level
export const zoom = 7

// Minimum zoom level allowed for the map
export const minZoom = 6

// Maximum zoom level allowed for the map
export const maxZoom = 10

// Default center coordinates of the map
export const center: LatLngExpression = [52.7957, -1.5479]

/**
 * Object mapping query parameter keys to their respective constants.
 * @example
 * // Usage:
 * const viewQueryParamKey = mapQueryKeys.view; // Returns 'v'
 */
export const mapQueryKeys = {
  /**
   * Represents the query parameter key for specifying the view type in the URL.
   * @type {string}
   */
  view: 'v',
  /**
   * Represents the query parameter key for specifying the feature ID in the URL.
   * @type {string}
   */
  featureId: 'fid',
} as const

// The ID property of the GeoJson feature properties object
export const geoJsonFeatureId = 'RGN23CD' satisfies keyof Feature['properties']
