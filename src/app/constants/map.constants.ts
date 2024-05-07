/**
 * Unique identifier for the container of our Leaflet map.
 * This ID is crucial for accessibility, as several of our controls use
 * `aria-controls` attributes that reference this value.
 */
export const mapId = 'viewport'

/**
 * Accessible role for the container of the Leaflet map.
 * This role helps ensure accessibility for users of assistive technologies.
 */
export const mapRole = 'application'

/**
 * Accessible title for the container of the Leaflet map.
 * This title helps ensure accessibility for users of assistive technologies.
 */
export const mapTitle = 'Interactive adverse weather map viewer'

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
