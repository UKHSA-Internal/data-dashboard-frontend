import chunk from 'lodash/chunk'

import { Response } from '@/api/requests/tables/getTables'
import { chartTableMaxColumns } from '@/config/constants'

export type Column = {
  header: string
  accessorKey: string // accessor is the "key" in the data
}

export type Data = {
  record: Record<string, string | number | null>
  inReportingDelay: boolean
  confidenceIntervals?: Record<string, { lower: number | null; upper: number | null }>
}

const createTable = (sourceData: Response) => {
  const columns: Array<Column> = []
  const data: Array<Data> = []

  // First column is reserved for the date
  columns.push({ header: 'Date', accessorKey: `col-0` })

  sourceData.forEach((item) => {
    const row: Data = { record: {}, inReportingDelay: false, confidenceIntervals: {} }

    // The row col-0 key is reserved for the reference field (usually a date or stratum along the x_axis)
    row.record['col-0'] = item.reference

    // Loop each of the plots for the given range
    item.values.forEach((plot, idx) => {
      // Get the column index for the row incremented by 1 to cater for the reference column
      const columnIndex = idx + 1

      // Add the current plot value to the row object with the key identified by the associated column
      row.record[`col-${columnIndex}`] = plot.value

      // Store confidence intervals if available
      if (plot.lower_confidence !== undefined || plot.upper_confidence !== undefined) {
        row.confidenceIntervals![`col-${columnIndex}`] = {
          lower: plot.lower_confidence ?? null,
          upper: plot.upper_confidence ?? null,
        }
      }

      // Does at least one item in the row have a reporting delay period
      row.inReportingDelay = plot.in_reporting_delay_period

      // Add a new column if it does not already exist in the columns array
      if (!columns.find((column) => column.header === plot.label)) {
        columns.push({ header: plot.label, accessorKey: `col-${columnIndex}` })
      }
    })

    // Push the row object to the data array
    data.push(row)
  })

  return {
    columns,
    data,
  }
}

/**
 * Divides the given source data into multiple arrays whilst chunking the amount of columns to a maximum of four
 * Each source data within the divided array is then parsed into a ui friendly format
 */
type Options = {
  maxColumns: number
}

export const parseChartTableData = (
  response: Response | null,
  { maxColumns }: Options = { maxColumns: chartTableMaxColumns.wide }
) => {
  if (!response || !response.length) return []

  const maxColumnsExcludingDate = maxColumns - 1
  const numColumns = response[0].values.length

  const numTables = Math.ceil(numColumns / maxColumnsExcludingDate)

  const tables: Response[] = Array(numTables)
    .fill(null)
    .map((_, index) =>
      response.map((data) => ({
        ...data,
        values: chunk(data.values, maxColumnsExcludingDate)[index],
      }))
    )

  return Array.from(tables.map((sourceData) => createTable(sourceData)))
}
