import { z } from 'zod'

import { Chart, ChartCardSchemas } from '@/api/models/cms/Page'

export const getChartSvg = (encodedSvg: string) =>
  encodeURIComponent(decodeURIComponent(encodedSvg.replace(/\+/g, ' ')))

export const getChartTimespan = (plots: Chart) => {
  if (!plots?.length) return { years: 0, months: 0 }

  let maxMonths = 0

  // Check each plot, get the largest difference for use in select component
  plots.forEach((plot) => {
    // Null check
    if (!plot.value.date_from || !plot.value.date_to) return

    const dateFrom = new Date(plot.value.date_from)
    const dateTo = new Date(plot.value.date_to)

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

  switch (unit) {
    case 'month':
    case 'months':
      date.setMonth(date.getMonth() - parseInt(amount))
      break
    case 'year':
    case 'years':
      date.setFullYear(date.getFullYear() - parseInt(amount))
      break
    default:
      throw new Error('Unsupported subtraction unit')
  }

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

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

  return data.chart
    .map((plot) => {
      const matchingFilter = filters.find((filter) => filter.plotId.toLowerCase() === plot.value.metric.toLowerCase())

      if (!matchingFilter) return null

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
    .filter(Boolean) // Remove null entries
}
