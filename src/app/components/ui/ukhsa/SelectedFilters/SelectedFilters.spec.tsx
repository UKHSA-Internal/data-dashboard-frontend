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

      const clearButtons = screen.getAllByRole('button', { name: /clear filter selection/i })
      expect(clearButtons).toHaveLength(2) // Mobile and desktop versions
    })

    it('should not display any filter buttons', () => {
      render(<SelectedFilters />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
      expect(buttons[0]).toHaveTextContent('Clear filter selection')
    })

    it('should call clearFilters when clear button is clicked', () => {
      render(<SelectedFilters />)

      const clearButtons = screen.getAllByRole('button', { name: /clear filter selection/i })
      fireEvent.click(clearButtons[0])

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
        const filterButtons = screen.getAllByRole('button', { name: new RegExp(filter.label, 'i') })
        expect(filterButtons).toHaveLength(2)
      })
    })

    it('should display cross icons for each filter button', () => {
      render(<SelectedFilters />)

      const crossIcons = screen.getAllByTestId('cross-icon')
      expect(crossIcons).toHaveLength((selectedFilters.length + 1) * 2)
    })

    it('should call removeFilter with correct filter when filter button is clicked', () => {
      render(<SelectedFilters />)

      const firstFilterButtons = screen.getAllByRole('button', { name: /time period: 2024-q1/i })
      fireEvent.click(firstFilterButtons[0])

      expect(mockRemoveFilter).toHaveBeenCalledTimes(1)
      expect(mockRemoveFilter).toHaveBeenCalledWith('Time Period: 2024-Q1')
    })

    it('should call removeFilter for different filters', () => {
      render(<SelectedFilters />)

      const geographyFilterButtons = screen.getAllByRole('button', { name: /geography: england/i })
      fireEvent.click(geographyFilterButtons[0])

      expect(mockRemoveFilter).toHaveBeenCalledWith('Geography: England')
    })

    it('should call clearFilters when clear button is clicked', () => {
      render(<SelectedFilters />)

      const clearButtons = screen.getAllByRole('button', { name: /clear filter selection/i })
      fireEvent.click(clearButtons[0])

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

      const filterButtons = screen.getAllByRole('button', { name: /test filter/i })
      expect(filterButtons).toHaveLength(2)

      const clearButtons = screen.getAllByRole('button', { name: /clear filter selection/i })
      expect(clearButtons).toHaveLength(2)
    })
  })

  describe('responsive behavior', () => {
    const selectedFilters = [
      { id: 'Time Period: 2024-Q1', label: 'Time Period: 2024-Q1' },
      { id: 'Geography: England', label: 'Geography: England' },
    ]

    beforeEach(() => {
      mockUseSelectedFilters.mockReturnValue({
        selectedFilters,
        removeFilter: mockRemoveFilter,
        clearFilters: mockClearFilters,
      })
    })

    describe('mobile viewport', () => {
      beforeEach(() => {
        // Mock mobile viewport (below md breakpoint)
        Object.defineProperty(window, 'innerWidth', {
          value: 767,
        })
      })

      it('should show details element for mobile', () => {
        render(<SelectedFilters />)

        const detailsElement = screen.getByRole('group')
        expect(detailsElement).toBeInTheDocument()
        expect(detailsElement).toHaveClass('govuk-details')
      })

      it('should show summary with filter count', () => {
        render(<SelectedFilters />)

        const summary = screen.getByText('Show selected filters (2)')
        expect(summary).toBeInTheDocument()
      })

      it('should hide desktop heading on mobile', () => {
        render(<SelectedFilters />)

        const heading = screen.queryByRole('heading', { level: 2 })
        expect(heading).toHaveClass('hidden')
      })

      it('should show filters when details is expanded', () => {
        render(<SelectedFilters />)

        const summary = screen.getByText('Show selected filters (2)')
        fireEvent.click(summary)

        expect(screen.getAllByRole('button', { name: /time period: 2024-q1/i })).toHaveLength(2)
        expect(screen.getAllByRole('button', { name: /geography: england/i })).toHaveLength(2)
      })
    })

    describe('desktop viewport', () => {
      beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', {
          value: 768,
        })
      })

      it('should show desktop heading', () => {
        render(<SelectedFilters />)

        const heading = screen.getByRole('heading', { level: 2 })
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent('Selected Filters (2)')
      })

      it('should hide details element on desktop', () => {
        render(<SelectedFilters />)

        const detailsElement = screen.queryByRole('group')
        expect(detailsElement).toBeInTheDocument()
        expect(detailsElement).toHaveClass('md:hidden')
      })

      it('should show filters directly without details', () => {
        render(<SelectedFilters />)

        expect(screen.getAllByRole('button', { name: /time period: 2024-q1/i })).toHaveLength(2)
        expect(screen.getAllByRole('button', { name: /geography: england/i })).toHaveLength(2)
      })

      it('should position clear button absolutely on desktop', () => {
        render(<SelectedFilters />)

        const clearButtons = screen.getAllByRole('button', { name: /clear filter selection/i })
        expect(clearButtons).toHaveLength(2)

        const desktopClearButton = clearButtons.find((button) => button.classList.contains('absolute'))
        expect(desktopClearButton).toHaveClass('absolute', 'right-3', 'top-[12px]')
      })
    })
  })

  describe('edge cases', () => {
    it('should handle very long filter names', () => {
      const longFilterName = 'This is a very long filter name that might cause layout issues in the UI'
      const longFilter = { id: 'Long Filter Name', label: longFilterName }

      mockUseSelectedFilters.mockReturnValue({
        selectedFilters: [longFilter],
        removeFilter: mockRemoveFilter,
        clearFilters: mockClearFilters,
      })

      render(<SelectedFilters />)

      const filterButtons = screen.getAllByRole('button', { name: new RegExp(longFilterName, 'i') })
      expect(filterButtons).toHaveLength(2)
    })
  })
})
