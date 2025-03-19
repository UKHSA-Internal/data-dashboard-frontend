import { Chart } from '@/api/models/cms/Page'

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
