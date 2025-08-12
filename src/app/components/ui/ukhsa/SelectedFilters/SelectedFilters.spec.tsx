import { ReactNode } from 'react'

import { fireEvent, render, waitFor } from '@/config/test-utils'

import {
  TopicBodyActions,
  TopicBodyContext,
  TopicBodyContextProvider,
  TopicBodyState,
} from '../Context/TopicBodyContext'
import { SelectedFilters } from './SelectedFilters'

// Mock the translation hook
jest.mock('@/app/i18n/client', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'globalFilter.globalFilterTitle': 'Selected filters',
      }
      return translations[key] || key
    },
  }),
}))

// Mock CrossIcon component
jest.mock('../Icons/CrossIcon', () => {
  return function CrossIcon({ colour }: { colour?: string }) {
    return (
      <span data-testid="cross-icon" data-colour={colour}>
        ✕
      </span>
    )
  }
})

// Test wrapper with real context provider
const TestWrapper = ({ children }: { children: ReactNode }) => (
  <TopicBodyContextProvider>{children}</TopicBodyContextProvider>
)

// Mock context provider for specific test scenarios
const MockContextProvider = ({
  children,
  selectedFilters = [],
  mockActions = {},
}: {
  children: ReactNode
  selectedFilters?: Array<{ id: string; label: string }>
  mockActions?: Partial<TopicBodyActions>
}) => {
  const defaultActions: TopicBodyActions = {
    updateFilters: jest.fn(),
    addFilter: jest.fn(),
    removeFilter: jest.fn(),
    clearFilters: jest.fn(),
    setTimePeriods: jest.fn(),
    setSelectedTimePeriod: jest.fn(),
    clearTimePeriods: jest.fn(),
    ...mockActions,
  }

  const state: TopicBodyState = {
    selectedFilters,
    timePeriods: [],
    selectedTimePeriod: null,
  }

  const contextValue = [state, defaultActions] as const

  return <TopicBodyContext.Provider value={contextValue}>{children}</TopicBodyContext.Provider>
}

describe('SelectedFilters', () => {
  describe('Component rendering', () => {
    test('should render with no selected filters', () => {
      // Arrange & Act
      const { getByRole, getByText } = render(
        <MockContextProvider selectedFilters={[]}>
          <SelectedFilters />
        </MockContextProvider>
      )

      // Assert
      expect(getByRole('heading', { level: 2 })).toHaveTextContent('Selected filters (0)')
      expect(getByText('Clear filter selection')).toBeInTheDocument()
    })

    test('should render with single selected filter', () => {
      // Arrange
      const selectedFilters = [{ id: 'filter.Test Filter', label: 'Test Filter' }]

      // Act
      const { getByRole, getByText } = render(
        <MockContextProvider selectedFilters={selectedFilters}>
          <SelectedFilters />
        </MockContextProvider>
      )

      // Assert
      expect(getByRole('heading', { level: 2 })).toHaveTextContent('Selected filters (1)')
      expect(getByText('Test Filter')).toBeInTheDocument()
      expect(getByText('Clear filter selection')).toBeInTheDocument()
    })

    test('should render with multiple selected filters', () => {
      // Arrange
      const selectedFilters = [
        { id: 'filter.Filter 1', label: 'Filter 1' },
        { id: 'filter.Filter 2', label: 'Filter 2' },
        { id: 'filter.Filter 3', label: 'Filter 3' },
      ]

      // Act
      const { getByRole, getByText } = render(
        <MockContextProvider selectedFilters={selectedFilters}>
          <SelectedFilters />
        </MockContextProvider>
      )

      // Assert
      expect(getByRole('heading', { level: 2 })).toHaveTextContent('Selected filters (3)')
      expect(getByText('Filter 1')).toBeInTheDocument()
      expect(getByText('Filter 2')).toBeInTheDocument()
      expect(getByText('Filter 3')).toBeInTheDocument()
    })

    test('should throw error when used outside context provider', () => {
      // Arrange
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})

      // Act & Assert
      expect(() => {
        render(<SelectedFilters />)
      }).toThrow('useTopicBody must be used within a TopicBodyContextProvider')

      consoleError.mockRestore()
    })
  })

  describe('Filter removal functionality', () => {
    test('should call removeFilter when individual filter button is clicked', () => {
      // Arrange
      const mockRemoveFilter = jest.fn()
      const selectedFilters = [
        { id: 'filter.Test Filter', label: 'Test Filter' },
        { id: 'filter.Another Filter', label: 'Another Filter' },
      ]

      const { getByText } = render(
        <MockContextProvider selectedFilters={selectedFilters} mockActions={{ removeFilter: mockRemoveFilter }}>
          <SelectedFilters />
        </MockContextProvider>
      )

      // Act
      fireEvent.click(getByText('Test Filter'))

      // Assert
      expect(mockRemoveFilter).toHaveBeenCalledWith('filter.Test Filter')
      expect(mockRemoveFilter).toHaveBeenCalledTimes(1)
    })

    test('should call removeFilter for correct filter when multiple filters present', () => {
      // Arrange
      const mockRemoveFilter = jest.fn()
      const selectedFilters = [
        { id: 'filter.Filter A', label: 'Filter A' },
        { id: 'filter.Filter B', label: 'Filter B' },
        { id: 'filter.Filter C', label: 'Filter C' },
      ]

      const { getByText } = render(
        <MockContextProvider selectedFilters={selectedFilters} mockActions={{ removeFilter: mockRemoveFilter }}>
          <SelectedFilters />
        </MockContextProvider>
      )

      // Act
      fireEvent.click(getByText('Filter B'))

      // Assert
      expect(mockRemoveFilter).toHaveBeenCalledWith('filter.Filter B')
      expect(mockRemoveFilter).not.toHaveBeenCalledWith('filter.Filter A')
      expect(mockRemoveFilter).not.toHaveBeenCalledWith('filter.Filter C')
    })

    test('should handle filter names with special characters', () => {
      // Arrange
      const mockRemoveFilter = jest.fn()
      const selectedFilters = [
        { id: 'filter.Filter & Special', label: 'Filter & Special' },
        { id: 'filter.Filter (with) brackets', label: 'Filter (with) brackets' },
        { id: 'filter.Filter-with-dashes', label: 'Filter-with-dashes' },
      ]

      const { getByText } = render(
        <MockContextProvider selectedFilters={selectedFilters} mockActions={{ removeFilter: mockRemoveFilter }}>
          <SelectedFilters />
        </MockContextProvider>
      )

      // Act
      fireEvent.click(getByText('Filter & Special'))

      // Assert
      expect(mockRemoveFilter).toHaveBeenCalledWith('filter.Filter & Special')
    })
  })

  describe('Clear all filters functionality', () => {
    test('should call clearFilters when clear button is clicked', () => {
      // Arrange
      const mockClearFilters = jest.fn()
      const selectedFilters = [
        { id: 'filter.Filter 1', label: 'Filter 1' },
        { id: 'filter.Filter 2', label: 'Filter 2' },
      ]

      const { getByRole } = render(
        <MockContextProvider selectedFilters={selectedFilters} mockActions={{ clearFilters: mockClearFilters }}>
          <SelectedFilters />
        </MockContextProvider>
      )

      // Act
      fireEvent.click(getByRole('button', { name: /clear filter selection/i }))

      // Assert
      expect(mockClearFilters).toHaveBeenCalledTimes(1)
      expect(mockClearFilters).toHaveBeenCalledWith()
    })

    test('should call clearFilters even when no filters are selected', () => {
      // Arrange
      const mockClearFilters = jest.fn()

      const { getByRole } = render(
        <MockContextProvider selectedFilters={[]} mockActions={{ clearFilters: mockClearFilters }}>
          <SelectedFilters />
        </MockContextProvider>
      )

      // Act
      fireEvent.click(getByRole('button', { name: /clear filter selection/i }))

      // Assert
      expect(mockClearFilters).toHaveBeenCalledTimes(1)
    })
  })

  describe('UI elements and styling', () => {
    test('should render cross icons for individual filters', () => {
      // Arrange
      const selectedFilters = [
        { id: 'filter.Filter 1', label: 'Filter 1' },
        { id: 'filter.Filter 2', label: 'Filter 2' },
      ]

      // Act
      const { getAllByTestId } = render(
        <MockContextProvider selectedFilters={selectedFilters}>
          <SelectedFilters />
        </MockContextProvider>
      )

      // Assert
      const crossIcons = getAllByTestId('cross-icon')
      expect(crossIcons).toHaveLength(3) // 2 for filters + 1 for clear button
    })

    test('should render blue cross icon for clear button', () => {
      // Arrange & Act
      const { getAllByTestId } = render(
        <MockContextProvider selectedFilters={[{ id: 'filter.Test Filter', label: 'Test Filter' }]}>
          <SelectedFilters />
        </MockContextProvider>
      )

      // Assert
      const crossIcons = getAllByTestId('cross-icon')
      const blueCrossIcon = crossIcons.find((icon) => icon.getAttribute('data-colour') === 'var(--colour-blue)')
      expect(blueCrossIcon).toBeInTheDocument()
    })

    test('should have correct CSS classes on filter buttons', () => {
      // Arrange
      const selectedFilters = [{ id: 'filter.Test Filter', label: 'Test Filter' }]

      // Act
      const { getByText } = render(
        <MockContextProvider selectedFilters={selectedFilters}>
          <SelectedFilters />
        </MockContextProvider>
      )

      const filterButton = getByText('Test Filter')

      // Assert
      expect(filterButton).toHaveClass('govuk-!-padding-1')
      expect(filterButton).toHaveClass('govuk-!-margin-right-2')
      expect(filterButton).toHaveClass('border-[1px]')
      expect(filterButton).toHaveClass('bg-white')
      expect(filterButton).toHaveClass('text-black')
    })

    test('should have correct CSS classes on clear button', () => {
      // Arrange & Act
      const { getByRole } = render(
        <MockContextProvider selectedFilters={[{ id: 'filter.Test Filter', label: 'Test Filter' }]}>
          <SelectedFilters />
        </MockContextProvider>
      )

      const clearButton = getByRole('button', { name: /clear filter selection/i })

      // Assert
      expect(clearButton).toHaveClass('govuk-body-xs')
      expect(clearButton).toHaveClass('govuk-link')
      expect(clearButton).toHaveClass('absolute')
      expect(clearButton).toHaveClass('right-0')
      expect(clearButton).toHaveClass('text-blue')
      expect(clearButton).toHaveClass('underline')
    })
  })

  describe('Accessibility', () => {
    test('should have proper heading structure', () => {
      // Arrange & Act
      const { getByRole } = render(
        <MockContextProvider selectedFilters={[{ id: 'filter.Test Filter', label: 'Test Filter' }]}>
          <SelectedFilters />
        </MockContextProvider>
      )

      // Assert
      const heading = getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass('govuk-heading-s')
    })

    test('should have clickable buttons for all interactive elements', () => {
      // Arrange
      const selectedFilters = [
        { id: 'filter.Filter 1', label: 'Filter 1' },
        { id: 'filter.Filter 2', label: 'Filter 2' },
      ]

      // Act
      const { getAllByRole } = render(
        <MockContextProvider selectedFilters={selectedFilters}>
          <SelectedFilters />
        </MockContextProvider>
      )

      // Assert
      const buttons = getAllByRole('button')
      expect(buttons).toHaveLength(3) // 2 filter buttons + 1 clear button
      buttons.forEach((button) => {
        expect(button).toBeEnabled()
      })
    })
  })

  describe('Integration with real context', () => {
    test('should work with real TopicBodyContextProvider', async () => {
      // Arrange & Act
      const { getByRole, getByText } = render(
        <TestWrapper>
          <SelectedFilters />
        </TestWrapper>
      )

      // Assert - Should render with default filters from context
      await waitFor(() => {
        expect(getByRole('heading', { level: 2 })).toHaveTextContent('Selected filters (3)')
        expect(getByText('Leicester')).toBeInTheDocument()
        expect(getByText('London')).toBeInTheDocument()
        expect(getByText('6-in-1')).toBeInTheDocument()
      })
    })
  })

  describe('Translation integration', () => {
    test('should use translated title text', () => {
      // Arrange & Act
      const { getByRole } = render(
        <MockContextProvider selectedFilters={[{ id: 'filter.Test Filter', label: 'Test Filter' }]}>
          <SelectedFilters />
        </MockContextProvider>
      )

      // Assert
      expect(getByRole('heading', { level: 2 })).toHaveTextContent('Selected filters (1)')
    })
  })
})
