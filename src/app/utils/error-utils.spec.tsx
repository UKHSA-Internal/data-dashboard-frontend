import { DataFilter, ThresholdFilter } from '@/api/models/cms/Page/GlobalFilter'

import createChartErrorMessage from './error-utils'

// Mock factory functions (assuming these are available in your test setup)
const createMockParameter = (label: string) => ({
  label,
  value: label.toLowerCase().replace(' ', '_'),
})

const createMockDataFilter = (id: string, label: string = 'Test Data Filter'): DataFilter => ({
  type: 'data_filter',
  id,
  value: {
    label,
    colour: '#FF0000',
    parameters: {
      theme: createMockParameter('Theme'),
      sub_theme: createMockParameter('Sub Theme'),
      topic: createMockParameter('Topic'),
      stratum: createMockParameter('Stratum'),
      metric: createMockParameter('Metric'),
      age: createMockParameter('Age'),
      sex: createMockParameter('Sex'),
    },
    accompanying_points: [
      {
        type: 'accompanying_point',
        value: {
          label_prefix: 'Prefix',
          label_suffix: 'Suffix',
          parameters: [
            {
              type: 'theme',
              value: createMockParameter('Theme Parameter'),
              id: 'theme_param_id',
            },
          ],
        },
        id: `${id}-accompanyingpoint`,
      },
    ],
  },
})

const createMockThresholdFilter = (id: string, label: string = 'Test Threshold'): ThresholdFilter => ({
  type: 'threshold',
  id,
  value: {
    label,
    colour: '#00FF00',
    boundary_minimum_value: 0,
    boundary_maximum_value: 100,
  },
})

describe('error-utils', () => {
  const mockGeographyName = 'Northern Ireland'
  const mockDateFrom = '2024-04-01'
  const mockDateTo = '2025-03-31'

  test('creates error message with both vaccinations and thresholds for subplot chart', () => {
    const selectedVaccinations = [
      createMockDataFilter('vac1', '6-in-1 (1 year)'),
      createMockDataFilter('vac2', 'PCV (1 year)'),
    ]
    const selectedThresholds = [
      createMockThresholdFilter('thresh1', 'Under 80%'),
      createMockThresholdFilter('thresh2', '85-90%'),
    ]

    const result = createChartErrorMessage({
      chartType: 'subplot',
      geographyName: mockGeographyName,
      selectedThresholds,
      selectedVaccinations,
      dateFrom: mockDateFrom,
      dateTo: mockDateTo,
    })

    expect(result).toBe(
      'Failed to retrieve coverage data for: Northern Ireland with selected vaccinations: 6-in-1 (1 year), PCV (1 year) and threshold values: Under 80%, 85-90% for the date range: 2024-04-01 to 2025-03-31'
    )
  })

  test('creates error message with both vaccinations and thresholds for timeseries chart', () => {
    const selectedVaccinations = [createMockDataFilter('vac1', 'MenB (1 year)')]
    const selectedThresholds = [createMockThresholdFilter('thresh1', 'Over 95%')]

    const result = createChartErrorMessage({
      chartType: 'timeseries',
      geographyName: mockGeographyName,
      selectedThresholds,
      selectedVaccinations,
      dateFrom: mockDateFrom,
      dateTo: mockDateTo,
    })

    expect(result).toBe(
      'Failed to retrieve time series data for: Northern Ireland with selected vaccinations: MenB (1 year) and threshold values: Over 95% for the date range: 2024-04-01 to 2025-03-31'
    )
  })

  test('creates error message with only vaccinations when no thresholds selected', () => {
    const selectedVaccinations = [
      createMockDataFilter('vac1', 'Rotavirus (1 year)'),
      createMockDataFilter('vac2', 'MMR (1 year)'),
    ]

    const result = createChartErrorMessage({
      chartType: 'subplot',
      geographyName: 'England',
      selectedThresholds: undefined,
      selectedVaccinations,
      dateFrom: mockDateFrom,
      dateTo: mockDateTo,
    })

    expect(result).toBe(
      'Failed to retrieve coverage data for: England with selected vaccinations: Rotavirus (1 year), MMR (1 year) for the date range: 2024-04-01 to 2025-03-31'
    )
  })

  test('creates error message with only vaccinations when thresholds array is empty', () => {
    const selectedVaccinations = [createMockDataFilter('vac1', 'HPV (12-13 years)')]

    const result = createChartErrorMessage({
      chartType: 'timeseries',
      geographyName: 'Scotland',
      selectedThresholds: [],
      selectedVaccinations,
      dateFrom: mockDateFrom,
      dateTo: mockDateTo,
    })

    expect(result).toBe(
      'Failed to retrieve time series data for: Scotland with selected vaccinations: HPV (12-13 years) for the date range: 2024-04-01 to 2025-03-31'
    )
  })

  test('creates error message with only thresholds when no vaccinations selected', () => {
    const selectedThresholds = [createMockThresholdFilter('thresh1', '90-95%')]

    const result = createChartErrorMessage({
      chartType: 'subplot',
      geographyName: 'Wales',
      selectedThresholds,
      selectedVaccinations: [],
      dateFrom: mockDateFrom,
      dateTo: mockDateTo,
    })

    expect(result).toBe(
      'Failed to retrieve coverage data for: Wales with threshold values: 90-95% for the date range: 2024-04-01 to 2025-03-31'
    )
  })

  test('creates basic error message when neither vaccinations nor thresholds are selected', () => {
    const result = createChartErrorMessage({
      chartType: 'subplot',
      geographyName: 'Barnet',
      selectedThresholds: undefined,
      selectedVaccinations: [],
      dateFrom: mockDateFrom,
      dateTo: mockDateTo,
    })

    expect(result).toBe('Failed to retrieve coverage data for: Barnet for the date range: 2024-04-01 to 2025-03-31')
  })

  test('handles multiple vaccinations correctly', () => {
    const selectedVaccinations = [
      createMockDataFilter('vac1', '6-in-1 (1 year)'),
      createMockDataFilter('vac2', 'PCV (1 year)'),
      createMockDataFilter('vac3', 'Rotavirus (1 year)'),
      createMockDataFilter('vac4', 'MenB (1 year)'),
    ]

    const result = createChartErrorMessage({
      chartType: 'timeseries',
      geographyName: 'London',
      selectedThresholds: undefined,
      selectedVaccinations,
      dateFrom: mockDateFrom,
      dateTo: mockDateTo,
    })

    expect(result).toBe(
      'Failed to retrieve time series data for: London with selected vaccinations: 6-in-1 (1 year), PCV (1 year), Rotavirus (1 year), MenB (1 year) for the date range: 2024-04-01 to 2025-03-31'
    )
  })

  test('handles multiple thresholds correctly', () => {
    const selectedThresholds = [
      createMockThresholdFilter('thresh1', 'Under 80%'),
      createMockThresholdFilter('thresh2', '80-85%'),
      createMockThresholdFilter('thresh3', '85-90%'),
      createMockThresholdFilter('thresh4', 'Over 90%'),
    ]
    const selectedVaccinations = [createMockDataFilter('vac1', 'DTaP (1 year)')]

    const result = createChartErrorMessage({
      chartType: 'subplot',
      geographyName: 'Manchester',
      selectedThresholds,
      selectedVaccinations,
      dateFrom: mockDateFrom,
      dateTo: mockDateTo,
    })

    expect(result).toBe(
      'Failed to retrieve coverage data for: Manchester with selected vaccinations: DTaP (1 year) and threshold values: Under 80%, 80-85%, 85-90%, Over 90% for the date range: 2024-04-01 to 2025-03-31'
    )
  })

  test('handles different date formats correctly', () => {
    const selectedVaccinations = [createMockDataFilter('vac1', 'Test Vaccination')]

    const result = createChartErrorMessage({
      chartType: 'timeseries',
      geographyName: 'Test Geography',
      selectedThresholds: undefined,
      selectedVaccinations,
      dateFrom: '2023-01-15',
      dateTo: '2023-12-31',
    })

    expect(result).toBe(
      'Failed to retrieve time series data for: Test Geography with selected vaccinations: Test Vaccination for the date range: 2023-01-15 to 2023-12-31'
    )
  })

  test('differentiates between subplot and timeseries chart types correctly', () => {
    const selectedVaccinations = [createMockDataFilter('vac1', 'Test Vaccine')]

    const subplotResult = createChartErrorMessage({
      chartType: 'subplot',
      geographyName: 'Test Area',
      selectedVaccinations,
      dateFrom: mockDateFrom,
      dateTo: mockDateTo,
    })

    const timeseriesResult = createChartErrorMessage({
      chartType: 'timeseries',
      geographyName: 'Test Area',
      selectedVaccinations,
      dateFrom: mockDateFrom,
      dateTo: mockDateTo,
    })

    expect(subplotResult).toContain('coverage data')
    expect(timeseriesResult).toContain('time series data')
  })

  test('handles edge case with single vaccination and single threshold', () => {
    const selectedVaccinations = [createMockDataFilter('vac1', 'Single Vaccine')]
    const selectedThresholds = [createMockThresholdFilter('thresh1', 'Single Threshold')]

    const result = createChartErrorMessage({
      chartType: 'subplot',
      geographyName: 'Single Geography',
      selectedThresholds,
      selectedVaccinations,
      dateFrom: mockDateFrom,
      dateTo: mockDateTo,
    })

    expect(result).toBe(
      'Failed to retrieve coverage data for: Single Geography with selected vaccinations: Single Vaccine and threshold values: Single Threshold for the date range: 2024-04-01 to 2025-03-31'
    )
  })
})
