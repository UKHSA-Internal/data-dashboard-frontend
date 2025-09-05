// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useSelectedFilters } from '@/app/hooks/globalFilterHooks'
import { useTranslation } from '@/app/i18n/client'
import { fireEvent, render, screen } from '@/config/test-utils'

import SelectedFilters from './SelectedFilters'

// Mock the translation hook
jest.mock('@/app/i18n/client', () => ({
  useTranslation: jest.fn(() => ({
    t: jest.fn((key: string) => {
      const translations: Record<string, string> = {
        'globalFilter.globalFilterTitle': 'Selected Filters',
      }
      return translations[key] || key
    }),
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
    ready: true,
  })),
}))

// Mock the global filter hook
jest.mock('@/app/hooks/globalFilterHooks', () => ({
  useSelectedFilters: jest.fn(),
}))

// Mock the CrossIcon component
jest.mock('../Icons/CrossIcon', () => {
  return function MockCrossIcon({ colour }: { colour?: string }) {
    return (
      <span data-testid="cross-icon" data-colour={colour}>
        ✕
      </span>
    )
  }
})

// Type the mocked hooks for better TypeScript support
const mockUseTranslation = useTranslation as jest.MockedFunction<typeof useTranslation>
const mockUseSelectedFilters = useSelectedFilters as jest.MockedFunction<typeof useSelectedFilters>

describe('SelectedFilters', () => {
  const mockTranslation = jest.fn()
  const mockRemoveFilter = jest.fn()
  const mockClearFilters = jest.fn()

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()

    // Set up default mock implementations
    mockUseTranslation.mockReturnValue({
      t: mockTranslation,
    })

    mockTranslation.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        'globalFilter.globalFilterTitle': 'Selected Filters',
        'globalFilter.clearFilterSelection': 'Clear filter selection',
      }
      return translations[key] || key
    })
  })

  describe('when no filters are selected', () => {
    beforeEach(() => {
      mockUseSelectedFilters.mockReturnValue({
        selectedFilters: [],
        removeFilter: mockRemoveFilter,
        clearFilters: mockClearFilters,
      })
    })

    it('should display the heading with zero count', () => {
      render(<SelectedFilters />)

      expect(screen.getByText('Selected Filters (0)')).toBeInTheDocument()
      expect(mockTranslation).toHaveBeenCalledWith('globalFilter.globalFilterTitle')
    })

    it('should display the clear filters button', () => {
      render(<SelectedFilters />)

      const clearButton = screen.getByRole('button', { name: /clear filter selection/i })
      expect(clearButton).toBeInTheDocument()
    })

    it('should not display any filter buttons', () => {
      render(<SelectedFilters />)

      // Only the clear button should be present
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(1)
      expect(buttons[0]).toHaveTextContent('Clear filter selection')
    })

    it('should call clearFilters when clear button is clicked', () => {
      render(<SelectedFilters />)

      const clearButton = screen.getByRole('button', { name: /clear filter selection/i })
      fireEvent.click(clearButton)

      expect(mockClearFilters).toHaveBeenCalledTimes(1)
    })
  })

  describe('when filters are selected', () => {
    const selectedFilters = [
      { id: 'Time Period: 2024-Q1', label: 'Time Period: 2024-Q1' },
      { id: 'Geography: England', label: 'Geography: England' },
      { id: 'Data: COVID-19', label: 'Data: COVID-19' },
    ]

    beforeEach(() => {
      jest.clearAllMocks()
      mockUseSelectedFilters.mockReturnValue({
        selectedFilters,
        removeFilter: mockRemoveFilter,
        clearFilters: mockClearFilters,
      })
    })

    it('should display the heading with correct count', () => {
      render(<SelectedFilters />)

      expect(screen.getByText('Selected Filters (3)')).toBeInTheDocument()
    })

    it('should display all selected filters as buttons', () => {
      render(<SelectedFilters />)

      selectedFilters.forEach((filter) => {
        expect(screen.getByRole('button', { name: new RegExp(filter.label, 'i') })).toBeInTheDocument()
      })
    })

    it('should display cross icons for each filter button', () => {
      render(<SelectedFilters />)

      // Should have cross icons for each filter + one for clear button
      const crossIcons = screen.getAllByTestId('cross-icon')
      expect(crossIcons).toHaveLength(selectedFilters.length + 1)
    })

    it('should call removeFilter with correct filter when filter button is clicked', () => {
      render(<SelectedFilters />)

      const firstFilterButton = screen.getByRole('button', { name: /time period: 2024-q1/i })
      fireEvent.click(firstFilterButton)

      expect(mockRemoveFilter).toHaveBeenCalledTimes(1)
      expect(mockRemoveFilter).toHaveBeenCalledWith('Time Period: 2024-Q1')
    })

    it('should call removeFilter for different filters', () => {
      render(<SelectedFilters />)

      const geographyFilterButton = screen.getByRole('button', { name: /geography: england/i })
      fireEvent.click(geographyFilterButton)

      expect(mockRemoveFilter).toHaveBeenCalledWith('Geography: England')
    })

    it('should call clearFilters when clear button is clicked', () => {
      render(<SelectedFilters />)

      const clearButton = screen.getByRole('button', { name: /clear filter selection/i })
      fireEvent.click(clearButton)

      expect(mockClearFilters).toHaveBeenCalledTimes(1)
    })
  })

  describe('accessibility', () => {
    beforeEach(() => {
      mockUseSelectedFilters.mockReturnValue({
        selectedFilters: [{ id: 'Test Filter', label: 'test filter' }],
        removeFilter: mockRemoveFilter,
        clearFilters: mockClearFilters,
      })
    })

    it('should have proper heading structure', () => {
      render(<SelectedFilters />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Selected Filters (1)')
    })

    it('should have accessible button text', () => {
      render(<SelectedFilters />)

      // Filter removal buttons should include the filter name
      expect(screen.getByRole('button', { name: /test filter/i })).toBeInTheDocument()

      // Clear button should be descriptive
      expect(screen.getByRole('button', { name: /clear filter selection/i })).toBeInTheDocument()
    })
  })

  describe('edge cases', () => {
    it('should handle empty string filters', () => {
      mockUseSelectedFilters.mockReturnValue({
        selectedFilters: [
          { id: '', label: '' },
          { id: 'Valid Filter', label: 'Valid Filter' },
          { id: '', label: '' },
        ],
        removeFilter: mockRemoveFilter,
        clearFilters: mockClearFilters,
      })

      render(<SelectedFilters />)

      // Should still render buttons for empty strings
      const filterButtons = screen.getAllByRole('button')
      // 3 filter buttons + 1 clear button = 4 total
      expect(filterButtons).toHaveLength(4)
    })

    it('should handle very long filter names', () => {
      const longFilterName = [
        { id: 'Long Filter Name', label: 'This is a very long filter name that might cause layout issues in the UI' },
      ]

      mockUseSelectedFilters.mockReturnValue({
        selectedFilters: [longFilterName],
        removeFilter: mockRemoveFilter,
        clearFilters: mockClearFilters,
      })

      render(<SelectedFilters />)

      expect(screen.getByRole('button', { name: new RegExp(longFilterName, 'i') })).toBeInTheDocument()
    })
  })
})
