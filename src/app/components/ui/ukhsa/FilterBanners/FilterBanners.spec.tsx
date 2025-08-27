import React from 'react'

import { useSelectedFilters } from '@/app/hooks/globalFilterHooks'
import { render, screen } from '@/config/test-utils'

import FilterBanners from './FilterBanners'

// Mock the useSelectedFilters hook
jest.mock('@/app/hooks/globalFilterHooks', () => ({
  useSelectedFilters: jest.fn(),
}))

const mockUseSelectedFilters = useSelectedFilters as jest.MockedFunction<typeof useSelectedFilters>

describe('FilterBanners', () => {
  const mockUpdateFilters = jest.fn()
  const mockAddFilter = jest.fn()
  const mockRemoveFilter = jest.fn()
  const mockClearFilters = jest.fn()
  const mockAddFilterFromMap = jest.fn()
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()

    // Set up default useSelectedFilters mock
    mockUseSelectedFilters.mockReturnValue({
      selectedFilters: [],
      updateFilters: mockUpdateFilters,
      addFilter: mockAddFilter,
      removeFilter: mockRemoveFilter,
      clearFilters: mockClearFilters,
      addFilterFromMap: mockAddFilterFromMap,
      selectedVaccinationFilters: null,
      selectedGeographyFilters: null,
      selectedThresholdFilters: null,
    })
  })

  it('should not show banner when no filters are selected', () => {
    render(<FilterBanners />)

    expect(screen.queryByText(/Important information/)).not.toBeInTheDocument()
  })

  it('should not show banner when all filter groups have 3 or fewer selections', () => {
    const selectedFilters = [
      { id: 'Country.England', label: 'England' },
      { id: 'Country.Scotland', label: 'Scotland' },
      { id: 'Country.Wales', label: 'Wales' },
      { id: 'Region.London', label: 'London' },
      { id: 'Region.Manchester', label: 'Manchester' },
      { id: 'Local Authority.Westminster', label: 'Westminster' },
    ]

    mockUseSelectedFilters.mockReturnValue({
      selectedFilters,
      updateFilters: mockUpdateFilters,
      addFilter: mockAddFilter,
      removeFilter: mockRemoveFilter,
      clearFilters: mockClearFilters,
      addFilterFromMap: mockAddFilterFromMap,
      selectedVaccinationFilters: null,
      selectedGeographyFilters: null,
      selectedThresholdFilters: null,
    })

    render(<FilterBanners />)

    expect(screen.queryByText(/Important information/)).not.toBeInTheDocument()
  })

  it('should show banner when one geography group has exactly 4 selections', () => {
    const selectedGeographyFilters = [
      {
        name: 'geography1',
        geography_code: 'geography1',
        relationships: [
          {
            name: 'Parent Region',
            geography_code: 'PARENT1',
            geography_type: 'region',
          },
        ],
      },
      {
        name: 'geography2',
        geography_code: 'geography2',
        relationships: [
          {
            name: 'Parent Region',
            geography_code: 'PARENT1',
            geography_type: 'region',
          },
        ],
      },
      {
        name: 'geography3',
        geography_code: 'geography3',
        relationships: [
          {
            name: 'Parent Region',
            geography_code: 'PARENT1',
            geography_type: 'region',
          },
        ],
      },
      {
        name: 'geography4',
        geography_code: 'geography4',
        relationships: [
          {
            name: 'Parent Region',
            geography_code: 'PARENT1',
            geography_type: 'region',
          },
        ],
      },
    ]

    mockUseSelectedFilters.mockReturnValue({
      selectedFilters: [],
      updateFilters: mockUpdateFilters,
      addFilter: mockAddFilter,
      removeFilter: mockRemoveFilter,
      clearFilters: mockClearFilters,
      addFilterFromMap: mockAddFilterFromMap,
      selectedVaccinationFilters: null,
      selectedGeographyFilters: selectedGeographyFilters,
      selectedThresholdFilters: null,
    })

    render(<FilterBanners />)

    expect(screen.getByText(/Important information/)).toBeInTheDocument()
    expect(screen.getByText(/You can only select/)).toBeInTheDocument()
    expect(screen.getByText(/four locations/)).toBeInTheDocument()
    expect(screen.getByText(/display at a time/)).toBeInTheDocument()
  })

  it('should show banner when geography group has more than 4 selections', () => {
    const selectedGeographyFilters = [
      {
        name: 'geography1',
        geography_code: 'geography1',
        relationships: [
          {
            name: 'Parent Region',
            geography_code: 'PARENT1',
            geography_type: 'region',
          },
        ],
      },
      {
        name: 'geography2',
        geography_code: 'geography2',
        relationships: [
          {
            name: 'Parent Region',
            geography_code: 'PARENT1',
            geography_type: 'region',
          },
        ],
      },
      {
        name: 'geography3',
        geography_code: 'geography3',
        relationships: [
          {
            name: 'Parent Region',
            geography_code: 'PARENT1',
            geography_type: 'region',
          },
        ],
      },
      {
        name: 'geography4',
        geography_code: 'geography4',
        relationships: [
          {
            name: 'Parent Region',
            geography_code: 'PARENT1',
            geography_type: 'region',
          },
        ],
      },
    ]

    mockUseSelectedFilters.mockReturnValue({
      selectedFilters: [],
      updateFilters: mockUpdateFilters,
      addFilter: mockAddFilter,
      removeFilter: mockRemoveFilter,
      clearFilters: mockClearFilters,
      addFilterFromMap: mockAddFilterFromMap,
      selectedVaccinationFilters: null,
      selectedGeographyFilters: selectedGeographyFilters,
      selectedThresholdFilters: null,
    })

    render(<FilterBanners />)

    expect(screen.getByText(/Important information/)).toBeInTheDocument()
  })
})
