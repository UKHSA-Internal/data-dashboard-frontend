import { getChartSvg, getChartTimespan, getFilteredData } from './chart.utils'

describe('Get timespan between dates for chart', () => {
  const mockLastUpdated = '2025-05-21'
  test('return 0 when no plots provided', () => {
    const timespan = getChartTimespan([], mockLastUpdated)
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

    const timespan = getChartTimespan(plots, mockLastUpdated)
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

    const timespan = getChartTimespan(plots, mockLastUpdated)
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

    const timespan = getChartTimespan(plots, mockLastUpdated)
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

    const timespan = getChartTimespan(plots, mockLastUpdated)
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

    const timespan = getChartTimespan(plots, mockLastUpdated)
    // Should only consider plots with date_to, picking the largest
    // Plot 3 has date_to '2025-06-01' but lastUpdated is '2025-05-21', so we use lastUpdated
    // Timespan from '2022-06-01' to '2025-05-21' = 2 years, 11 months
    expect(timespan).toEqual({ years: 2, months: 11 })
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

    const timespan = getChartTimespan(plots, mockLastUpdated)
    // Should only use the plot with both dates (1 year), not default to today for the incomplete one
    expect(timespan).toEqual({ years: 1, months: 0 })
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

    const timespan = getChartTimespan(plots, lastUpdated)
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

    const timespan = getChartTimespan(plots, lastUpdated)
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

describe('getFilteredData', () => {
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
    const result = getFilteredData(mockData, '', mockLastUpdated)
    expect(result).toHaveLength(2)
    expect(result?.[0].value.date_from).toBe('2023-01-01')
    expect(result?.[0].value.date_to).toBe('2024-01-01')
  })

  test('applies filter and updates date_from for all plots', () => {
    const result = getFilteredData(mockData, '6-months', mockLastUpdated)
    expect(result).toHaveLength(2)
    // date_from should be updated to 6 months before date_to
    expect(result?.[0].value.date_from).not.toBe('2023-01-01')
    expect(result?.[0].value.date_to).toBe('2024-01-01')
    expect(result?.[1].value.date_from).not.toBe('2023-01-01')
    expect(result?.[1].value.date_to).toBe('2024-01-01')
  })

  test('handles "all" filter value and restores original dates', () => {
    const result = getFilteredData(mockData, 'all', mockLastUpdated)
    expect(result).toHaveLength(2)
    expect(result?.[0].value.date_from).toBe('2023-01-01')
    expect(result?.[0].value.date_to).toBe('2024-01-01')
    expect(result?.[1].value.date_from).toBe('2023-01-01')
    expect(result?.[1].value.date_to).toBe('2024-01-01')
  })

  test('applies different filter values correctly', () => {
    const result1Month = getFilteredData(mockData, '1-month', mockLastUpdated)
    const result3Months = getFilteredData(mockData, '3-months', mockLastUpdated)

    expect(result1Month).toHaveLength(2)
    expect(result3Months).toHaveLength(2)

    // 1 month should give a different date_from than 3 months
    expect(result1Month?.[0].value.date_from).not.toBe(result3Months?.[0].value.date_from)
  })

  test('throws when filter unit is unsupported', () => {
    expect(() => getFilteredData(mockData, '1-week', mockLastUpdated)).toThrow('Unsupported subtraction unit')
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

    const result = getFilteredData(dataWithFutureDate, '6-months', lastUpdated)
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

    const result = getFilteredData(dataWithPastDate, '6-months', lastUpdated)
    // Should calculate 6 months from date_to (2024-01-01), not from lastUpdated
    // 6 months before 2024-01-01 is 2023-07-01
    expect(result?.[0].value.date_from).toBe('2023-07-01')
    expect(result?.[0].value.date_to).toBe('2024-01-01')
  })
})
