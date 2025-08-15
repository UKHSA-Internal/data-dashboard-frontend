import { ReactNode } from 'react'

import { fireEvent, render } from '@/config/test-utils'

import { TopicBodyActions, TopicBodyContext, TopicBodyState } from '../Context/TopicBodyContext'
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
      const { getByRole, getByText } = render(
        <MockContextProvider selectedFilters={[]}>
          <SelectedFilters />
        </MockContextProvider>
      )

      expect(getByRole('heading', { level: 2 })).toHaveTextContent('Selected filters (0)')
      expect(getByText('Clear filter selection')).toBeInTheDocument()
    })

    test('should render with single selected filter', () => {
      const selectedFilters = [{ id: 'filter.Test Filter', label: 'Test Filter' }]

      const { getByRole, getByText } = render(
        <MockContextProvider selectedFilters={selectedFilters}>
          <SelectedFilters />
        </MockContextProvider>
      )

      expect(getByRole('heading', { level: 2 })).toHaveTextContent('Selected filters (1)')
      expect(getByText('Test Filter')).toBeInTheDocument()
      expect(getByText('Clear filter selection')).toBeInTheDocument()
    })

    test('should render with multiple selected filters', () => {
      const selectedFilters = [
        { id: 'filter.Filter 1', label: 'Filter 1' },
        { id: 'filter.Filter 2', label: 'Filter 2' },
        { id: 'filter.Filter 3', label: 'Filter 3' },
      ]

      const { getByRole, getByText } = render(
        <MockContextProvider selectedFilters={selectedFilters}>
          <SelectedFilters />
        </MockContextProvider>
      )

      expect(getByRole('heading', { level: 2 })).toHaveTextContent('Selected filters (3)')
      expect(getByText('Filter 1')).toBeInTheDocument()
      expect(getByText('Filter 2')).toBeInTheDocument()
      expect(getByText('Filter 3')).toBeInTheDocument()
    })

    test('should call removeFilter when individual filter button is clicked', () => {
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

      fireEvent.click(getByText('Test Filter'))

      expect(mockRemoveFilter).toHaveBeenCalledWith('filter.Test Filter')
      expect(mockRemoveFilter).toHaveBeenCalledTimes(1)
    })

    test('should call removeFilter for correct filter when multiple filters present', () => {
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

      fireEvent.click(getByText('Filter B'))

      expect(mockRemoveFilter).toHaveBeenCalledWith('filter.Filter B')
      expect(mockRemoveFilter).not.toHaveBeenCalledWith('filter.Filter A')
      expect(mockRemoveFilter).not.toHaveBeenCalledWith('filter.Filter C')
    })

    test('should handle filter names with special characters', () => {
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

      fireEvent.click(getByText('Filter & Special'))

      expect(mockRemoveFilter).toHaveBeenCalledWith('filter.Filter & Special')
    })

    test('should call clearFilters when clear button is clicked', () => {
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

      fireEvent.click(getByRole('button', { name: /clear filter selection/i }))

      expect(mockClearFilters).toHaveBeenCalledTimes(1)
      expect(mockClearFilters).toHaveBeenCalledWith()
    })

    test('should have proper heading structure', () => {
      const { getByRole } = render(
        <MockContextProvider selectedFilters={[{ id: 'filter.Test Filter', label: 'Test Filter' }]}>
          <SelectedFilters />
        </MockContextProvider>
      )

      const heading = getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Selected filters (1)')
    })

    test('should have clickable buttons for all interactive elements', () => {
      const selectedFilters = [
        { id: 'filter.Filter 1', label: 'Filter 1' },
        { id: 'filter.Filter 2', label: 'Filter 2' },
      ]

      const { getAllByRole } = render(
        <MockContextProvider selectedFilters={selectedFilters}>
          <SelectedFilters />
        </MockContextProvider>
      )

      const buttons = getAllByRole('button')
      expect(buttons).toHaveLength(3)
      buttons.forEach((button) => {
        expect(button).toBeEnabled()
      })
    })
  })
})
