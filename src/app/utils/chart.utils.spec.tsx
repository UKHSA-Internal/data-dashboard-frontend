import { DualCategoryChartCardValue, SingleCategoryChartCardValue } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { getDualCategoryCharts } from '@/api/requests/charts/getDualCategoryCharts'

import { ChartSizes } from '../components/ui/ukhsa/Chart/Chart'
import {
  getChartResponseData,
  getChartSvg,
  getDualCategoryChartsResponseData,
  getFilteredSingleCategoryData,
  getSingleCategoryChartsResponseData,
  getSingleCategoryChartTimespan,
  parseDualCategoryTableData,
} from './chart.utils'

jest.mock('@/api/requests/charts/getCharts')
jest.mock('@/api/requests/charts/getDualCategoryCharts')

const getChartsMock = jest.mocked(getCharts)
const getDualCategoryChartsMock = jest.mocked(getDualCategoryCharts)

const mockChartResponse = {
  success: true,
  data: {
    chart: 'mock-chart',
    alt_text: '',
    last_updated: '2025-05-21',
    figure: { data: [], layout: {} },
  },
} as Awaited<ReturnType<typeof getCharts>>

describe('Get timespan between dates for chart', () => {
  const mockLastUpdated = '2025-05-21'
  test('return 0 when no plots provided', () => {
    const timespan = getSingleCategoryChartTimespan([], mockLastUpdated)
    expect(timespan).toEqual({ years: 0, months: 0 })
  })

  test('return 0 when date_from or date_to missing', () => {
    const plots = [
      {
        type: 'plot' as const,
        id: 'test',
        value: {
          topic: 'test',
          metric: 'test',
          chart_type: 'test',
          date_from: null,
          date_to: null,
        },
      },
    ]

    const timespan = getSingleCategoryChartTimespan(plots, mockLastUpdated)
    expect(timespan).toEqual({ years: 0, months: 0 })
  })

  test('year and month diff for single plot', () => {
    const plots = [
      {
        type: 'plot' as const,
        id: 'test',
        value: {
          topic: 'test',
          metric: 'test',
          chart_type: 'test',
          date_from: '2024-02-01',
          date_to: '2025-03-01',
        },
      },
    ]

    const timespan = getSingleCategoryChartTimespan(plots, mockLastUpdated)
    expect(timespan).toEqual({ years: 1, months: 1 })
  })

  test('multiple plots with different dates, picks largest', () => {
    const plots = [
      {
        type: 'plot' as const,
        id: 'test',
        value: {
          topic: 'test',
          metric: 'test',
          chart_type: 'test',
          date_from: '2024-02-01',
          date_to: '2025-03-01',
        },
      },
      {
        type: 'plot' as const,
        id: 'test2',
        value: {
          topic: 'test',
          metric: 'test',
          chart_type: 'test',
          date_from: '2023-02-01',
          date_to: '2025-03-01',
        },
      },
    ]

    const timespan = getSingleCategoryChartTimespan(plots, mockLastUpdated)
    expect(timespan).toEqual({ years: 2, months: 1 })
  })

  test('when all plots have missing date_to, uses today as date_to', () => {
    // use the mockLastUpdated as our base date and add 2 years to it to get a mock "today" date
    const mockToday = new Date(mockLastUpdated)
    mockToday.setFullYear(mockToday.getFullYear() + 2)

    const plots = [
      {
        type: 'plot' as const,
        id: 'test',
        value: {
          topic: 'test',
          metric: 'test',
          chart_type: 'test',
          date_from: mockLastUpdated,
          date_to: null,
        },
      },
      {
        type: 'plot' as const,
        id: 'test2',
        value: {
          topic: 'test',
          metric: 'test',
          chart_type: 'test',
          date_from: mockLastUpdated,
          date_to: null,
        },
      },
    ]

    const timespan = getSingleCategoryChartTimespan(plots, mockToday.toString())
    // Should calculate from two years ago to today (approximately 2 years)
    expect(timespan.years).toBeGreaterThanOrEqual(1)
    expect(timespan.years).toBeLessThanOrEqual(3)
  })

  test('when some plots have date_to and some dont, includes open-ended plots capped at lastUpdated', () => {
    const plots = [
      {
        type: 'plot' as const,
        id: 'test',
        value: {
          topic: 'test',
          metric: 'test',
          chart_type: 'test',
          date_from: '2023-01-01',
          date_to: '2024-01-01', // 1 year span
        },
      },
      {
        type: 'plot' as const,
        id: 'test2',
        value: {
          topic: 'test',
          metric: 'test',
          chart_type: 'test',
          date_from: '2022-01-01',
          date_to: null, // Missing date_to - should be skipped
        },
      },
      {
        type: 'plot' as const,
        id: 'test3',
        value: {
          topic: 'test',
          metric: 'test',
          chart_type: 'test',
          date_from: '2022-06-01',
          date_to: '2025-06-01', // 3 year span - largest
        },
      },
    ]

    const timespan = getSingleCategoryChartTimespan(plots, mockLastUpdated)
    // Open-ended plot (test2) should be included and capped at lastUpdated
    // Longest span is from 2022-01-01 to 2025-05-21 = 3 years, 4 months
    expect(timespan).toEqual({ years: 3, months: 4 })
  })

  test('when plot has date_from but no date_to and others have both, open-ended plot counts to lastUpdated', () => {
    const plots = [
      {
        type: 'plot' as const,
        id: 'test',
        value: {
          topic: 'test',
          metric: 'test',
          chart_type: 'test',
          date_from: '2020-01-01',
          date_to: '2021-01-01', // 1 year span
        },
      },
      {
        type: 'plot' as const,
        id: 'test2',
        value: {
          topic: 'test',
          metric: 'test',
          chart_type: 'test',
          date_from: '2022-01-01',
          date_to: null, // Missing date_to - should be skipped
        },
      },
    ]

    const timespan = getSingleCategoryChartTimespan(plots, mockLastUpdated)
    // Open-ended plot (test2) should be included and capped at lastUpdated (3 years, 4 months)
    expect(timespan).toEqual({ years: 3, months: 4 })
  })

  test('when date_to is later than lastUpdated, uses lastUpdated for timespan calculation', () => {
    const lastUpdated = '2023-04-30' // Data only goes up to April 2023
    const plots = [
      {
        type: 'plot' as const,
        id: 'test',
        value: {
          topic: 'test',
          metric: 'test',
          chart_type: 'test',
          date_from: '2022-10-01', // October 2022
          date_to: '2026-01-01', // Future date (2026) - should be ignored
        },
      },
    ]

    const timespan = getSingleCategoryChartTimespan(plots, lastUpdated)
    // Should calculate from Oct 2022 to April 2023 (6 months), not from Oct 2022 to Jan 2026
    expect(timespan).toEqual({ years: 0, months: 6 })
  })

  test('when date_to is earlier than lastUpdated, uses date_to for timespan calculation', () => {
    const lastUpdated = '2025-05-21'
    const plots = [
      {
        type: 'plot' as const,
        id: 'test',
        value: {
          topic: 'test',
          metric: 'test',
          chart_type: 'test',
          date_from: '2023-01-01',
          date_to: '2024-01-01', // Earlier than lastUpdated
        },
      },
    ]

    const timespan = getSingleCategoryChartTimespan(plots, lastUpdated)
    // Should use date_to (2024-01-01) since it's earlier than lastUpdated
    expect(timespan).toEqual({ years: 1, months: 0 })
  })
})

describe('getChartSvg', () => {
  test('decodes and re-encodes SVG string', () => {
    const encodedSvg = 'test%20string%2Bwith%2Bplus'
    const result = getChartSvg(encodedSvg)
    expect(result).toBe('test%20string%2Bwith%2Bplus')
  })

  test('handles plus signs in encoded string', () => {
    const encodedSvg = 'test+string+with+plus'
    const result = getChartSvg(encodedSvg)
    expect(result).toBe('test%20string%20with%20plus')
  })
})

describe('getFilteredSingleCategoryData', () => {
  const mockLastUpdated = '2025-05-21'
  const mockData = {
    title: 'Test Chart',
    tag_manager_event_id: 'test-event',
    x_axis: 'Date',
    y_axis: 'Value',
    sub_title: 'Test Chart',
    topic_page: 'test-page',
    show_timeseries_filter: true,
    chart: [
      {
        id: 'chart1',
        type: 'plot' as const,
        value: {
          topic: 'test',
          metric: 'test',
          chart_type: 'test',
          date_from: '2023-01-01',
          date_to: '2024-01-01',
        },
      },
      {
        id: 'chart2',
        type: 'plot' as const,
        value: {
          topic: 'test',
          metric: 'test',
          chart_type: 'test',
          date_from: '2023-01-01',
          date_to: '2024-01-01',
        },
      },
    ],
  }

  test('returns original data when no filter provided (empty string)', () => {
    const result = getFilteredSingleCategoryData(mockData, '', mockLastUpdated)
    expect(result).toHaveLength(2)
    expect(result?.[0].value.date_from).toBe('2023-01-01')
    expect(result?.[0].value.date_to).toBe('2024-01-01')
  })

  test('applies filter and updates date_from for all plots', () => {
    const result = getFilteredSingleCategoryData(mockData, '6-months', mockLastUpdated)
    expect(result).toHaveLength(2)
    // date_from should be updated to 6 months before date_to
    expect(result?.[0].value.date_from).not.toBe('2023-01-01')
    expect(result?.[0].value.date_to).toBe('2024-01-01')
    expect(result?.[1].value.date_from).not.toBe('2023-01-01')
    expect(result?.[1].value.date_to).toBe('2024-01-01')
  })

  test('handles "all" filter value and restores original dates', () => {
    const result = getFilteredSingleCategoryData(mockData, 'all', mockLastUpdated)
    expect(result).toHaveLength(2)
    expect(result?.[0].value.date_from).toBe('2023-01-01')
    expect(result?.[0].value.date_to).toBe('2024-01-01')
    expect(result?.[1].value.date_from).toBe('2023-01-01')
    expect(result?.[1].value.date_to).toBe('2024-01-01')
  })

  test('applies different filter values correctly', () => {
    const result1Month = getFilteredSingleCategoryData(mockData, '1-month', mockLastUpdated)
    const result3Months = getFilteredSingleCategoryData(mockData, '3-months', mockLastUpdated)

    expect(result1Month).toHaveLength(2)
    expect(result3Months).toHaveLength(2)

    // 1 month should give a different date_from than 3 months
    expect(result1Month?.[0].value.date_from).not.toBe(result3Months?.[0].value.date_from)
  })

  test('applies year filter and updates date_from', () => {
    const result = getFilteredSingleCategoryData(mockData, '1-year', mockLastUpdated)

    expect(result?.[0].value.date_from).toBe('2023-01-01')
    expect(result?.[0].value.date_to).toBe('2024-01-01')
  })

  test('when date_to is missing, uses lastUpdated for filtering', () => {
    const dataWithoutDateTo = {
      ...mockData,
      chart: [
        {
          id: 'chart1',
          type: 'plot' as const,
          value: {
            topic: 'test',
            metric: 'test',
            chart_type: 'test',
            date_from: '2020-01-01',
            date_to: null,
          },
        },
      ],
    }

    const result = getFilteredSingleCategoryData(dataWithoutDateTo, '6-months', mockLastUpdated)

    expect(result?.[0].value.date_from).toBe('2024-11-21')
    expect(result?.[0].value.date_to).toBe('2025-05-21')
  })

  test('when date_to is missing and filter is all, uses lastUpdated as date_to', () => {
    const dataWithoutDateTo = {
      ...mockData,
      chart: [
        {
          id: 'chart1',
          type: 'plot' as const,
          value: {
            topic: 'test',
            metric: 'test',
            chart_type: 'test',
            date_from: '2020-01-01',
            date_to: null,
          },
        },
      ],
    }

    const result = getFilteredSingleCategoryData(dataWithoutDateTo, 'all', mockLastUpdated)

    expect(result?.[0].value.date_from).toBe('2020-01-01')
    expect(result?.[0].value.date_to).toBe('2025-05-21')
  })

  test('throws when filter unit is unsupported', () => {
    expect(() => getFilteredSingleCategoryData(mockData, '1-week', mockLastUpdated)).toThrow(
      'Unsupported subtraction unit'
    )
  })

  test('when date_to is later than lastUpdated, uses lastUpdated for filtering', () => {
    const lastUpdated = '2023-04-30' // Data only goes up to April 2023
    const dataWithFutureDate = {
      ...mockData,
      chart: [
        {
          id: 'chart1',
          type: 'plot' as const,
          value: {
            topic: 'test',
            metric: 'test',
            chart_type: 'test',
            date_from: '2020-01-01', // Original date_from is much earlier
            date_to: '2026-01-01', // Future date - should be ignored, use lastUpdated instead
          },
        },
      ],
    }

    const result = getFilteredSingleCategoryData(dataWithFutureDate, '6-months', lastUpdated)
    // Should calculate 6 months from lastUpdated (2023-04-30), not from 2026-01-01
    // 6 months before 2023-04-30 is 2022-10-30
    expect(result?.[0].value.date_from).toBe('2022-10-30')
    // date_to should be the original value, but filtering calculation should use lastUpdated
    expect(result?.[0].value.date_to).toBe('2026-01-01')
  })

  test('when date_to is earlier than lastUpdated, uses date_to for filtering', () => {
    const lastUpdated = '2025-05-21'
    const dataWithPastDate = {
      ...mockData,
      chart: [
        {
          id: 'chart1',
          type: 'plot' as const,
          value: {
            topic: 'test',
            metric: 'test',
            chart_type: 'test',
            date_from: '2023-01-01',
            date_to: '2024-01-01', // Earlier than lastUpdated
          },
        },
      ],
    }

    const result = getFilteredSingleCategoryData(dataWithPastDate, '6-months', lastUpdated)
    // Should calculate 6 months from date_to (2024-01-01), not from lastUpdated
    // 6 months before 2024-01-01 is 2023-07-01
    expect(result?.[0].value.date_from).toBe('2023-07-01')
    expect(result?.[0].value.date_to).toBe('2024-01-01')
  })
})

describe('getDualCategoryChartsResponseData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    getDualCategoryChartsMock.mockResolvedValue(mockChartResponse)
  })

  const mockData = {
    chart_type: 'stacked_bar',
    static_fields: {
      topic: 'COVID-19',
      metric: 'COVID-19_cases_casesByDay',
      geography_type: 'Nation',
      geography: 'England',
    },
    primary_field_values: ['a', 'b'],
    secondary_category: 'age',
    segments: [{ value: { secondary_field_value: '0-4' } }],
    x_axis: 'date',
    y_axis: 'metric',
    x_axis_title: 'Date',
    y_axis_title: 'Cases',
    y_axis_minimum_value: 0,
    y_axis_maximum_value: 100,
  } as DualCategoryChartCardValue

  const selectedSize = { default: true, size: 'wide' } as const

  test('requests dual category chart with the selected size', async () => {
    await getDualCategoryChartsResponseData(mockData, selectedSize, 'Region', 'London')

    expect(getDualCategoryChartsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        chart_type: 'stacked_bar',
        static_fields: expect.objectContaining({
          geography_type: 'Region',
          geography: 'London',
          topic: 'COVID-19',
          metric: 'COVID-19_cases_casesByDay',
        }),
        segments: [{ secondary_field_value: '0-4' }],
        chart_width: 1100,
        chart_height: 260,
      })
    )
  })
})

describe('getSingleCategoryChartsResponseData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    getChartsMock.mockResolvedValue(mockChartResponse)
  })

  const mockData = {
    x_axis: 'date',
    y_axis: 'metric',
    confidence_intervals: false,
    confidence_colour: null,
  } as SingleCategoryChartCardValue

  const selectedSize = { default: true, size: 'narrow' } as const

  test('requests single category chart with the provided plots and selected size', async () => {
    const plots = [{ topic: 'COVID-19', metric: 'COVID-19_cases_casesByDay' }]

    await getSingleCategoryChartsResponseData(plots, mockData, selectedSize)

    expect(getChartsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        plots,
        x_axis: 'date',
        y_axis: 'metric',
        chart_width: 515,
        chart_height: 260,
      })
    )
  })
})

describe('getChartResponseData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    getChartsMock.mockResolvedValue(mockChartResponse)
    getDualCategoryChartsMock.mockResolvedValue(mockChartResponse)
  })

  const sizes = [{ default: true, size: 'wide' }] as ChartSizes

  test('uses single category request for single category data', async () => {
    const data = {
      x_axis: 'date',
      y_axis: 'metric',
      chart: [{ id: 'chart1', type: 'plot', value: { topic: 'COVID-19', geography: 'England' } }],
    } as SingleCategoryChartCardValue

    await getChartResponseData(data, 'Region', 'London', sizes)

    expect(getChartsMock).toHaveBeenCalledTimes(1)
    expect(getDualCategoryChartsMock).not.toHaveBeenCalled()
    // Area overrides should be applied to the plots
    expect(getChartsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        plots: [expect.objectContaining({ geography_type: 'Region', geography: 'London' })],
      })
    )
  })

  test('uses dual category request for dual category data', async () => {
    const data = {
      chart_type: 'bar',
      static_fields: { topic: 'COVID-19', metric: 'm', geography_type: 'Nation', geography: 'England' },
      primary_field_values: ['a'],
      secondary_category: 'age',
      segments: [{ value: { secondary_field_value: '0-4' } }],
      x_axis: 'date',
      y_axis: 'metric',
    } as DualCategoryChartCardValue

    await getChartResponseData(data, null, null, sizes)

    expect(getDualCategoryChartsMock).toHaveBeenCalledTimes(1)
    expect(getChartsMock).not.toHaveBeenCalled()
  })
})

describe('parseDualCategoryTableData', () => {
  test('returns empty array when response is null', () => {
    expect(parseDualCategoryTableData(null)).toEqual([])
  })

  test('returns empty array when response is empty', () => {
    expect(parseDualCategoryTableData([])).toEqual([])
  })

  test('groups table data by label with columns and rows', () => {
    const response = [
      {
        reference: '2024-01-01',
        values: [
          { label: '0-4', value: 10, in_reporting_delay_period: false },
          { label: '5-9', value: 20, in_reporting_delay_period: true },
        ],
      },
      {
        reference: '2024-01-02',
        values: [
          { label: '0-4', value: 15, in_reporting_delay_period: false },
          { label: '5-9', value: null, in_reporting_delay_period: false },
        ],
      },
    ]

    const groups = parseDualCategoryTableData(response)

    expect(groups).toHaveLength(2)

    expect(groups[0]).toEqual({
      columns: [
        { header: 'Reference', accessorKey: 'col-0' },
        { header: '0-4', accessorKey: 'col-1' },
      ],
      data: [
        {
          record: { 'col-0': '2024-01-01', 'col-1': 10 },
          inReportingDelay: false,
        },
        {
          record: { 'col-0': '2024-01-02', 'col-1': 15 },
          inReportingDelay: false,
        },
      ],
    })

    expect(groups[1]).toEqual({
      columns: [
        { header: 'Reference', accessorKey: 'col-0' },
        { header: '5-9', accessorKey: 'col-1' },
      ],
      data: [
        {
          record: { 'col-0': '2024-01-01', 'col-1': 20 },
          inReportingDelay: true,
        },
        {
          record: { 'col-0': '2024-01-02', 'col-1': null },
          inReportingDelay: false,
        },
      ],
    })
  })

  test('deduplicates labels across response items', () => {
    const response = [
      {
        reference: '2024-01-01',
        values: [
          { label: '0-4', value: 10, in_reporting_delay_period: false },
          { label: '0-4', value: 11, in_reporting_delay_period: false },
        ],
      },
    ]

    const groups = parseDualCategoryTableData(response)

    expect(groups).toHaveLength(1)
    expect(groups[0].columns[1].header).toBe('0-4')
  })
})
