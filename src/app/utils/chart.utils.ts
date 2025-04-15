import { z } from 'zod'

import { Chart, ChartCardSchemas } from '@/api/models/cms/Page'

export const getChartSvg = (encodedSvg: string) =>
  encodeURIComponent(decodeURIComponent(encodedSvg.replace(/\+/g, ' ')))

export const getChartTimespan = (plots: Chart) => {
  if (!plots?.length) return { years: 0, months: 0 }

  let maxMonths = 0

  // Check if all plots are missing dates - to return default of 1 year
  let allPlotsMissingDates = true

  // Check each plot, get the largest difference for use in select component
  plots.forEach((plot) => {
    // Skip plots with no dates
    if (!plot.value.date_from && !plot.value.date_to) {
      return
    }

    // If we get here, at least one plot has dates
    allPlotsMissingDates = false

    // If no date_from, use default of 1 year
    if (!plot.value.date_from) {
      maxMonths = Math.max(maxMonths, 12)
      return
    }

    // If no date_to, use current date
    const dateFrom = new Date(plot.value.date_from)
    const dateTo = plot.value.date_to ? new Date(plot.value.date_to) : new Date()

    // Get total month difference
    const monthDiff = (dateTo.getFullYear() - dateFrom.getFullYear()) * 12 + (dateTo.getMonth() - dateFrom.getMonth())

    // Looking for biggest month diff
    if (monthDiff > maxMonths) {
      maxMonths = monthDiff
    }
  })

  // If all plots were missing dates, use default of 1 year
  if (allPlotsMissingDates) {
    return { years: 1, months: 0 }
  }

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

export const getFilteredData = (data: z.infer<typeof ChartCardSchemas>['value'], timeseriesFilter: string) => {
  if (!timeseriesFilter) return

  // Get timeseriesFilter URL parameters
  const filters =
    timeseriesFilter?.split(';').map((filterString) => {
      const [plotId, filterValue] = filterString.split('|')
      return { plotId, filterValue }
    }) ?? []

  return data.chart.map((plot) => {
    const matchingFilter = filters.find((filter) => filter.plotId.toLowerCase() === plot.value.metric.toLowerCase())

    if (!matchingFilter) return plot

    const newDateFrom = subtractFromDate(matchingFilter.filterValue, new Date(plot.value.date_to ?? ''))

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
