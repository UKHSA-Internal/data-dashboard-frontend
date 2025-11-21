import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import { useGlobalFilters } from '@/app/features/global-filter/context/globalFilterContext'
import {
  mockGeographyFilters,
  mockSelectedThresholds,
  mockSelectedVaccinations,
  mockTimePeriods,
  render,
  screen,
} from '@/config/test-utils'

import SubplotFilterCardContainer from './SubplotFilterCardContainer'

jest.mock('@/app/features/global-filter/context/globalFilterContext', () => ({
  ...jest.requireActual('@/app/features/global-filter/context/globalFilterContext'),
  useGlobalFilters: jest.fn(),
}))

const mockUseGlobalFilters = useGlobalFilters as jest.MockedFunction<typeof useGlobalFilters>

jest.mock('./SubplotFilterCard', () => ({
  __esModule: true,
  default: ({ geography }: { geography: GeographiesSchemaObject }) => (
    <div data-testid={`subplot-filter-card-${geography.geography_code}`}>{geography.name}</div>
  ),
}))

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

const mockCoverageTemplateData = {
  title_prefix: 'Coverage',
  legend_title: 'Coverage %',
  target_threshold: 95,
  target_threshold_label: 'Target',
  about: 'About coverage data',
}

describe('SubplotFilterCardContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    console.error = jest.fn()
  })

  test('renders SubplotFilterCard when data is available', () => {
    mockUseGlobalFilters.mockReturnValue({
      state: {
        timePeriods: mockTimePeriods,
        geographyFilters: mockGeographyFilters,
        thresholdFilters: { label: 'Thresholds', thresholds: mockSelectedThresholds },
        dataFilters: { data_filters: mockSelectedVaccinations, label: 'Vaccinations', categories_to_group_by: [] },
        coverageTemplateData: mockCoverageTemplateData,
        timeseriesTemplateData: { title_prefix: 'Timeseries', legend_title: 'Legend' },
        timePeriodTitle: 'Year selection',
        chartRequestErrors: [],
        selectedVaccinationFilters: mockSelectedVaccinations,
        selectedGeographyFilters: mockSelectedGeographies,
        selectedThresholdFilters: mockSelectedThresholds,
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

    render(<SubplotFilterCardContainer />)

    expect(screen.getByTestId('subplot-filter-card-E92000001')).toBeInTheDocument()
    expect(screen.getByTestId('subplot-filter-card-W92000004')).toBeInTheDocument()
    expect(screen.getByText('England')).toBeInTheDocument()
    expect(screen.getByText('Wales')).toBeInTheDocument()
  })

  test('renders info message when no geography filters selected', () => {
    mockUseGlobalFilters.mockReturnValue({
      state: {
        timePeriods: mockTimePeriods,
        geographyFilters: mockGeographyFilters,
        thresholdFilters: { label: 'Thresholds', thresholds: mockSelectedThresholds },
        dataFilters: { data_filters: mockSelectedVaccinations, label: 'Vaccinations', categories_to_group_by: [] },
        coverageTemplateData: mockCoverageTemplateData,
        timeseriesTemplateData: { title_prefix: 'Timeseries', legend_title: 'Legend' },
        timePeriodTitle: 'Year selection',
        chartRequestErrors: [],
        selectedVaccinationFilters: mockSelectedVaccinations,
        selectedGeographyFilters: [],
        selectedThresholdFilters: mockSelectedThresholds,
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

    render(<SubplotFilterCardContainer />)

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
        geographyFilters: mockGeographyFilters,
        thresholdFilters: { label: 'Thresholds', thresholds: mockSelectedThresholds },
        dataFilters: { data_filters: [], label: 'Vaccinations', categories_to_group_by: [] },
        coverageTemplateData: mockCoverageTemplateData,
        timeseriesTemplateData: { title_prefix: 'Timeseries', legend_title: 'Legend' },
        timePeriodTitle: 'Year selection',
        chartRequestErrors: [],
        selectedVaccinationFilters: [],
        selectedGeographyFilters: mockSelectedGeographies,
        selectedThresholdFilters: mockSelectedThresholds,
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

    render(<SubplotFilterCardContainer />)

    expect(screen.getByTestId('client-info-card-info')).toBeInTheDocument()
    expect(screen.getByText('Chart selection required')).toBeInTheDocument()
  })

  test('renders info message when both filters are empty', () => {
    mockUseGlobalFilters.mockReturnValue({
      state: {
        timePeriods: mockTimePeriods,
        geographyFilters: mockGeographyFilters,
        thresholdFilters: { label: 'Thresholds', thresholds: mockSelectedThresholds },
        dataFilters: { data_filters: [], label: 'Vaccinations', categories_to_group_by: [] },
        coverageTemplateData: mockCoverageTemplateData,
        timeseriesTemplateData: { title_prefix: 'Timeseries', legend_title: 'Legend' },
        timePeriodTitle: 'Year selection',
        chartRequestErrors: [],
        selectedVaccinationFilters: [],
        selectedGeographyFilters: [],
        selectedThresholdFilters: mockSelectedThresholds,
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

    render(<SubplotFilterCardContainer />)

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
        geographyFilters: mockGeographyFilters,
        thresholdFilters: { label: 'Thresholds', thresholds: mockSelectedThresholds },
        dataFilters: { data_filters: mockSelectedVaccinations, label: 'Vaccinations', categories_to_group_by: [] },
        coverageTemplateData: mockCoverageTemplateData,
        timeseriesTemplateData: { title_prefix: 'Timeseries', legend_title: 'Legend' },
        timePeriodTitle: 'Year selection',
        chartRequestErrors: [],
        selectedVaccinationFilters: mockSelectedVaccinations,
        selectedGeographyFilters: multipleGeographies,
        selectedThresholdFilters: mockSelectedThresholds,
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

    render(<SubplotFilterCardContainer />)

    expect(screen.getByTestId('subplot-filter-card-E92000001')).toBeInTheDocument()
    expect(screen.getByTestId('subplot-filter-card-W92000004')).toBeInTheDocument()
    expect(screen.getByTestId('subplot-filter-card-S92000003')).toBeInTheDocument()
  })
})
