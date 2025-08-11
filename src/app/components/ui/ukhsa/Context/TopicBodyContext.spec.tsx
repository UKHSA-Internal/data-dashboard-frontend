import { faker } from '@faker-js/faker'
import React, { ReactNode } from 'react'

import { TimePeriod, Vaccination } from '@/api/models/cms/Page/GlobalFilter'
import { act, render, renderHook } from '@/config/test-utils'

import { TopicBodyContextProvider, TopicBodyState, useTopicBody, useTopicBodyFilters } from './TopicBodyContext'

// Mock data for testing
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
  describe('useTopicBodyFilters hook', () => {
    test('should initialize with default state', () => {
      // Arrange & Act
      const { result } = renderHook(() => useTopicBodyFilters())
      const [state] = result.current

      // Assert
      expect(state.selectedFilters).toEqual(['Leicester', 'London', '6-in-1'])
      expect(state.timePeriods).toEqual([])
      expect(state.selectedTimePeriod).toBeNull()
      expect(state.vaccinations).toEqual([])
      expect(state.selectedVaccination).toBeNull()
    })

    test('should initialize with provided state', () => {
      // Arrange
      const customState: TopicBodyState = {
        selectedFilters: ['Custom', 'Filters'],
        timePeriods: mockTimePeriods,
        selectedTimePeriod: mockTimePeriods[0],
        vaccinations: [],
        selectedVaccination: null,
      }

      // Act
      const { result } = renderHook(() => useTopicBodyFilters(customState))
      const [state] = result.current

      // Assert
      expect(state.selectedFilters).toEqual(['Custom', 'Filters'])
      expect(state.timePeriods).toEqual([])
      expect(state.selectedTimePeriod).toBeNull()
    })
  })

  describe('Filter actions', () => {
    test('should update filters correctly', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })
      const newFilters = ['Filter1', 'Filter2', 'Filter3']

      // Act
      act(() => {
        const [, actions] = result.current
        actions.updateFilters(newFilters)
      })

      // Assert
      const [state] = result.current
      expect(state.selectedFilters).toEqual(newFilters)
    })

    test('should add filter when not already present', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })
      const newFilter = 'NewFilter'

      // Act
      act(() => {
        const [, actions] = result.current
        actions.addFilter(newFilter)
      })

      // Assert
      const [state] = result.current
      expect(state.selectedFilters).toContain(newFilter)
      expect(state.selectedFilters).toEqual(['Leicester', 'London', '6-in-1', newFilter])
    })

    test('should not add duplicate filter', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })
      const existingFilter = 'Leicester'

      // Act
      act(() => {
        const [, actions] = result.current
        actions.addFilter(existingFilter)
      })

      // Assert
      const [state] = result.current
      expect(state.selectedFilters).toEqual(['Leicester', 'London', '6-in-1'])
      expect(state.selectedFilters.filter((filter) => filter === existingFilter)).toHaveLength(1)
    })

    test('should remove filter correctly', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })
      const filterToRemove = 'London'

      // Act
      act(() => {
        const [, actions] = result.current
        actions.removeFilter(filterToRemove)
      })

      // Assert
      const [state] = result.current
      expect(state.selectedFilters).not.toContain(filterToRemove)
      expect(state.selectedFilters).toEqual(['Leicester', '6-in-1'])
    })

    test('should handle removing non-existent filter gracefully', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })
      const nonExistentFilter = 'NonExistent'

      // Act
      act(() => {
        const [, actions] = result.current
        actions.removeFilter(nonExistentFilter)
      })

      // Assert
      const [state] = result.current
      expect(state.selectedFilters).toEqual(['Leicester', 'London', '6-in-1'])
    })

    test('should clear all filters', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      // Act
      act(() => {
        const [, actions] = result.current
        actions.clearFilters()
      })

      // Assert
      const [state] = result.current
      expect(state.selectedFilters).toEqual([])
    })
  })

  describe('Time period actions', () => {
    test('should set time periods and auto-select first one when none selected', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      // Act
      act(() => {
        const [, actions] = result.current
        actions.setTimePeriods(mockTimePeriods)
      })

      // Assert
      const [state] = result.current
      expect(state.timePeriods).toEqual(mockTimePeriods)
      expect(state.selectedTimePeriod).toEqual(mockTimePeriods[0])
    })

    test('should set time periods without changing selected when one already selected', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      // Act
      act(() => {
        const [, actions] = result.current
        actions.setSelectedTimePeriod(mockTimePeriods[1])
      })

      act(() => {
        const [, actions] = result.current
        actions.setTimePeriods(mockTimePeriods)
      })

      // Assert
      const [state] = result.current
      expect(state.timePeriods).toEqual(mockTimePeriods)
      expect(state.selectedTimePeriod).toEqual(mockTimePeriods[1])
    })

    test('should set time periods with empty array', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      // Act
      act(() => {
        const [, actions] = result.current
        actions.setTimePeriods([])
      })

      // Assert
      const [state] = result.current
      expect(state.timePeriods).toEqual([])
      expect(state.selectedTimePeriod).toBeNull()
    })

    test('should set selected time period', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })
      const selectedPeriod = mockTimePeriods[1]

      // Act
      act(() => {
        const [, actions] = result.current
        actions.setSelectedTimePeriod(selectedPeriod)
      })

      // Assert
      const [state] = result.current
      expect(state.selectedTimePeriod).toEqual(selectedPeriod)
    })

    test('should set selected time period to null', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      // Act
      act(() => {
        const [, actions] = result.current
        actions.setSelectedTimePeriod(mockTimePeriods[0])
        actions.setSelectedTimePeriod(null)
      })

      // Assert
      const [state] = result.current
      expect(state.selectedTimePeriod).toBeNull()
    })

    test('should clear time periods and selected time period', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      // Act
      act(() => {
        const [, actions] = result.current
        actions.setTimePeriods(mockTimePeriods)
        actions.clearTimePeriods()
      })

      // Assert
      const [state] = result.current
      expect(state.timePeriods).toEqual([])
      expect(state.selectedTimePeriod).toBeNull()
    })
  })

  describe('Vaccination actions', () => {
    test('should set vaccinations and auto-select the first one when none selected', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      // Act
      act(() => {
        const [, actions] = result.current
        actions.setVaccinations(mockVaccinations)
      })

      // Assert
      const [state] = result.current
      expect(state.vaccinations).toEqual(mockVaccinations)
      expect(state.selectedVaccination).toEqual(mockVaccinations[0])
    })

    test('should set vaccinations without changing selected if one already selected', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      // Act
      act(() => {
        const [, actions] = result.current
        actions.setSelectedVaccination(mockVaccinations[1])
      })

      act(() => {
        const [, actions] = result.current
        actions.setVaccinations(mockVaccinations)
      })

      // Assert
      const [state] = result.current
      expect(state.vaccinations).toEqual(mockVaccinations)
      expect(state.selectedVaccination).toEqual(mockVaccinations[1])
    })

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

    test('should set selected vaccination', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      // Act
      act(() => {
        const [, actions] = result.current
        actions.setSelectedVaccination(mockVaccinations[1])
      })

      // Assert
      const [state] = result.current
      expect(state.selectedVaccination).toEqual(mockVaccinations[1])
    })

    test('should set selected vaccination to null', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      // Act
      act(() => {
        const [, actions] = result.current
        actions.setSelectedVaccination(mockVaccinations[0])
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
      // Arrange & Act
      const { result } = renderHook(() => useTopicBody(), {
        wrapper: TestWrapper,
      })

      // Assert
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
      // Arrange & Act & Assert
      expect(() => {
        renderHook(() => useTopicBody())
      }).toThrow('useTopicBody must be used within a TopicBodyContextProvider')
    })

    test('should render children correctly', () => {
      // Arrange
      const TestChild = () => <div data-testid="test-child">Test Child</div>

      // Act
      const { getByTestId } = render(
        <TopicBodyContextProvider>
          <TestChild />
        </TopicBodyContextProvider>
      )

      // Assert
      expect(getByTestId('test-child')).toBeInTheDocument()
    })
  })

  describe('Complex scenarios', () => {
    test('should handle multiple filter operations in sequence', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      // Act
      act(() => {
        const [, actions] = result.current
        actions.addFilter('NewFilter1')
        actions.addFilter('NewFilter2')
        actions.removeFilter('London')
        actions.updateFilters(['FinalFilter1', 'FinalFilter2'])
      })

      // Assert
      const [state] = result.current
      expect(state.selectedFilters).toEqual(['FinalFilter1', 'FinalFilter2'])
    })

    test('should handle time period operations with filter operations', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      // Act
      act(() => {
        const [, actions] = result.current
        actions.addFilter('TestFilter')
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
        actions.removeFilter('Leicester')
      })

      // Assert
      const [state] = result.current
      expect(state.selectedFilters).toEqual(['London', '6-in-1', 'TestFilter'])
      expect(state.timePeriods).toEqual(mockTimePeriods)
      expect(state.selectedTimePeriod).toEqual(mockTimePeriods[1])
    })

    test('should maintain state consistency after clearing and setting again', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })

      // Act - Split into multiple act blocks to ensure state updates properly
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
        actions.addFilter('NewFilter')
      })

      act(() => {
        const [, actions] = result.current
        actions.setTimePeriods([mockTimePeriods[0]])
      })

      // Assert
      const [state] = result.current
      expect(state.selectedFilters).toEqual(['NewFilter'])
      expect(state.timePeriods).toEqual([mockTimePeriods[0]])
      expect(state.selectedTimePeriod).toEqual(mockTimePeriods[0])
    })
  })

  describe('State immutability', () => {
    test('should not mutate original filters array when adding filter', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })
      const originalFilters = result.current[0].selectedFilters

      // Act
      act(() => {
        const [, actions] = result.current
        actions.addFilter('NewFilter')
      })

      // Assert
      const [newState] = result.current
      expect(originalFilters).not.toBe(newState.selectedFilters)
      expect(originalFilters).not.toContain('NewFilter')
    })

    test('should not mutate time periods array when setting', () => {
      // Arrange
      const { result } = renderHook(() => useTopicBodyFilters(), {
        wrapper: TestWrapper,
      })
      const periodsToSet = [...mockTimePeriods]

      // Act
      act(() => {
        const [, actions] = result.current
        actions.setTimePeriods(periodsToSet)
      })

      // Assert
      const [state] = result.current
      expect(state.timePeriods).toEqual(periodsToSet)
    })
  })
})
