/**
 * Unique identifier for our leaflet map container
 * This id is essential for accessibility as various our controls utilise `aria-controls` attributes
 * pointing to this value.
 */
export const mapId = 'viewport'

/**
 * Accessible role for the leafet map container
 */
export const mapRole = 'application'

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
