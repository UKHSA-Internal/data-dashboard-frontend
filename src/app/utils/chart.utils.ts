import {
  Chart,
  ChartComponentData,
  DualCategoryChartCardValue,
  SingleCategoryChartCardValue,
} from '@/api/models/cms/Page'
import { DataClassification } from '@/api/models/DataClassification'
import { getCharts } from '@/api/requests/charts/getCharts'
import { getDualCategoryCharts } from '@/api/requests/charts/getDualCategoryCharts'
import type { Response as DualCategoryTableResponse } from '@/api/requests/tables/getTables'
import type { Column, Data } from '@/app/utils/chart-table.utils'
import { chartSizes } from '@/config/constants'

import { ChartSizes } from '../components/ui/ukhsa'

export const getChartSvg = (encodedSvg: string) =>
  encodeURIComponent(decodeURIComponent(encodedSvg.replace(/\+/g, ' ')))

export const getSingleCategoryChartTimespan = (
  plots: Chart,
  lastUpdated: string
): { years: number; months: number } => {
  if (!plots?.length) return { years: 0, months: 0 }

  let maxMonths = 0

  // Check each plot, get the largest difference for use in select component
  plots.forEach((plot) => {
    // If date_from is missing, skip this plot
    if (!plot.value.date_from) return

    // Always include open-ended plots by capping at lastUpdated
    const dateTo = (() => {
      if (!plot.value.date_to) return new Date(lastUpdated)
      const plotDateTo = new Date(plot.value.date_to)
      const lastUpdatedDate = new Date(lastUpdated)
      return plotDateTo < lastUpdatedDate ? plotDateTo : lastUpdatedDate
    })()

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

export const getDualCategoryChartTimespan = (
  data: DualCategoryChartCardValue,
  lastUpdated: string
): { years: number; months: number } => {
  const { date_from, date_to } = data.static_fields

  if (!date_from) return { years: 0, months: 0 }

  const dateTo = (() => {
    if (!date_to) return new Date(lastUpdated)
    const staticDateTo = new Date(date_to)
    const lastUpdatedDate = new Date(lastUpdated)
    return staticDateTo < lastUpdatedDate ? staticDateTo : lastUpdatedDate
  })()

  const dateFrom = new Date(date_from)
  const maxMonths = (dateTo.getFullYear() - dateFrom.getFullYear()) * 12 + (dateTo.getMonth() - dateFrom.getMonth())

  return {
    years: Math.floor(maxMonths / 12),
    months: maxMonths % 12,
  }
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

export const getFilteredSingleCategoryData = (
  data: SingleCategoryChartCardValue,
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

export const getFilteredDualCategoryData = (
  data: DualCategoryChartCardValue,
  filterValue: string,
  lastUpdated: string
): DualCategoryChartCardValue => {
  const { date_from, date_to } = data.static_fields

  let dateTo: Date
  if (date_to) {
    const staticDateTo = new Date(date_to)
    const lastUpdatedDate = new Date(lastUpdated)
    dateTo = staticDateTo < lastUpdatedDate ? staticDateTo : lastUpdatedDate
  } else {
    dateTo = new Date(lastUpdated)
  }

  const dateToString = date_to || new Date(dateTo).toISOString().split('T')[0]

  if (!filterValue || filterValue === 'all') {
    return {
      ...data,
      static_fields: {
        ...data.static_fields,
        date_from,
        date_to: dateToString,
      },
    }
  }

  const newDateFrom = subtractFromDate(filterValue, dateTo)

  return {
    ...data,
    static_fields: {
      ...data.static_fields,
      date_from: newDateFrom,
      date_to: dateToString,
    },
  }
}

export const isDualCategoryChartCardValue = (data: ChartComponentData): data is DualCategoryChartCardValue =>
  'segments' in data && 'static_fields' in data

export const isTimeseriesChartData = (data: ChartComponentData): boolean => {
  if (isDualCategoryChartCardValue(data)) {
    return data.x_axis === 'date' || data.x_axis === null
  }
  return true
}

export const getDualCategoryChartsResponseData = async (
  data: DualCategoryChartCardValue,
  selectedSize: ChartSizes[number],
  areaType: string | null,
  areaName: string | null
) => {
  return await getDualCategoryCharts({
    chart_type: data.chart_type,
    static_fields: {
      ...data.static_fields,
      geography_type: areaType ?? data.static_fields.geography_type,
      geography: areaName ?? data.static_fields.geography,
    },
    primary_field_values: data.primary_field_values,
    secondary_category: data.secondary_category,
    segments: data.segments.map(({ value }) => value),
    x_axis: data.x_axis,
    y_axis: data.y_axis,
    x_axis_title: data.x_axis_title,
    y_axis_title: data.y_axis_title,
    y_axis_minimum_value: data.y_axis_minimum_value,
    y_axis_maximum_value: data.y_axis_maximum_value,
    chart_width: chartSizes[selectedSize.size].width,
    chart_height: chartSizes[selectedSize.size].height,
  })
}

// TODO: Sort out types
export const getSingleCategoryChartsResponseData = async (
  plots: Array<any>,
  data: SingleCategoryChartCardValue,
  selectedSize: ChartSizes[number],
  isPublic: boolean = true,
  dataClassification?: DataClassification
) => {
  const chartRequestBody = {
    plots,
    x_axis: data.x_axis,
    y_axis: data.y_axis,
    confidence_intervals: data.confidence_intervals,
    confidence_colour: data.confidence_colour,
    x_axis_title: data?.x_axis_title || '',
    y_axis_title: data?.y_axis_title || '',
    y_axis_maximum_value: data?.y_axis_maximum_value || null,
    y_axis_minimum_value: data?.y_axis_minimum_value || null,
    is_public: isPublic,
    data_classification: dataClassification,
  }

  // Make single chart request with selected size
  const chartResponse = await getCharts({
    ...chartRequestBody,
    chart_width: chartSizes[selectedSize.size].width,
    chart_height: chartSizes[selectedSize.size].height,
  })

  return chartResponse
}

const filterNarrowSize = { default: true as const, size: 'narrow' as const }

export const getFilteredChartResponseData = async (
  data: ChartComponentData,
  filter: string,
  lastUpdated: string,
  isPublic: boolean = true,
  dataClassification?: DataClassification
) => {
  if (isDualCategoryChartCardValue(data)) {
    const filteredData = getFilteredDualCategoryData(data, filter, lastUpdated)
    return getDualCategoryChartsResponseData(filteredData, filterNarrowSize, null, null)
  }

  const filteredChart = getFilteredSingleCategoryData(data, filter, lastUpdated)
  if (!filteredChart) return null

  const plots = filteredChart.map((plot) => ({ ...plot.value }))
  return getSingleCategoryChartsResponseData(plots, data, filterNarrowSize, isPublic, dataClassification)
}

// Chooses the correct function to get the data based on the chart type
export const getChartResponseData = async (
  data: ChartComponentData,
  areaType: string | null,
  areaName: string | null,
  sizes: ChartSizes,
  isPublic: boolean = true,
  dataClassification?: DataClassification
) => {
  // Select the default size (mobile-first approach)
  const selectedSize = sizes.slice().sort((a, b) => chartSizes[b.size].width - chartSizes[a.size].width)[0]

  // If the chart is a dual category chart, get the data and return early
  if (isDualCategoryChartCardValue(data)) {
    return await getDualCategoryChartsResponseData(data, selectedSize, areaType, areaName)
  }

  // Otherwise, get plots and return single category chart data
  const plots = data.chart.map((plot) => ({
    ...plot?.value,
    geography_type: areaType ?? plot?.value.geography_type,
    geography: areaName ?? plot?.value.geography,
  }))

  return await getSingleCategoryChartsResponseData(plots, data, selectedSize, isPublic, dataClassification)
}

export const getTimespanFromChartData = (
  data: ChartComponentData,
  lastUpdated: string
): { years: number; months: number } => {
  if (isDualCategoryChartCardValue(data)) {
    return getDualCategoryChartTimespan(data, lastUpdated)
  }
  return getSingleCategoryChartTimespan(data.chart, lastUpdated)
}

export type DualCategoryTableGroup = {
  columns: Array<Column>
  data: Array<Data>
}

export const parseDualCategoryTableData = (response: DualCategoryTableResponse | null): DualCategoryTableGroup[] => {
  if (!response || !response.length) return []

  const labels: string[] = []
  response.forEach((item) => {
    item.values.forEach((value) => {
      if (!labels.includes(value.label)) {
        labels.push(value.label)
      }
    })
  })

  return labels.map((label) => {
    const columns: Array<Column> = [
      { header: 'Reference', accessorKey: 'col-0' },
      { header: label, accessorKey: 'col-1' },
    ]

    const data: Array<Data> = response.map((item) => {
      const match = item.values.find((value) => value.label === label)

      return {
        record: {
          'col-0': item.reference,
          'col-1': match?.value ?? null,
        },
        inReportingDelay: match?.in_reporting_delay_period ?? false,
      }
    })

    return { columns, data }
  })
}

export const dualCategoryChartToDownloadChart = (data: DualCategoryChartCardValue): Chart => [
  {
    id: 'dual-category',
    type: 'plot',
    value: {
      topic: data.static_fields.topic,
      metric: data.static_fields.metric,
      chart_type: data.chart_type,
      stratum: data.static_fields.stratum,
      geography: data.static_fields.geography,
      geography_type: data.static_fields.geography_type,
      sex: data.static_fields.sex,
      age: data.static_fields.age,
      date_from: data.static_fields.date_from,
      date_to: data.static_fields.date_to,
    },
  },
]
