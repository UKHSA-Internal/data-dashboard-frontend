import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import { useGlobalFilters } from '@/app/features/global-filter/context/globalFilterContext'
import { mockSelectedVaccinations, mockTimePeriods, render, screen } from '@/config/test-utils'

import TimeSeriesFilterCardsContainer from './TimeSeriesFilterCardsContainer'

// Mock useGlobalFilters
jest.mock('@/app/features/global-filter/context/globalFilterContext', () => ({
  ...jest.requireActual('@/app/features/global-filter/context/globalFilterContext'),
  useGlobalFilters: jest.fn(),
}))

const mockUseGlobalFilters = useGlobalFilters as jest.MockedFunction<typeof useGlobalFilters>

// Mock TimeseriesFilterCard
jest.mock('./TimeseriesFilterCard', () => ({
  __esModule: true,
  default: ({ geography }: { geography: GeographiesSchemaObject }) => (
    <div data-testid={`timeseries-filter-card-${geography.name}`}>{geography.name}</div>
  ),
}))

// Mock ClientInformationCard
jest.mock('@/app/components/ui/ukhsa/ClientInformationCard/ClientInformationCard', () => ({
  __esModule: true,
  default: ({ variant, title, message }: any) => (
    <div data-testid={`client-info-card-${variant}`}>
      {title && <h2>{title}</h2>}
      {message && <p>{message}</p>}
    </div>
  ),
}))

const mockSelectedGeographies: GeographiesSchemaObject[] = [
  {
    name: 'England',
    geography_code: 'E92000001',
    geography_type: 'Nation',
    relationships: [],
  },
  {
    name: 'Wales',
    geography_code: 'W92000004',
    geography_type: 'Nation',
    relationships: [],
  },
]

const mockTimeseriesTemplateData = {
  title_prefix: 'Cases',
  legend_title: 'Number of cases',
  about: 'About timeseries data',
}

describe('TimeSeriesFilterCardsContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    console.error = jest.fn()
  })

  test('renders TimeseriesFilterCard when data is available', () => {
    mockUseGlobalFilters.mockReturnValue({
      state: {
        timePeriods: mockTimePeriods,
        geographyFilters: { geography_types: [] },
        thresholdFilters: { label: 'Thresholds', thresholds: [] },
        dataFilters: { data_filters: mockSelectedVaccinations, label: 'Filters', categories_to_group_by: [] },
        coverageTemplateData: { title_prefix: 'Coverage', legend_title: 'Coverage %', target_threshold: 95 },
        timeseriesTemplateData: mockTimeseriesTemplateData,
        timePeriodTitle: 'Year selection',
        chartRequestErrors: [],
        selectedVaccinationFilters: mockSelectedVaccinations,
        selectedGeographyFilters: mockSelectedGeographies,
        selectedThresholdFilters: [],
        selectedTimePeriod: null,
        selectedFilters: [],
        geographyAreas: new Map(),
        geographyAreasLoading: false,
        geographyAreasError: null,
        selectedVaccination: null,
        mapData: null,
        mapDataLoading: false,
        mapDataError: null,
      },
      actions: {} as any,
    })

    render(<TimeSeriesFilterCardsContainer />)

    expect(screen.getByTestId('timeseries-filter-card-England')).toBeInTheDocument()
    expect(screen.getByTestId('timeseries-filter-card-Wales')).toBeInTheDocument()
    expect(screen.getByText('England')).toBeInTheDocument()
    expect(screen.getByText('Wales')).toBeInTheDocument()
  })

  test('renders info message when no geography filters selected', () => {
    mockUseGlobalFilters.mockReturnValue({
      state: {
        timePeriods: mockTimePeriods,
        geographyFilters: { geography_types: [] },
        thresholdFilters: { label: 'Thresholds', thresholds: [] },
        dataFilters: { data_filters: mockSelectedVaccinations, label: 'Filters', categories_to_group_by: [] },
        coverageTemplateData: { title_prefix: 'Coverage', legend_title: 'Coverage %', target_threshold: 95 },
        timeseriesTemplateData: mockTimeseriesTemplateData,
        timePeriodTitle: 'Year selection',
        chartRequestErrors: [],
        selectedVaccinationFilters: mockSelectedVaccinations,
        selectedGeographyFilters: [],
        selectedThresholdFilters: [],
        selectedTimePeriod: null,
        selectedFilters: [],
        geographyAreas: new Map(),
        geographyAreasLoading: false,
        geographyAreasError: null,
        selectedVaccination: null,
        mapData: null,
        mapDataLoading: false,
        mapDataError: null,
      },
      actions: {} as any,
    })

    render(<TimeSeriesFilterCardsContainer />)

    expect(screen.getByTestId('client-info-card-info')).toBeInTheDocument()
    expect(screen.getByText('Chart selection required')).toBeInTheDocument()
    expect(
      screen.getByText('Please make the required selections from the filter to display a chart.')
    ).toBeInTheDocument()
  })

  test('renders info message when no vaccination filters selected', () => {
    mockUseGlobalFilters.mockReturnValue({
      state: {
        timePeriods: mockTimePeriods,
        geographyFilters: { geography_types: [] },
        thresholdFilters: { label: 'Thresholds', thresholds: [] },
        dataFilters: { data_filters: [], label: 'Filters', categories_to_group_by: [] },
        coverageTemplateData: { title_prefix: 'Coverage', legend_title: 'Coverage %', target_threshold: 95 },
        timeseriesTemplateData: mockTimeseriesTemplateData,
        timePeriodTitle: 'Year selection',
        chartRequestErrors: [],
        selectedVaccinationFilters: [],
        selectedGeographyFilters: mockSelectedGeographies,
        selectedThresholdFilters: [],
        selectedTimePeriod: null,
        selectedFilters: [],
        geographyAreas: new Map(),
        geographyAreasLoading: false,
        geographyAreasError: null,
        selectedVaccination: null,
        mapData: null,
        mapDataLoading: false,
        mapDataError: null,
      },
      actions: {} as any,
    })

    render(<TimeSeriesFilterCardsContainer />)

    expect(screen.getByTestId('client-info-card-info')).toBeInTheDocument()
    expect(screen.getByText('Chart selection required')).toBeInTheDocument()
  })

  test('renders info message when both filters are empty', () => {
    mockUseGlobalFilters.mockReturnValue({
      state: {
        timePeriods: mockTimePeriods,
        geographyFilters: { geography_types: [] },
        thresholdFilters: { label: 'Thresholds', thresholds: [] },
        dataFilters: { data_filters: [], label: 'Filters', categories_to_group_by: [] },
        coverageTemplateData: { title_prefix: 'Coverage', legend_title: 'Coverage %', target_threshold: 95 },
        timeseriesTemplateData: mockTimeseriesTemplateData,
        timePeriodTitle: 'Year selection',
        chartRequestErrors: [],
        selectedVaccinationFilters: [],
        selectedGeographyFilters: [],
        selectedThresholdFilters: [],
        selectedTimePeriod: null,
        selectedFilters: [],
        geographyAreas: new Map(),
        geographyAreasLoading: false,
        geographyAreasError: null,
        selectedVaccination: null,
        mapData: null,
        mapDataLoading: false,
        mapDataError: null,
      },
      actions: {} as any,
    })

    render(<TimeSeriesFilterCardsContainer />)

    expect(screen.getByTestId('client-info-card-info')).toBeInTheDocument()
  })

  test('maps over multiple geographies correctly', () => {
    const multipleGeographies: GeographiesSchemaObject[] = [
      ...mockSelectedGeographies,
      {
        name: 'Scotland',
        geography_code: 'S92000003',
        geography_type: 'Nation',
        relationships: [],
      },
    ]

    mockUseGlobalFilters.mockReturnValue({
      state: {
        timePeriods: mockTimePeriods,
        geographyFilters: { geography_types: [] },
        thresholdFilters: { label: 'Thresholds', thresholds: [] },
        dataFilters: { data_filters: mockSelectedVaccinations, label: 'Filters', categories_to_group_by: [] },
        coverageTemplateData: { title_prefix: 'Coverage', legend_title: 'Coverage %', target_threshold: 95 },
        timeseriesTemplateData: mockTimeseriesTemplateData,
        timePeriodTitle: 'Year selection',
        chartRequestErrors: [],
        selectedVaccinationFilters: mockSelectedVaccinations,
        selectedGeographyFilters: multipleGeographies,
        selectedThresholdFilters: [],
        selectedTimePeriod: null,
        selectedFilters: [],
        geographyAreas: new Map(),
        geographyAreasLoading: false,
        geographyAreasError: null,
        selectedVaccination: null,
        mapData: null,
        mapDataLoading: false,
        mapDataError: null,
      },
      actions: {} as any,
    })

    render(<TimeSeriesFilterCardsContainer />)

    expect(screen.getByTestId('timeseries-filter-card-England')).toBeInTheDocument()
    expect(screen.getByTestId('timeseries-filter-card-Wales')).toBeInTheDocument()
    expect(screen.getByTestId('timeseries-filter-card-Scotland')).toBeInTheDocument()
  })
})
