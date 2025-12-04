import { getChartSvg, getChartTimespan, getFilteredData } from './chart.utils'

describe('Get timespan between dates for chart', () => {
  test('return 0 when no plots provided', () => {
    const timespan = getChartTimespan([])
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

    const timespan = getChartTimespan(plots)
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

    const timespan = getChartTimespan(plots)
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

    const timespan = getChartTimespan(plots)
    expect(timespan).toEqual({ years: 2, months: 1 })
  })

  test('when all plots have missing date_to, uses today as date_to', () => {
    const today = new Date()
    const twoYearsAgo = new Date(today)
    twoYearsAgo.setFullYear(today.getFullYear() - 2)

    const plots = [
      {
        type: 'plot' as const,
        id: 'test',
        value: {
          topic: 'test',
          metric: 'test',
          chart_type: 'test',
          date_from: twoYearsAgo.toISOString().split('T')[0],
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
          date_from: twoYearsAgo.toISOString().split('T')[0],
          date_to: null,
        },
      },
    ]

    const timespan = getChartTimespan(plots)
    // Should calculate from two years ago to today (approximately 2 years)
    expect(timespan.years).toBeGreaterThanOrEqual(1)
    expect(timespan.years).toBeLessThanOrEqual(3)
  })

  test('when some plots have date_to and some dont, skips plots without date_to', () => {
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

    const timespan = getChartTimespan(plots)
    // Should only consider plots with date_to, picking the largest (3 years)
    expect(timespan).toEqual({ years: 3, months: 0 })
  })

  test('when plot has date_from but no date_to and others have both, skips the incomplete plot', () => {
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

    const timespan = getChartTimespan(plots)
    // Should only use the plot with both dates (1 year), not default to today for the incomplete one
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

describe('getFilteredData', () => {
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

  test('returns undefined when no timeseriesFilter provided', () => {
    const result = getFilteredData(mockData, '', 'chart1')
    expect(result).toBeUndefined()
  })

  test('returns original data when no matching filter found', () => {
    const result = getFilteredData(mockData, 'other-chart|6-months', 'chart1')
    expect(result).toEqual(mockData.chart)
  })

  test('applies filter and updates date_from for matching chart', () => {
    const result = getFilteredData(mockData, 'chart1|6-months', 'chart1')
    expect(result).toHaveLength(2)
    expect(result?.[0].value.date_from).not.toBe('2023-01-01')
  })

  test('handles "all" filter value', () => {
    const result = getFilteredData(mockData, 'chart1|all', 'chart1')
    expect(result).toHaveLength(2)
    expect(result?.[0].value.date_from).toBe('2023-01-01')
  })
})
