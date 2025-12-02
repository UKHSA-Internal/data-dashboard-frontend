import { z } from 'zod'

import { Chart, ChartCardSchemas } from '@/api/models/cms/Page'

export const getChartSvg = (encodedSvg: string) =>
  encodeURIComponent(decodeURIComponent(encodedSvg.replace(/\+/g, ' ')))

export const getChartTimespan = (plots: Chart): { years: number; months: number } => {
  if (!plots?.length) return { years: 0, months: 0 }

  let maxMonths = 0

  // Check if all plots have no date_to
  const allPlotsMissingDateTo = plots.every((plot) => !plot.value.date_to)

  // Check each plot, get the largest difference for use in select component
  plots.forEach((plot) => {
    // If date_from is missing, skip this plot
    if (!plot.value.date_from) return

    // If all plots are missing date_to, use today's date
    // Otherwise, only process plots that have both date_from and date_to
    let dateTo: Date
    if (allPlotsMissingDateTo) {
      dateTo = new Date()
    } else {
      // If we're not using the "all missing" fallback and this plot is missing date_to, skip it
      if (!plot.value.date_to) return
      dateTo = new Date(plot.value.date_to)
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
      newDate.setDate(1)
      newDate.setMonth(newDate.getMonth() - parseInt(amount))
      break
    case 'year':
    case 'years':
      newDate.setDate(1)
      newDate.setMonth(0)
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
  timeseriesFilter: string,
  chartId: string
): Chart | undefined => {
  if (!timeseriesFilter) return

  // Get timeseriesFilter URL parameters
  const filters =
    timeseriesFilter?.split(';').map((filterString) => {
      const [plotId, filterValue] = filterString.split('|')
      return { plotId, filterValue }
    }) ?? []

  return data.chart.map((plot) => {
    const matchingFilter = filters.find((filter) => filter.plotId.toLowerCase() === chartId.toLowerCase())

    if (!matchingFilter) return plot

    let newDateFrom = plot.value.date_from

    if (matchingFilter.filterValue !== 'all')
      newDateFrom = subtractFromDate(matchingFilter.filterValue, new Date(plot.value.date_to ?? ''))

    return {
      id: plot.id,
      type: plot.type,
      value: {
        ...plot.value,
        date_from: newDateFrom, // Update date_from based on filter provided
      },
    }
  })
}
