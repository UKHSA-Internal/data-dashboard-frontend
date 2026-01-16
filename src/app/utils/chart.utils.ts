import { z } from 'zod'

import { Chart, ChartCardSchemas } from '@/api/models/cms/Page'

export const getChartSvg = (encodedSvg: string) =>
  encodeURIComponent(decodeURIComponent(encodedSvg.replace(/\+/g, ' ')))

export const getChartTimespan = (plots: Chart, lastUpdated: string): { years: number; months: number } => {
  if (!plots?.length) return { years: 0, months: 0 }

  let maxMonths = 0

  // Check if all plots have no date_to
  const allPlotsMissingDateTo = plots.every((plot) => !plot.value.date_to)

  // Check each plot, get the largest difference for use in select component
  plots.forEach((plot) => {
    // If date_from is missing, skip this plot
    if (!plot.value.date_from) return

    // If all plots are missing date_to, use lastUpdated date
    // Otherwise, only process plots that have both date_from and date_to
    let dateTo: Date
    if (allPlotsMissingDateTo) {
      dateTo = new Date(lastUpdated)
    } else {
      // If we're not using the "all missing" fallback and this plot is missing date_to, skip it
      if (!plot.value.date_to) return
      // Use the minimum of date_to and lastUpdated to ensure filter ranges are based on actual data availability
      const plotDateTo = new Date(plot.value.date_to)
      const lastUpdatedDate = new Date(lastUpdated)
      dateTo = plotDateTo < lastUpdatedDate ? plotDateTo : lastUpdatedDate
    }

    const dateFrom = new Date(plot.value.date_from)

    // Get total month difference
    const monthDiff = (dateTo.getFullYear() - dateFrom.getFullYear()) * 12 + (dateTo.getMonth() - dateFrom.getMonth())

    // Looking for biggest month diff
    if (monthDiff > maxMonths) {
      maxMonths = monthDiff
    }
  })

  const returnItem = {
    years: Math.floor(maxMonths / 12),
    months: maxMonths % 12,
  }

  return returnItem
}

const subtractFromDate = (toSubtract: string, date: Date = new Date()): string => {
  const [amount, unit] = toSubtract.split('-')

  const newDate = new Date(date)

  switch (unit) {
    case 'month':
    case 'months':
      newDate.setMonth(newDate.getMonth() - parseInt(amount))
      break
    case 'year':
    case 'years':
      newDate.setFullYear(newDate.getFullYear() - parseInt(amount))
      break
    default:
      throw new Error('Unsupported subtraction unit')
  }

  const year = newDate.getFullYear()
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
  const day = newDate.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const getFilteredData = (
  data: z.infer<typeof ChartCardSchemas>['value'],
  filterValue: string,
  lastUpdated: string
): Chart | undefined => {
  return data.chart.map((plot) => {
    // If date_to is provided, use the minimum of date_to and lastUpdated to ensure filter ranges are based on actual data availability
    let dateTo: Date
    if (plot.value.date_to) {
      const plotDateTo = new Date(plot.value.date_to)
      const lastUpdatedDate = new Date(lastUpdated)
      dateTo = plotDateTo < lastUpdatedDate ? plotDateTo : lastUpdatedDate
    } else {
      dateTo = new Date(lastUpdated)
    }
    const dateToString = plot.value.date_to || new Date(dateTo).toISOString().split('T')[0]

    // When filter is 'all', restore original dates (or use last updated date if date_to was null)
    if (!filterValue || filterValue === 'all') {
      const restoredPlot = {
        id: plot.id,
        type: plot.type,
        value: {
          ...plot.value,
          date_from: plot.value.date_from, // Original date_from
          date_to: dateToString, // Original date_to or last updated date
        },
      }
      return restoredPlot
    }

    // Apply filter by updating date_from
    const newDateFrom = subtractFromDate(filterValue, dateTo)

    return {
      id: plot.id,
      type: plot.type,
      value: {
        ...plot.value,
        date_from: newDateFrom, // Update date_from based on filter provided
        date_to: dateToString, // Ensure date_to is set (original or last updated date)
      },
    }
  })
}
