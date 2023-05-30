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
  wide: 4,
} as const
