import { faker } from '@faker-js/faker'
import React, { ReactNode } from 'react'

import { TimePeriod, Vaccination } from '@/api/models/cms/Page/GlobalFilter'
import { act, render, renderHook } from '@/config/test-utils'

import { TopicBodyContextProvider, TopicBodyState, useTopicBody, useTopicBodyFilters } from './TopicBodyContext'

const mockTimePeriods: TimePeriod[] = [
  {
    type: 'time_period',
    value: {
      label: '2023-2024',
      date_from: '2023-04-01',
      date_to: '2024-03-31',
    },
    id: faker.string.uuid(),
  },
  {
    type: 'time_period',
    value: {
      label: '2024-2025',
      date_from: '2024-04-01',
      date_to: '2025-03-31',
    },
    id: faker.string.uuid(),
  },
]

const mockVaccinations: Vaccination[] = [
  {
    id: 'covid19_dose1',
    label: 'COVID-19 Vaccine (1st Dose)',
    category: 'COVID-19',
  },
  {
    id: 'covid19_dose2',
    label: 'COVID-19 Vaccine (2nd Dose)',
    category: 'COVID-19',
  },
]

// Wrapper component for testing context
const TestWrapper = ({ children }: { children: ReactNode }) => (
  <TopicBodyContextProvider>{children}</TopicBodyContextProvider>
)

describe('TopicBodyContext', () => {
  describe('Initial state', () => {
    test('should initialize with default state', () => {
      const { result } = renderHook(() => useTopicBodyFilters())
      const [state] = result.current

      expect(state.selectedFilters).toEqual([])
      expect(state.timePeriods).toEqual([])
      expect(state.selectedTimePeriod).toBeNull()
      expect(state.vaccinations).toEqual([])
      expect(state.selectedVaccination).toBeNull()
    })

    test('should initialize with provided state', () => {
      const customState: TopicBodyState = {
        selectedFilters: [
          { id: 'custom.Custom', label: 'Custom' },
          { id: 'custom.Filters', label: 'Filters' },
        ],
        timePeriods: mockTimePeriods,
        selectedTimePeriod: mockTimePeriods[0],
        vaccinations: mockVaccinations,
        selectedVaccination: mockVaccinations[0].id,
      }

      const { result } = renderHook(() => useTopicBodyFilters(customState))
      const [state] = result.current

      expect(state.selectedFilters).toEqual([
        { id: 'custom.Custom', label: 'Custom' },
        { id: 'custom.Filters', label: 'Filters' },
      ])
      expect(state.timePeriods).toEqual([])
      expect(state.selectedTimePeriod).toBeNull()
    })
  })

  describe('Filter actions', () => {
    test('should update filters correctly', () => {
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })
      const newFilters = [
        { id: 'filter.Filter1', label: 'Filter1' },
        { id: 'filter.Filter2', label: 'Filter2' },
        { id: 'filter.Filter3', label: 'Filter3' },
      ]

      act(() => {
        const [, actions] = result.current
        actions.updateFilters(newFilters)
      })

      const [state] = result.current
      expect(state.selectedFilters).toEqual(newFilters)
    })

    test('should add filter when not already present', () => {
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })
      const newFilter = { id: 'filter.NewFilter', label: 'NewFilter' }

      act(() => {
        const [, actions] = result.current
        actions.addFilter(newFilter)
      })

      const [state] = result.current
      expect(state.selectedFilters).toContainEqual(newFilter)
      expect(state.selectedFilters).toEqual([newFilter])
    })

    test('should not add duplicate filter', () => {
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })
      const existingFilter = { id: 'location.Leicester', label: 'Leicester' }

      act(() => {
        const [, actions] = result.current
        actions.addFilter(existingFilter)
      })

      const [state] = result.current
      expect(state.selectedFilters).toEqual([existingFilter])
      expect(state.selectedFilters.filter((filter) => filter.id === existingFilter.id)).toHaveLength(1)
    })

    test('should remove filter correctly', () => {
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      act(() => {
        const [, actions] = result.current
        actions.updateFilters([
          { id: 'location.Leicester', label: 'Leicester' },
          { id: 'location.London', label: 'London' },
          { id: 'vaccine.6-in-1', label: '6-in-1' },
        ])
      })

      const filterToRemove = 'location.London'

      act(() => {
        const [, actions] = result.current
        actions.removeFilter(filterToRemove)
      })

      const [state] = result.current
      expect(state.selectedFilters).not.toContainEqual({ id: 'location.London', label: 'London' })
      expect(state.selectedFilters).toEqual([
        { id: 'location.Leicester', label: 'Leicester' },
        { id: 'vaccine.6-in-1', label: '6-in-1' },
      ])
    })

    test('should handle removing non-existent filter gracefully', () => {
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      act(() => {
        const [, actions] = result.current
        actions.updateFilters([
          { id: 'location.Leicester', label: 'Leicester' },
          { id: 'location.London', label: 'London' },
          { id: 'vaccine.6-in-1', label: '6-in-1' },
        ])
      })

      const nonExistentFilter = 'NonExistent'

      act(() => {
        const [, actions] = result.current
        actions.removeFilter(nonExistentFilter)
      })

      const [state] = result.current
      expect(state.selectedFilters).toEqual([
        { id: 'location.Leicester', label: 'Leicester' },
        { id: 'location.London', label: 'London' },
        { id: 'vaccine.6-in-1', label: '6-in-1' },
      ])
    })

    test('should clear all filters', () => {
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      act(() => {
        const [, actions] = result.current
        actions.clearFilters()
      })

      const [state] = result.current
      expect(state.selectedFilters).toEqual([])
    })
  })

  describe('Time period actions', () => {
    test('should set time periods and auto-select first one when none selected', () => {
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      act(() => {
        const [, actions] = result.current
        actions.setTimePeriods(mockTimePeriods)
      })

      const [state] = result.current
      expect(state.timePeriods).toEqual(mockTimePeriods)
      expect(state.selectedTimePeriod).toEqual(mockTimePeriods[0])
    })

    test('should set time periods without changing selected when one already selected', () => {
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      act(() => {
        const [, actions] = result.current
        actions.setSelectedTimePeriod(mockTimePeriods[1])
      })

      act(() => {
        const [, actions] = result.current
        actions.setTimePeriods(mockTimePeriods)
      })

      const [state] = result.current
      expect(state.timePeriods).toEqual(mockTimePeriods)
      expect(state.selectedTimePeriod).toEqual(mockTimePeriods[1])
    })

    test('should set time periods with empty array', () => {
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      act(() => {
        const [, actions] = result.current
        actions.setTimePeriods([])
      })

      const [state] = result.current
      expect(state.timePeriods).toEqual([])
      expect(state.selectedTimePeriod).toBeNull()
    })

    test('should set selected time period', () => {
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })
      const selectedPeriod = mockTimePeriods[1]

      act(() => {
        const [, actions] = result.current
        actions.setSelectedTimePeriod(selectedPeriod)
      })

      const [state] = result.current
      expect(state.selectedTimePeriod).toEqual(selectedPeriod)
    })

    test('should set selected time period to null', () => {
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      act(() => {
        const [, actions] = result.current
        actions.setSelectedTimePeriod(mockTimePeriods[0])
        actions.setSelectedTimePeriod(null)
      })

      const [state] = result.current
      expect(state.selectedTimePeriod).toBeNull()
    })

    test('should clear time periods and selected time period', () => {
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      act(() => {
        const [, actions] = result.current
        actions.setTimePeriods(mockTimePeriods)
        actions.clearTimePeriods()
      })

      const [state] = result.current
      expect(state.timePeriods).toEqual([])
      expect(state.selectedTimePeriod).toBeNull()
    })
  })

  describe('Vaccination actions', () => {
    test('should set vaccinations with an empty array', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      // Act
      act(() => {
        const [, actions] = result.current
        actions.setVaccinations([])
      })

      // Assert
      const [state] = result.current
      expect(state.vaccinations).toEqual([])
      expect(state.selectedVaccination).toBeNull()
    })

    test('should set selected vaccination to null', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      // Act
      act(() => {
        const [, actions] = result.current
        actions.setSelectedVaccination(mockVaccinations[0].id)
        actions.setSelectedVaccination(null)
      })

      // Assert
      const [state] = result.current
      expect(state.selectedVaccination).toBeNull()
    })

    test('should clear vaccinations and selected vaccination', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      // Act
      act(() => {
        const [, actions] = result.current
        actions.setVaccinations(mockVaccinations)
        actions.clearVaccinations()
      })

      // Assert
      const [state] = result.current
      expect(state.vaccinations).toEqual([])
      expect(state.selectedVaccination).toBeNull()
    })
  })

  describe('Context provider and consumer', () => {
    test('should provide context value correctly', () => {
      const { result } = renderHook(() => useTopicBody(), {
        wrapper: TestWrapper,
      })

      expect(result.current).toBeDefined()
      expect(result.current).toHaveLength(2)

      const [state, actions] = result.current
      expect(state).toHaveProperty('selectedFilters')
      expect(state).toHaveProperty('timePeriods')
      expect(state).toHaveProperty('selectedTimePeriod')

      expect(actions).toHaveProperty('updateFilters')
      expect(actions).toHaveProperty('addFilter')
      expect(actions).toHaveProperty('removeFilter')
      expect(actions).toHaveProperty('clearFilters')
      expect(actions).toHaveProperty('setTimePeriods')
      expect(actions).toHaveProperty('setSelectedTimePeriod')
      expect(actions).toHaveProperty('clearTimePeriods')
    })

    test('should throw error when useTopicBody is used outside provider', () => {
      expect(() => {
        renderHook(() => useTopicBody())
      }).toThrow('useTopicBody must be used within a TopicBodyContextProvider')
    })

    test('should render children correctly', () => {
      const TestChild = () => <div data-testid="test-child">Test Child</div>

      const { getByTestId } = render(
        <TopicBodyContextProvider>
          <TestChild />
        </TopicBodyContextProvider>
      )

      expect(getByTestId('test-child')).toBeInTheDocument()
    })
  })

  describe('Complex scenarios', () => {
    test('should handle multiple filter operations in sequence', () => {
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      act(() => {
        const [, actions] = result.current
        actions.addFilter({ id: 'filter.NewFilter1', label: 'NewFilter1' })
        actions.addFilter({ id: 'filter.NewFilter2', label: 'NewFilter2' })
        actions.removeFilter('location.London')
        actions.updateFilters([
          { id: 'filter.FinalFilter1', label: 'FinalFilter1' },
          { id: 'filter.FinalFilter2', label: 'FinalFilter2' },
        ])
      })

      const [state] = result.current
      expect(state.selectedFilters).toEqual([
        { id: 'filter.FinalFilter1', label: 'FinalFilter1' },
        { id: 'filter.FinalFilter2', label: 'FinalFilter2' },
      ])
    })

    test('should handle time period operations with filter operations', () => {
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      act(() => {
        const [, actions] = result.current
        actions.updateFilters([
          { id: 'location.Leicester', label: 'Leicester' },
          { id: 'location.London', label: 'London' },
          { id: 'vaccine.6-in-1', label: '6-in-1' },
        ])
      })

      act(() => {
        const [, actions] = result.current
        actions.addFilter({ id: 'filter.TestFilter', label: 'TestFilter' })
      })

      act(() => {
        const [, actions] = result.current
        actions.setTimePeriods(mockTimePeriods)
      })

      act(() => {
        const [, actions] = result.current
        actions.setSelectedTimePeriod(mockTimePeriods[1])
      })

      act(() => {
        const [, actions] = result.current
        actions.removeFilter('location.Leicester')
      })

      const [state] = result.current
      expect(state.selectedFilters).toEqual([
        { id: 'location.London', label: 'London' },
        { id: 'vaccine.6-in-1', label: '6-in-1' },
        { id: 'filter.TestFilter', label: 'TestFilter' },
      ])
      expect(state.timePeriods).toEqual(mockTimePeriods)
      expect(state.selectedTimePeriod).toEqual(mockTimePeriods[1])
    })

    test('should maintain state consistency after clearing and setting again', () => {
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      act(() => {
        const [, actions] = result.current
        actions.setTimePeriods(mockTimePeriods)
      })

      act(() => {
        const [, actions] = result.current
        actions.clearTimePeriods()
      })

      act(() => {
        const [, actions] = result.current
        actions.clearFilters()
      })

      act(() => {
        const [, actions] = result.current
        actions.addFilter({ id: 'filter.NewFilter', label: 'NewFilter' })
      })

      act(() => {
        const [, actions] = result.current
        actions.setTimePeriods([mockTimePeriods[0]])
      })

      const [state] = result.current
      expect(state.selectedFilters).toEqual([{ id: 'filter.NewFilter', label: 'NewFilter' }])
      expect(state.timePeriods).toEqual([mockTimePeriods[0]])
      expect(state.selectedTimePeriod).toEqual(mockTimePeriods[0])
    })
  })

  describe('State immutability', () => {
    test('should not mutate original filters array when adding filter', () => {
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })
      const originalFilters = result.current[0].selectedFilters

      act(() => {
        const [, actions] = result.current
        actions.addFilter({ id: 'filter.NewFilter', label: 'NewFilter' })
      })

      const [newState] = result.current
      expect(originalFilters).not.toBe(newState.selectedFilters)
      expect(originalFilters).not.toContainEqual({ id: 'filter.NewFilter', label: 'NewFilter' })
    })

    test('should not mutate time periods array when setting', () => {
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })
      const periodsToSet = [...mockTimePeriods]

      act(() => {
        const [, actions] = result.current
        actions.setTimePeriods(periodsToSet)
      })

      const [state] = result.current
      expect(state.timePeriods).toEqual(periodsToSet)
    })
  })
})
