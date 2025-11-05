import '@testing-library/jest-dom'

import React from 'react'

import { DataFilters, ThresholdFilters } from '@/api/models/cms/Page/GlobalFilter'
import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import { MultiselectDropdown } from '@/app/components/ui/ukhsa/MultiselectDropdown/MultiselectDropdown'
import { useDataFilters, useGeographyState, useThresholdFilters } from '@/app/hooks/globalFilterHooks'
import { getGroupedVaccinationOptions } from '@/app/utils/global-filter-content-parser'
import { render, screen } from '@/config/test-utils'

import FilterDropdowns, { DisplayVaccinationDropDown } from './FilterDropdowns'

// Mock all dependencies
jest.mock('@/app/hooks/globalFilterHooks')
jest.mock('@/app/utils/global-filter-content-parser')
jest.mock('@/app/components/ui/ukhsa/MultiselectDropdown/MultiselectDropdown', () => ({
  MultiselectDropdown: jest.fn(({ name, nestedMultiselect }) => (
    <div data-testid={`multiselect-${name}`} data-nested={nestedMultiselect}>
      Mock MultiselectDropdown - {name}
    </div>
  )),
}))

const mockUseGeographyState = useGeographyState as jest.MockedFunction<typeof useGeographyState>
const mockUseDataFilters = useDataFilters as jest.MockedFunction<typeof useDataFilters>
const mockUseThresholdFilters = useThresholdFilters as jest.MockedFunction<typeof useThresholdFilters>
const mockGetGroupedVaccinationOptions = getGroupedVaccinationOptions as jest.MockedFunction<
  typeof getGroupedVaccinationOptions
>
const mockMultiselectDropdown = MultiselectDropdown as jest.MockedFunction<typeof MultiselectDropdown>

describe('FilterDropdowns', () => {
  // Mock data that matches the actual types
  const mockGeographiesSchemaObject: GeographiesSchemaObject = {
    name: 'Greater Manchester',
    geography_code: 'E11000001',
    geography_type: 'Upper Tier Local Authority',
    relationships: [
      {
        name: 'North West',
        geography_code: 'E12000002',
        geography_type: 'Region',
      },
      {
        name: 'England',
        geography_code: 'E92000001',
        geography_type: 'Nation',
      },
    ],
  }

  const mockDataFilters: DataFilters = {
    label: 'Vaccination Data',
    data_filters: [
      {
        type: 'data_filter',
        value: {
          label: 'MMR Coverage',
          colour: '#FF0000',
          parameters: {
            theme: { label: 'Immunisation', value: 'immunisation' },
            sub_theme: { label: 'Childhood Vaccines', value: 'childhood_vaccines' },
            topic: { label: 'MMR', value: 'mmr' },
            stratum: { label: '24 months', value: '24m' },
            metric: { label: 'Coverage', value: 'coverage' },
            age: { label: 'All ages', value: 'all' },
            sex: { label: 'All sexes', value: 'all' },
          },
          accompanying_points: [
            {
              type: 'accompanying_point',
              value: {
                label_prefix: 'Target',
                label_suffix: '95%',
                parameters: [
                  {
                    type: 'threshold',
                    value: { label: 'Target threshold', value: '95' },
                    id: 'target_95',
                  },
                ],
              },
              id: 'accomp_1',
            },
          ],
        },
        id: 'mmr_coverage',
      },
    ],
    categories_to_group_by: [
      {
        type: 'category',
        value: {
          data_category: 'vaccine_type',
        },
        id: 'vaccine_category',
      },
    ],
  }

  const mockThresholdFilters: ThresholdFilters = {
    label: 'Coverage Thresholds',
    thresholds: [
      {
        type: 'threshold',
        value: {
          label: '95% Coverage',
          colour: '#00FF00',
          boundary_minimum_value: 95,
          boundary_maximum_value: 100,
        },
        id: 'threshold_95',
      },
      {
        type: 'threshold',
        value: {
          label: '90% Coverage',
          colour: '#FFFF00',
          boundary_minimum_value: 90,
          boundary_maximum_value: 95,
        },
        id: 'threshold_90',
      },
    ],
  }

  const mockGroupedOptions = [
    {
      title: 'Year 2 (24 Months)',
      children: [
        { id: 'vaccine.mmr', label: 'MMR' },
        { id: 'vaccine.dtap', label: 'DTaP' },
      ],
    },
    {
      title: 'Year 1 (12 months)',
      children: [
        { id: 'vaccine.flu', label: 'Influenza' },
        { id: 'vaccine.covid', label: 'COVID-19' },
      ],
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render main container with correct structure and headings', () => {
    // Mock all hooks to return valid data
    mockUseGeographyState.mockReturnValue({
      geographyAreas: new Map([['regions', [mockGeographiesSchemaObject]]]),
      geographyAreasError: null,
      geographyAreasLoading: false,
    })

    mockUseDataFilters.mockReturnValue(mockDataFilters)
    mockUseThresholdFilters.mockReturnValue(mockThresholdFilters)
    mockGetGroupedVaccinationOptions.mockReturnValue(mockGroupedOptions)

    render(<FilterDropdowns />)

    expect(screen.getByText('Area')).toBeInTheDocument()
    expect(screen.getByText('Vaccination and Coverage')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Area' })).toHaveClass('govuk-heading-s')
    expect(screen.getByRole('heading', { name: 'Vaccination and Coverage' })).toHaveClass('govuk-heading-s')
  })
})

describe('DisplayGeographyDropdowns', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should display loading state when geography areas are loading', () => {
    mockUseGeographyState.mockReturnValue({
      geographyAreas: new Map(),
      geographyAreasError: null,
      geographyAreasLoading: true,
    })

    mockUseDataFilters.mockReturnValue(null)
    mockUseThresholdFilters.mockReturnValue(null)

    render(<FilterDropdowns />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('should display error message when geography areas have error', () => {
    const errorMessage = 'Failed to load geography areas'
    mockUseGeographyState.mockReturnValue({
      geographyAreas: new Map(),
      geographyAreasError: errorMessage,
      geographyAreasLoading: false,
    })

    mockUseDataFilters.mockReturnValue(null)
    mockUseThresholdFilters.mockReturnValue(null)

    render(<FilterDropdowns />)

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument()
  })

  test('should display no geography areas message when geography areas is empty', () => {
    mockUseGeographyState.mockReturnValue({
      geographyAreas: new Map(),
      geographyAreasError: null,
      geographyAreasLoading: false,
    })

    mockUseDataFilters.mockReturnValue(null)
    mockUseThresholdFilters.mockReturnValue(null)

    render(<FilterDropdowns />)

    expect(screen.getByText('No geography areas available')).toBeInTheDocument()
  })

  test('should render geography dropdowns when data is available', () => {
    const mockGeographyAreas = new Map([
      [
        'regions',
        [
          {
            name: 'North West',
            geography_code: 'E12000002',
            geography_type: 'Region',
            relationships: null,
          },
          {
            name: 'South East',
            geography_code: 'E12000008',
            geography_type: 'Region',
            relationships: null,
          },
        ] as GeographiesSchemaObject[],
      ],
      [
        'nations',
        [
          {
            name: 'England',
            geography_code: 'E92000001',
            geography_type: 'Nation',
            relationships: null,
          },
          {
            name: 'Scotland',
            geography_code: 'S92000003',
            geography_type: 'Nation',
            relationships: null,
          },
        ] as GeographiesSchemaObject[],
      ],
    ])

    mockUseGeographyState.mockReturnValue({
      geographyAreas: mockGeographyAreas,
      geographyAreasError: null,
      geographyAreasLoading: false,
    })

    mockUseDataFilters.mockReturnValue(null)
    mockUseThresholdFilters.mockReturnValue(null)

    render(<FilterDropdowns />)

    expect(screen.getByTestId('multiselect-regions')).toBeInTheDocument()
    expect(screen.getByTestId('multiselect-nations')).toBeInTheDocument()
  })

  test('should pass correctly formatted data to MultiselectDropdown for geography', () => {
    const mockGeographyAreas = new Map([
      [
        'regions',
        [
          {
            name: 'North West',
            geography_code: 'E12000002',
            geography_type: 'Region',
            relationships: null,
          },
        ] as GeographiesSchemaObject[],
      ],
    ])

    mockUseGeographyState.mockReturnValue({
      geographyAreas: mockGeographyAreas,
      geographyAreasError: null,
      geographyAreasLoading: false,
    })

    mockUseDataFilters.mockReturnValue(null)
    mockUseThresholdFilters.mockReturnValue(null)

    render(<FilterDropdowns />)

    expect(mockMultiselectDropdown).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'regions',
        data: [{ id: 'geography.regions.E12000002', label: 'North West' }],
      }),
      undefined
    )
  })

  test('should handle geography objects with optional fields', () => {
    const mockGeographyWithOptionalFields: GeographiesSchemaObject = {
      name: 'Test Area',
      geography_code: undefined, // Optional field
      geography_type: null, // Nullable field
      relationships: null, // Nullable field
    }

    const mockGeographyAreas = new Map([['test_areas', [mockGeographyWithOptionalFields]]])

    mockUseGeographyState.mockReturnValue({
      geographyAreas: mockGeographyAreas,
      geographyAreasError: null,
      geographyAreasLoading: false,
    })

    mockUseDataFilters.mockReturnValue(null)
    mockUseThresholdFilters.mockReturnValue(null)

    render(<FilterDropdowns />)

    expect(mockMultiselectDropdown).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'test_areas',
        data: [{ id: 'geography.test_areas.undefined', label: 'Test Area' }],
      }),
      undefined
    )
  })
})

describe('DisplayCoverageDropdown', () => {
  const mockThresholdFilters: ThresholdFilters = {
    label: 'Coverage Thresholds',
    thresholds: [
      {
        type: 'threshold',
        value: {
          label: '95% Coverage',
          colour: '#00FF00',
          boundary_minimum_value: 95,
          boundary_maximum_value: 100,
        },
        id: 'threshold_95',
      },
      {
        type: 'threshold',
        value: {
          label: '90% Coverage',
          colour: '#FFFF00',
          boundary_minimum_value: 90,
          boundary_maximum_value: 95,
        },
        id: 'threshold_90',
      },
    ],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return null when threshold filters is null', () => {
    mockUseGeographyState.mockReturnValue({
      geographyAreas: new Map(),
      geographyAreasError: null,
      geographyAreasLoading: false,
    })

    mockUseDataFilters.mockReturnValue(null)
    mockUseThresholdFilters.mockReturnValue(null)

    render(<FilterDropdowns />)

    expect(screen.queryByTestId('multiselect-Select level of coverage %')).not.toBeInTheDocument()
  })

  test('should render coverage dropdown when threshold filters are available', () => {
    mockUseGeographyState.mockReturnValue({
      geographyAreas: new Map(),
      geographyAreasError: null,
      geographyAreasLoading: false,
    })

    mockUseDataFilters.mockReturnValue(null)
    mockUseThresholdFilters.mockReturnValue(mockThresholdFilters)

    render(<FilterDropdowns />)

    expect(screen.getByTestId('multiselect-Select level of coverage %')).toBeInTheDocument()
  })

  test('should pass correctly formatted data to MultiselectDropdown for coverage', () => {
    mockUseGeographyState.mockReturnValue({
      geographyAreas: new Map(),
      geographyAreasError: null,
      geographyAreasLoading: false,
    })

    mockUseDataFilters.mockReturnValue(null)
    mockUseThresholdFilters.mockReturnValue(mockThresholdFilters)

    render(<FilterDropdowns />)

    expect(mockMultiselectDropdown).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Select level of coverage %',
        data: [
          { id: 'threshold.threshold_95', label: '95% Coverage' },
          { id: 'threshold.threshold_90', label: '90% Coverage' },
        ],
      }),
      undefined
    )
  })
})

describe('DisplayVaccinationDropDown', () => {
  const mockDataFilters: DataFilters = {
    label: 'Vaccination Data',
    data_filters: [
      {
        type: 'data_filter',
        value: {
          label: 'MMR Coverage',
          colour: '#FF0000',
          parameters: {
            theme: { label: 'Immunisation', value: 'immunisation' },
            sub_theme: { label: 'Childhood Vaccines', value: 'childhood_vaccines' },
            topic: { label: 'MMR', value: 'mmr' },
            stratum: { label: '24 months', value: '24m' },
            metric: { label: 'Coverage', value: 'coverage' },
            age: { label: 'All ages', value: 'all' },
            sex: { label: 'All sexes', value: 'all' },
          },
          accompanying_points: [],
        },
        id: 'mmr_coverage',
      },
    ],
    categories_to_group_by: [
      {
        type: 'category',
        value: {
          data_category: 'vaccine_type',
        },
        id: 'vaccine_category',
      },
    ],
  }

  const mockGroupedOptions = [
    {
      title: 'Childhood Vaccines',
      children: [
        { id: 'vaccine.mmr', label: 'MMR' },
        { id: 'vaccine.dtap', label: 'DTaP' },
      ],
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return null when vaccination filters is null', () => {
    mockUseDataFilters.mockReturnValue(null)

    const { container } = render(<DisplayVaccinationDropDown />)

    expect(container.firstChild).toBeNull()
  })

  test('should return null when grouped vaccination options is null', () => {
    mockUseDataFilters.mockReturnValue(mockDataFilters)
    mockGetGroupedVaccinationOptions.mockReturnValue(null)

    const { container } = render(<DisplayVaccinationDropDown />)

    expect(container.firstChild).toBeNull()
  })

  test('should render vaccination dropdown when data is available', () => {
    mockUseDataFilters.mockReturnValue(mockDataFilters)
    mockGetGroupedVaccinationOptions.mockReturnValue(mockGroupedOptions)

    render(<DisplayVaccinationDropDown />)

    expect(screen.getByTestId('multiselect-Vaccination Data')).toBeInTheDocument()
  })

  test('should pass correct props to MultiselectDropdown for vaccination', () => {
    mockUseDataFilters.mockReturnValue(mockDataFilters)
    mockGetGroupedVaccinationOptions.mockReturnValue(mockGroupedOptions)

    render(<DisplayVaccinationDropDown />)

    expect(mockMultiselectDropdown).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Vaccination Data',
        data: mockGroupedOptions,
        nestedMultiselect: true,
      }),
      undefined
    )
  })

  test('should call getGroupedVaccinationOptions with correct parameters', () => {
    mockUseDataFilters.mockReturnValue(mockDataFilters)
    mockGetGroupedVaccinationOptions.mockReturnValue(mockGroupedOptions)

    render(<DisplayVaccinationDropDown />)

    expect(mockGetGroupedVaccinationOptions).toHaveBeenCalledWith(mockDataFilters)
  })
})

describe('FilterDropdowns integration', () => {
  const mockGeographiesSchemaObject: GeographiesSchemaObject = {
    name: 'North West',
    geography_code: 'E12000002',
    geography_type: 'Region',
    relationships: null,
  }

  const mockDataFilters: DataFilters = {
    label: 'Vaccination Type',
    data_filters: [],
    categories_to_group_by: [],
  }

  const mockThresholdFilters: ThresholdFilters = {
    label: 'Coverage Thresholds',
    thresholds: [
      {
        type: 'threshold',
        value: {
          label: '95% Coverage',
          colour: '#00FF00',
          boundary_minimum_value: 95,
          boundary_maximum_value: 100,
        },
        id: 'threshold_95',
      },
    ],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render all components together when all data is available', () => {
    const mockGeographyAreas = new Map([['regions', [mockGeographiesSchemaObject]]])

    mockUseGeographyState.mockReturnValue({
      geographyAreas: mockGeographyAreas,
      geographyAreasError: null,
      geographyAreasLoading: false,
    })

    mockUseDataFilters.mockReturnValue(mockDataFilters)
    mockUseThresholdFilters.mockReturnValue(mockThresholdFilters)
    mockGetGroupedVaccinationOptions.mockReturnValue([{ title: 'Group 1', children: [{ id: '1', label: 'Option 1' }] }])

    render(<FilterDropdowns />)

    expect(screen.getByTestId('multiselect-regions')).toBeInTheDocument()
    expect(screen.getByTestId('multiselect-Vaccination Type')).toBeInTheDocument()
    expect(screen.getByTestId('multiselect-Select level of coverage %')).toBeInTheDocument()
    expect(screen.getByText('Area')).toBeInTheDocument()
    expect(screen.getByText('Vaccination and Coverage')).toBeInTheDocument()
  })

  test('should handle partial data availability gracefully', () => {
    mockUseGeographyState.mockReturnValue({
      geographyAreas: new Map([['regions', [mockGeographiesSchemaObject]]]),
      geographyAreasError: null,
      geographyAreasLoading: false,
    })

    mockUseDataFilters.mockReturnValue(null) // No vaccination filters
    mockUseThresholdFilters.mockReturnValue(null) // No threshold filters

    render(<FilterDropdowns />)

    expect(screen.getByTestId('multiselect-regions')).toBeInTheDocument()
    expect(screen.queryByTestId('multiselect-Vaccination Type')).not.toBeInTheDocument()
    expect(screen.queryByTestId('multiselect-Select level of coverage %')).not.toBeInTheDocument()
  })
})
