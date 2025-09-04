import React from 'react'

import { useErrorData, useSelectedFilters } from '@/app/hooks/globalFilterHooks'
import { render, screen } from '@/config/test-utils'

import FilterBanners from './FilterBanners'

// Mock the hooks
jest.mock('@/app/hooks/globalFilterHooks', () => ({
  useSelectedFilters: jest.fn(),
  useErrorData: jest.fn(),
}))

const mockUseSelectedFilters = useSelectedFilters as jest.MockedFunction<typeof useSelectedFilters>
const mockUseErrorData = useErrorData as jest.MockedFunction<typeof useErrorData>

describe('FilterBanners', () => {
  const mockUpdateFilters = jest.fn()
  const mockAddFilter = jest.fn()
  const mockRemoveFilter = jest.fn()
  const mockClearFilters = jest.fn()
  const mockAddFilterFromMap = jest.fn()
  const mockSetChartRequestErrors = jest.fn()
  const mockClearChartRequestErrors = jest.fn()
  const mockRemoveChartRequestError = jest.fn()

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

    // Set up default useErrorData mock
    mockUseErrorData.mockReturnValue({
      chartRequestErrors: [],
      setChartRequestErrors: mockSetChartRequestErrors,
      clearChartRequestErrors: mockClearChartRequestErrors,
      removeChartRequestError: mockRemoveChartRequestError,
    })
  })

  describe('when no banners should be displayed', () => {
    it('should not render when no filters are selected and no errors', () => {
      render(<FilterBanners />)
      expect(screen.queryByText(/Important information/)).not.toBeInTheDocument()
    })

    it('should not render when geography filters are 3 or fewer, no errors, and no countries selected', () => {
      const selectedGeographyFilters = [
        {
          name: 'geography1',
          geography_code: 'geography1',
          relationships: [],
        },
        {
          name: 'geography2',
          geography_code: 'geography2',
          relationships: [],
        },
        {
          name: 'geography3',
          geography_code: 'geography3',
          relationships: [],
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

      mockUseErrorData.mockReturnValue({
        chartRequestErrors: [],
        setChartRequestErrors: mockSetChartRequestErrors,
        clearChartRequestErrors: mockClearChartRequestErrors,
        removeChartRequestError: mockRemoveChartRequestError,
      })

      render(<FilterBanners />)
      expect(screen.queryByText(/Important information/)).not.toBeInTheDocument()
    })
  })

  describe('geography limit banner', () => {
    it('should show banner when more than 3 geography filters are selected', () => {
      const selectedGeographyFilters = [
        { name: 'geography1', geography_code: 'geo1', relationships: [] },
        { name: 'geography2', geography_code: 'geo2', relationships: [] },
        { name: 'geography3', geography_code: 'geo3', relationships: [] },
        { name: 'geography4', geography_code: 'geo4', relationships: [] },
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
    })

    it('should show banner when exactly 4 geography filters are selected', () => {
      const selectedGeographyFilters = [
        { name: 'geography1', geography_code: 'geo1', relationships: [] },
        { name: 'geography2', geography_code: 'geo2', relationships: [] },
        { name: 'geography3', geography_code: 'geo3', relationships: [] },
        { name: 'geography4', geography_code: 'geo4', relationships: [] },
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
      expect(screen.getByText(/four locations/)).toBeInTheDocument()
    })
  })

  describe('error banner', () => {
    it('should show error banner when chart request errors exist', () => {
      const chartRequestErrors = [
        {
          id: 'error1',
          error: 'Failed to retrieve data for Northern Ireland',
        },
      ]

      mockUseErrorData.mockReturnValue({
        chartRequestErrors,
        setChartRequestErrors: mockSetChartRequestErrors,
        clearChartRequestErrors: mockClearChartRequestErrors,
        removeChartRequestError: mockRemoveChartRequestError,
      })

      render(<FilterBanners />)

      expect(screen.getByText(/Important information/)).toBeInTheDocument()
      expect(screen.getByText(/Failed to retrieve data for Northern Ireland/)).toBeInTheDocument()
    })

    it('should show multiple errors when multiple chart request errors exist', () => {
      const chartRequestErrors = [
        {
          id: 'error1',
          error: 'Failed to retrieve data for Northern Ireland',
        },
        {
          id: 'error2',
          error: 'Failed to retrieve data for Scotland',
        },
      ]

      mockUseErrorData.mockReturnValue({
        chartRequestErrors,
        setChartRequestErrors: mockSetChartRequestErrors,
        clearChartRequestErrors: mockClearChartRequestErrors,
        removeChartRequestError: mockRemoveChartRequestError,
      })

      render(<FilterBanners />)

      expect(screen.getByText(/Important information/)).toBeInTheDocument()
      expect(screen.getByText(/Failed to retrieve data for Northern Ireland/)).toBeInTheDocument()
      expect(screen.getByText(/Failed to retrieve data for Scotland/)).toBeInTheDocument()
    })

    it('should not show error banner when chartRequestErrors is empty array', () => {
      mockUseErrorData.mockReturnValue({
        chartRequestErrors: [],
        setChartRequestErrors: mockSetChartRequestErrors,
        clearChartRequestErrors: mockClearChartRequestErrors,
        removeChartRequestError: mockRemoveChartRequestError,
      })

      render(<FilterBanners />)

      expect(screen.queryByText(/Important information/)).not.toBeInTheDocument()
    })
  })

  describe('country availability banner', () => {
    it('should show banner when Northern Ireland is selected', () => {
      const selectedFilters = [{ id: 'geography.Nation.N92000002', label: 'Northern Ireland' }]

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

      expect(screen.getByText(/Important information/)).toBeInTheDocument()
      expect(
        screen.getByText(/Regional and Local authority level of coverage data is not available for/)
      ).toBeInTheDocument()
      expect(screen.getByText(/Northern Ireland/)).toBeInTheDocument()
      expect(screen.getByText(/All data displayed is at the country level/)).toBeInTheDocument()
    })

    it('should show banner when Scotland is selected', () => {
      const selectedFilters = [{ id: 'geography.Nation.S92000003', label: 'Scotland' }]

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

      expect(screen.getByText(/Important information/)).toBeInTheDocument()
      expect(screen.getByText(/Scotland/)).toBeInTheDocument()
    })

    it('should show banner when Wales is selected', () => {
      const selectedFilters = [{ id: 'geography.Nation.W92000004', label: 'Wales' }]

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

      expect(screen.getByText(/Important information/)).toBeInTheDocument()
      expect(screen.getByText(/Wales/)).toBeInTheDocument()
    })

    it('should show banner with multiple countries when multiple countries are selected', () => {
      const selectedFilters = [
        { id: 'geography.Nation.N92000002', label: 'Northern Ireland' },
        { id: 'geography.Nation.S92000003', label: 'Scotland' },
        { id: 'geography.Nation.W92000004', label: 'Wales' },
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

      expect(screen.getByText(/Important information/)).toBeInTheDocument()
      expect(screen.getByText(/Northern Ireland, Scotland, Wales/)).toBeInTheDocument()
    })

    it('should not show country banner when England regions are selected', () => {
      const selectedFilters = [
        { id: 'geography.Region.E12000007', label: 'London' },
        { id: 'geography.Region.E12000004', label: 'East Midlands' },
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
  })

  describe('multiple banners simultaneously', () => {
    it('should show both geography limit and error banners when both conditions are met', () => {
      const selectedGeographyFilters = [
        { name: 'geo1', geography_code: 'geo1', relationships: [] },
        { name: 'geo2', geography_code: 'geo2', relationships: [] },
        { name: 'geo3', geography_code: 'geo3', relationships: [] },
        { name: 'geo4', geography_code: 'geo4', relationships: [] },
      ]

      const chartRequestErrors = [{ id: 'error1', error: 'Failed to retrieve chart data' }]

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

      mockUseErrorData.mockReturnValue({
        chartRequestErrors,
        setChartRequestErrors: mockSetChartRequestErrors,
        clearChartRequestErrors: mockClearChartRequestErrors,
        removeChartRequestError: mockRemoveChartRequestError,
      })

      render(<FilterBanners />)

      expect(screen.getByText(/Important information/)).toBeInTheDocument()
      expect(screen.getByText(/four locations/)).toBeInTheDocument()
      expect(screen.getByText(/Failed to retrieve chart data/)).toBeInTheDocument()
    })

    it('should show both geography limit and country availability banners', () => {
      const selectedGeographyFilters = [
        { name: 'geo1', geography_code: 'geo1', relationships: [] },
        { name: 'geo2', geography_code: 'geo2', relationships: [] },
        { name: 'geo3', geography_code: 'geo3', relationships: [] },
        { name: 'geo4', geography_code: 'geo4', relationships: [] },
      ]

      const selectedFilters = [{ id: 'geography.Nation.N92000002', label: 'Northern Ireland' }]

      mockUseSelectedFilters.mockReturnValue({
        selectedFilters,
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
      expect(screen.getByText(/four locations/)).toBeInTheDocument()
      expect(screen.getByText(/Northern Ireland/)).toBeInTheDocument()
    })

    it('should show all three banners when all conditions are met', () => {
      const selectedGeographyFilters = [
        { name: 'geo1', geography_code: 'geo1', relationships: [] },
        { name: 'geo2', geography_code: 'geo2', relationships: [] },
        { name: 'geo3', geography_code: 'geo3', relationships: [] },
        { name: 'geo4', geography_code: 'geo4', relationships: [] },
      ]

      const selectedFilters = [
        { id: 'geography.Nation.S92000003', label: 'Scotland' },
        { id: 'data_filter.123', label: 'PCV (1 year)' },
      ]

      const chartRequestErrors = [{ id: 'error1', error: 'Chart loading failed for Scotland' }]

      mockUseSelectedFilters.mockReturnValue({
        selectedFilters,
        updateFilters: mockUpdateFilters,
        addFilter: mockAddFilter,
        removeFilter: mockRemoveFilter,
        clearFilters: mockClearFilters,
        addFilterFromMap: mockAddFilterFromMap,
        selectedVaccinationFilters: null,
        selectedGeographyFilters: selectedGeographyFilters,
        selectedThresholdFilters: null,
      })

      mockUseErrorData.mockReturnValue({
        chartRequestErrors,
        setChartRequestErrors: mockSetChartRequestErrors,
        clearChartRequestErrors: mockClearChartRequestErrors,
        removeChartRequestError: mockRemoveChartRequestError,
      })

      render(<FilterBanners />)

      expect(screen.getByText(/Important information/)).toBeInTheDocument()
      expect(screen.getByText(/four locations/)).toBeInTheDocument()
      expect(screen.getByText(/Chart loading failed for Scotland/)).toBeInTheDocument()
      expect(screen.getByText(/All data displayed is at the country level/)).toBeInTheDocument()
    })
  })

  describe('edge cases', () => {
    it('should handle empty chartRequestErrors gracefully', () => {
      mockUseErrorData.mockReturnValue({
        chartRequestErrors: [],
        setChartRequestErrors: mockSetChartRequestErrors,
        clearChartRequestErrors: mockClearChartRequestErrors,
        removeChartRequestError: mockRemoveChartRequestError,
      })

      render(<FilterBanners />)

      expect(screen.queryByText(/Important information/)).not.toBeInTheDocument()
    })

    it('should handle empty selectedFilters gracefully', () => {
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

      render(<FilterBanners />)

      expect(screen.queryByText(/Important information/)).not.toBeInTheDocument()
    })

    it('should handle mixed filter types correctly', () => {
      const selectedFilters = [
        { id: 'geography.Nation.N92000002', label: 'Northern Ireland' },
        { id: 'data_filter.123', label: 'PCV (1 year)' },
        { id: 'threshold.456', label: 'High Coverage' },
        { id: 'geography.Region.E12000007', label: 'London' },
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

      expect(screen.getByText(/Important information/)).toBeInTheDocument()
      expect(screen.getByText(/Northern Ireland/)).toBeInTheDocument()
      expect(screen.queryByText(/London/)).not.toBeInTheDocument() // Should not appear in country message
    })
  })
})
