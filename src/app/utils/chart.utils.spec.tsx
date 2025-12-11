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

  test('applies year filter and updates date_from', () => {
    const result = getFilteredData(mockData, 'chart1|1-year', 'chart1')
    expect(result).toHaveLength(2)
    expect(result?.[0].value.date_from).toBe('2023-01-01')
    expect(result?.[1].value.date_from).toBe('2023-01-01')
  })

  test('applies years filter and updates date_from', () => {
    const result = getFilteredData(mockData, 'chart1|2-years', 'chart1')
    expect(result).toHaveLength(2)
    expect(result?.[0].value.date_from).toBe('2022-01-01')
    expect(result?.[1].value.date_from).toBe('2022-01-01')
  })

  test('throws error for unsupported subtraction unit', () => {
    expect(() => getFilteredData(mockData, 'chart1|5-days', 'chart1')).toThrow('Unsupported subtraction unit')
  })

  test('handles case-insensitive chartId matching', () => {
    const result = getFilteredData(mockData, 'CHART1|6-months', 'chart1')
    expect(result).toHaveLength(2)
    expect(result?.[0].value.date_from).not.toBe('2023-01-01')
  })

  test('handles case-insensitive chartId matching with uppercase filter', () => {
    const result = getFilteredData(mockData, 'chart1|6-months', 'CHART1')
    expect(result).toHaveLength(2)
    expect(result?.[0].value.date_from).not.toBe('2023-01-01')
  })

  test('applies month filter (singular) and updates date_from', () => {
    const result = getFilteredData(mockData, 'chart1|1-month', 'chart1')
    expect(result).toHaveLength(2)
    // Should subtract 1 month from date_to (2024-01-01) = 2023-12-01
    expect(result?.[0].value.date_from).toBe('2023-12-01')
  })

  test('applies months filter (plural) and updates date_from', () => {
    const result = getFilteredData(mockData, 'chart1|3-months', 'chart1')
    expect(result).toHaveLength(2)
    // Should subtract 3 months from date_to (2024-01-01) = 2023-10-01
    expect(result?.[0].value.date_from).toBe('2023-10-01')
  })

  test('applies year filter (singular) and updates date_from', () => {
    const result = getFilteredData(mockData, 'chart1|1-year', 'chart1')
    expect(result).toHaveLength(2)
    // Should subtract 1 year from date_to (2024-01-01) = 2023-01-01
    expect(result?.[0].value.date_from).toBe('2023-01-01')
  })

  test('handles multiple filters in timeseriesFilter string', () => {
    const result = getFilteredData(mockData, 'chart1|6-months;chart2|1-year', 'chart1')
    expect(result).toHaveLength(2)
    // chart1 should have 6-months filter applied - the filter matches chartId, so ALL plots get updated
    expect(result?.[0].value.date_from).not.toBe('2023-01-01')
    // chart2 also gets updated because the filter matches chartId
    expect(result?.[1].value.date_from).not.toBe('2023-01-01')
  })

  test('handles filter with no value (empty filterValue)', () => {
    // Empty filterValue will cause subtractFromDate to fail when splitting
    expect(() => getFilteredData(mockData, 'chart1|', 'chart1')).toThrow('Unsupported subtraction unit')
  })

  test('handles filter with malformed format', () => {
    // Should throw error for unsupported unit
    expect(() => getFilteredData(mockData, 'chart1|invalid-format', 'chart1')).toThrow('Unsupported subtraction unit')
  })
})
