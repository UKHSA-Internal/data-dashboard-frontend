import { faker } from '@faker-js/faker'
import { ReactNode, useEffect } from 'react'

import { Vaccination } from '@/api/models/cms/Page/GlobalFilter'
import { render, waitFor } from '@/config/test-utils'

import { TopicBodyContextProvider, TopicBodyState, useTopicBody } from './TopicBodyContext'
import { VaccinationsHandler } from './VaccinationsHandler'

/* eslint-disable @typescript-eslint/no-explicit-any */

const mockVaccinations: Vaccination[] = [
  { id: faker.string.uuid(), label: 'Covid-19', category: 'virus' },
  { id: faker.string.uuid(), label: 'Flu', category: 'virus' },
]

const emptyVaccinations: Vaccination[] = []

const TestWrapperWithState = ({
  children,
  onStateChange,
}: {
  children: ReactNode
  onStateChange?: (state: TopicBodyState) => void
}) => (
  <TopicBodyContextProvider>
    <StateCapture onStateChange={onStateChange} />
    {children}
  </TopicBodyContextProvider>
)

const StateCapture = ({ onStateChange }: { onStateChange?: (state: TopicBodyState) => void }) => {
  const [state] = useTopicBody()
  useEffect(() => {
    onStateChange?.(state)
  }, [state, onStateChange])
  return null
}

describe('VaccinationSelectHandler', () => {
  test('should set vaccinations when provided with non-empty array', async () => {
    let capturedState: any = null
    const onStateChange = (state: TopicBodyState) => (capturedState = state)

    render(
      <TestWrapperWithState onStateChange={onStateChange}>
        <VaccinationsHandler vaccinations={mockVaccinations} />
      </TestWrapperWithState>
    )

    await waitFor(() => {
      expect(capturedState.vaccinations).toEqual(mockVaccinations)
      expect(capturedState.selectedVaccination).toBe(null)
    })
  })

  test('should not set vaccinations if empty array is passed', async () => {
    let capturedState: any = null
    const onStateChange = (state: TopicBodyState) => (capturedState = state)

    render(
      <TestWrapperWithState onStateChange={onStateChange}>
        <VaccinationsHandler vaccinations={emptyVaccinations} />
      </TestWrapperWithState>
    )

    await waitFor(() => {
      expect(capturedState.vaccinations).toEqual([])
      expect(capturedState.selectedVaccination).toBeNull()
    })
  })

  test('should update vaccinations when props change', async () => {
    let capturedState: any = null
    const onStateChange = (state: TopicBodyState) => (capturedState = state)

    const { rerender } = render(
      <TestWrapperWithState onStateChange={onStateChange}>
        <VaccinationsHandler vaccinations={emptyVaccinations} />
      </TestWrapperWithState>
    )

    await waitFor(() => {
      expect(capturedState.vaccinations).toEqual([])
    })

    rerender(
      <TestWrapperWithState onStateChange={onStateChange}>
        <VaccinationsHandler vaccinations={mockVaccinations} />
      </TestWrapperWithState>
    )

    await waitFor(() => {
      expect(capturedState.vaccinations).toEqual(mockVaccinations)
    })
  })

  test('should preserve other context state', async () => {
    let capturedState: any = null
    const onStateChange = (state: TopicBodyState) => (capturedState = state)

    const CustomComponent = () => {
      const [, actions] = useTopicBody()
      useEffect(() => {
        actions.updateFilters([
          { id: 'abc', label: 'abc' },
          { id: 'xyz', label: 'xyz' },
        ])
      }, [])
      return null
    }

    render(
      <TestWrapperWithState onStateChange={onStateChange}>
        <VaccinationsHandler vaccinations={mockVaccinations} />
        <CustomComponent />
      </TestWrapperWithState>
    )

    await waitFor(() => {
      expect(capturedState.selectedFilters).toEqual([
        { id: 'abc', label: 'abc' },
        { id: 'xyz', label: 'xyz' },
      ])
      expect(capturedState.vaccinations).toEqual(mockVaccinations)
    })
  })
})
