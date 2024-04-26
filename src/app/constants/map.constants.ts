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
