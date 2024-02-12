/**
 * The NextJS Api Route path for chart download
 */
export const chartExportApiRoutePath = '/api/download/chart'

/**
 * The default file format in which charts are downloaded as
 */
export const chartExportFormat: 'csv' | 'json' = 'csv'

/**
 * The NextJS Api Route path for CMS driven downloadable content
 */
export const downloadApiRoutePath = '/api/download'

/**
 * The default file format for CMS driven downloadable content
 */
export const downloadFormat: 'csv' | 'json' = 'csv'

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
    width: 515,
    height: 260,
  },
  wide: {
    width: 1100,
    height: 260,
  },
} as const

/**
 * The default file format in which charts are displayed as
 */
export const chartFormat = 'svg'
