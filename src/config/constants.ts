/**
 * The NextJS Api Route path for chart export
 */
export const chartExportApiRoutePath = '/api/chart/export'

/**
 * The default file format in which charts are downloaded as
 */
export const chartExportFormat: 'csv' | 'json' = 'csv'

/**
 * The maximum columns per table in the tabular data view
 */
export const chartTableMaxColumns = {
  narrow: 2,
  wide: 3,
} as const

/**
 * Chart size variants
 */
export const chartSizes = {
  narrow: {
    width: 466,
    height: 235,
  },
  wide: {
    width: 1002,
    height: 237,
  },
} as const

/**
 * The default file format in which charts are displayed as
 */
export const chartFormat = 'svg'
