import { faker } from '@faker-js/faker'
import { ReactNode, useEffect } from 'react'

import { TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { render, waitFor } from '@/config/test-utils'

import { TimePeriodsHandler } from './TimePeriodsHandler'
import { TopicBodyContextProvider, useTopicBody } from './TopicBodyContext'

/* eslint-disable @typescript-eslint/no-explicit-any */
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

const emptyTimePeriods: TimePeriod[] = []

// Test wrapper component to capture context state
const TestWrapperWithState = ({
  children,
  onStateChange,
}: {
  children: ReactNode
  onStateChange?: (state: any) => void
}) => {
  return (
    <TopicBodyContextProvider>
      <StateCapture onStateChange={onStateChange} />
      {children}
    </TopicBodyContextProvider>
  )
}

// Helper component to capture state changes
const StateCapture = ({ onStateChange }: { onStateChange?: (state: any) => void }) => {
  const [state] = useTopicBody()

  useEffect(() => {
    onStateChange?.(state)
  }, [state, onStateChange])

  return null
}

// Simple wrapper without state capture
const TestWrapper = ({ children }: { children: ReactNode }) => (
  <TopicBodyContextProvider>{children}</TopicBodyContextProvider>
)

describe('TimePeriodsHandler', () => {
  describe('Component rendering', () => {
    test('should render without errors inside context provider', () => {
      // Arrange & Act
      const { container } = render(
        <TestWrapper>
          <TimePeriodsHandler timePeriods={mockTimePeriods} />
        </TestWrapper>
      )

      // Assert
      expect(container.firstChild).toBeNull() // Component returns null
    })

    test('should throw error when rendered outside context provider', () => {
      // Arrange
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})

      // Act & Assert
      expect(() => {
        render(<TimePeriodsHandler timePeriods={mockTimePeriods} />)
      }).toThrow('useTopicBody must be used within a TopicBodyContextProvider')

      consoleError.mockRestore()
    })

    test('should return null as JSX', () => {
      // Arrange & Act
      const { container } = render(
        <TestWrapper>
          <TimePeriodsHandler timePeriods={mockTimePeriods} />
        </TestWrapper>
      )

      // Assert
      expect(container.innerHTML).toBe('')
    })
  })

  describe('Time periods handling', () => {
    test('should set time periods when provided with non-empty array', async () => {
      // Arrange
      let capturedState: any = null
      const onStateChange = (state: any) => {
        capturedState = state
      }

      // Act
      render(
        <TestWrapperWithState onStateChange={onStateChange}>
          <TimePeriodsHandler timePeriods={mockTimePeriods} />
        </TestWrapperWithState>
      )

      // Assert
      await waitFor(() => {
        expect(capturedState).not.toBeNull()
        expect(capturedState.timePeriods).toEqual(mockTimePeriods)
        expect(capturedState.selectedTimePeriod).toEqual(mockTimePeriods[0]) // Auto-selected first one
      })
    })

    test('should not set time periods when provided with empty array', async () => {
      // Arrange
      let capturedState: any = null
      const onStateChange = (state: any) => {
        capturedState = state
      }

      // Act
      render(
        <TestWrapperWithState onStateChange={onStateChange}>
          <TimePeriodsHandler timePeriods={emptyTimePeriods} />
        </TestWrapperWithState>
      )

      // Assert
      await waitFor(() => {
        expect(capturedState).not.toBeNull()
        expect(capturedState.timePeriods).toEqual([])
        expect(capturedState.selectedTimePeriod).toBeNull()
      })
    })

    test('should update time periods when props change from empty to populated', async () => {
      // Arrange
      let capturedState: any = null
      const onStateChange = (state: any) => {
        capturedState = state
      }

      const { rerender } = render(
        <TestWrapperWithState onStateChange={onStateChange}>
          <TimePeriodsHandler timePeriods={emptyTimePeriods} />
        </TestWrapperWithState>
      )

      // Verify initial empty state
      await waitFor(() => {
        expect(capturedState?.timePeriods).toEqual([])
      })

      // Act
      rerender(
        <TestWrapperWithState onStateChange={onStateChange}>
          <TimePeriodsHandler timePeriods={mockTimePeriods} />
        </TestWrapperWithState>
      )

      // Assert
      await waitFor(() => {
        expect(capturedState.timePeriods).toEqual(mockTimePeriods)
        expect(capturedState.selectedTimePeriod).toEqual(mockTimePeriods[0])
      })
    })

    test('should update time periods when props change from populated to different populated array', async () => {
      // Arrange
      const newTimePeriods: TimePeriod[] = [
        {
          type: 'time_period',
          value: {
            label: '2025-2026',
            date_from: '2025-04-01',
            date_to: '2026-03-31',
          },
          id: faker.string.uuid(),
        },
      ]

      let capturedState: any = null
      const onStateChange = (state: any) => {
        capturedState = state
      }

      const { rerender } = render(
        <TestWrapperWithState onStateChange={onStateChange}>
          <TimePeriodsHandler timePeriods={mockTimePeriods} />
        </TestWrapperWithState>
      )

      // Verify initial state
      await waitFor(() => {
        expect(capturedState?.timePeriods).toEqual(mockTimePeriods)
      })

      // Act
      rerender(
        <TestWrapperWithState onStateChange={onStateChange}>
          <TimePeriodsHandler timePeriods={newTimePeriods} />
        </TestWrapperWithState>
      )

      // Assert
      await waitFor(() => {
        expect(capturedState.timePeriods).toEqual(newTimePeriods)
      })
    })

    test('should not update time periods when props change from populated to empty', async () => {
      // Arrange
      let capturedState: any = null
      const onStateChange = (state: any) => {
        capturedState = state
      }

      const { rerender } = render(
        <TestWrapperWithState onStateChange={onStateChange}>
          <TimePeriodsHandler timePeriods={mockTimePeriods} />
        </TestWrapperWithState>
      )

      // Verify initial state
      await waitFor(() => {
        expect(capturedState?.timePeriods).toEqual(mockTimePeriods)
      })

      // Act
      rerender(
        <TestWrapperWithState onStateChange={onStateChange}>
          <TimePeriodsHandler timePeriods={emptyTimePeriods} />
        </TestWrapperWithState>
      )

      // Assert - State should remain unchanged since empty array doesn't trigger update
      await waitFor(() => {
        expect(capturedState.timePeriods).toEqual(mockTimePeriods) // Should still be the original
      })
    })
  })

  describe('Edge cases', () => {
    test('should handle malformed time periods gracefully', async () => {
      // Arrange
      const malformedTimePeriods: any[] = [
        {
          type: 'time_period',
          value: { label: null, date_from: '2023-04-01', date_to: '2024-03-31' },
          id: faker.string.uuid(),
        },
        {
          type: 'time_period',
          value: { label: '2024-2025', date_from: '2024-04-01', date_to: '2025-03-31' },
          id: null,
        },
      ]

      let capturedState: any = null
      const onStateChange = (state: any) => {
        capturedState = state
      }

      // Act
      render(
        <TestWrapperWithState onStateChange={onStateChange}>
          <TimePeriodsHandler timePeriods={malformedTimePeriods} />
        </TestWrapperWithState>
      )

      // Assert - Should still attempt to set the periods
      await waitFor(() => {
        expect(capturedState.timePeriods).toEqual(malformedTimePeriods)
      })
    })

    test('should handle undefined timePeriods prop gracefully', async () => {
      // Arrange
      let capturedState: any = null
      const onStateChange = (state: any) => {
        capturedState = state
      }

      // Act
      render(
        <TestWrapperWithState onStateChange={onStateChange}>
          <TimePeriodsHandler timePeriods={undefined as any} />
        </TestWrapperWithState>
      )

      // Assert - Should not crash and should not update state
      await waitFor(() => {
        expect(capturedState.timePeriods).toEqual([])
        expect(capturedState.selectedTimePeriod).toBeNull()
      })
    })

    test('should handle time periods with missing value properties', async () => {
      // Arrange
      const incompleteTimePeriods: TimePeriod[] = [
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
            date_from: '', // Empty date
            date_to: '', // Empty date
          },
          id: faker.string.uuid(),
        },
      ]

      let capturedState: any = null
      const onStateChange = (state: any) => {
        capturedState = state
      }

      // Act
      render(
        <TestWrapperWithState onStateChange={onStateChange}>
          <TimePeriodsHandler timePeriods={incompleteTimePeriods} />
        </TestWrapperWithState>
      )

      // Assert
      await waitFor(() => {
        expect(capturedState.timePeriods).toEqual(incompleteTimePeriods)
        expect(capturedState.selectedTimePeriod).toEqual(incompleteTimePeriods[0])
      })
    })
  })

  describe('Integration with context', () => {
    test('should work alongside other context operations', async () => {
      // Arrange
      let capturedState: any = null
      const onStateChange = (state: any) => {
        capturedState = state
      }

      // Create a more controlled test component
      const TestComponent = ({ shouldAddFilter }: { shouldAddFilter: boolean }) => {
        const [, actions] = useTopicBody()

        useEffect(() => {
          if (shouldAddFilter) {
            actions.addFilter('TestFilter')
          }
        }, [shouldAddFilter]) // Use a boolean prop as dependency instead

        return null
      }

      const { rerender } = render(
        <TestWrapperWithState onStateChange={onStateChange}>
          <TimePeriodsHandler timePeriods={mockTimePeriods} />
          <TestComponent shouldAddFilter={false} />
        </TestWrapperWithState>
      )

      // Wait for initial state to be set
      await waitFor(() => {
        expect(capturedState?.timePeriods).toEqual(mockTimePeriods)
      })

      // Act - Trigger the filter addition
      rerender(
        <TestWrapperWithState onStateChange={onStateChange}>
          <TimePeriodsHandler timePeriods={mockTimePeriods} />
          <TestComponent shouldAddFilter={true} />
        </TestWrapperWithState>
      )

      // Assert
      await waitFor(() => {
        expect(capturedState.timePeriods).toEqual(mockTimePeriods)
        expect(capturedState.selectedTimePeriod).toEqual(mockTimePeriods[0])
        expect(capturedState.selectedFilters).toContain('TestFilter')
      })
    })

    test('should maintain existing context state when setting time periods', async () => {
      // Arrange
      let capturedState: any = null
      const onStateChange = (state: any) => {
        capturedState = state
      }

      const TestComponent = ({ shouldUpdateFilters }: { shouldUpdateFilters: boolean }) => {
        const [, actions] = useTopicBody()

        useEffect(() => {
          if (shouldUpdateFilters) {
            actions.updateFilters(['ExistingFilter1', 'ExistingFilter2'])
          }
        }, [shouldUpdateFilters])

        return null
      }

      const { rerender } = render(
        <TestWrapperWithState onStateChange={onStateChange}>
          <TestComponent shouldUpdateFilters={false} />
          <TimePeriodsHandler timePeriods={mockTimePeriods} />
        </TestWrapperWithState>
      )

      // Act - Trigger the filter update
      rerender(
        <TestWrapperWithState onStateChange={onStateChange}>
          <TestComponent shouldUpdateFilters={true} />
          <TimePeriodsHandler timePeriods={mockTimePeriods} />
        </TestWrapperWithState>
      )

      // Assert
      await waitFor(() => {
        expect(capturedState.selectedFilters).toEqual(['ExistingFilter1', 'ExistingFilter2'])
        expect(capturedState.timePeriods).toEqual(mockTimePeriods)
        expect(capturedState.selectedTimePeriod).toEqual(mockTimePeriods[0])
      })
    })
  })
})
