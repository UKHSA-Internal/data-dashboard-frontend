import userEvent from '@testing-library/user-event'
import React from 'react'

import { TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { render, screen } from '@/config/test-utils'

import { TimePeriodSelector } from './TimePeriodSelector'

describe('TimePeriodSelector', () => {
  const mockTimePeriods: TimePeriod[] = [
    { id: '1', value: { label: '2024-Q1', date_from: '2024-01-01', date_to: '2024-03-31' }, type: 'time_period' },
    { id: '2', value: { label: '2024-Q2', date_from: '2024-04-01', date_to: '2024-06-30' }, type: 'time_period' },
  ]

  const mockOnTimePeriodChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders with default title when timePeriodTitle is not provided', async () => {
    render(
      <TimePeriodSelector
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        onTimePeriodChange={mockOnTimePeriodChange}
        timePeriodTitle=""
      />
    )

    expect(screen.getByText('Year selection:')).toBeInTheDocument()
  })

  test('renders with custom title when timePeriodTitle is provided', async () => {
    render(
      <TimePeriodSelector
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        onTimePeriodChange={mockOnTimePeriodChange}
        timePeriodTitle="Custom Period"
      />
    )

    expect(screen.getByText('Custom Period:')).toBeInTheDocument()
  })

  test('displays the current time period label', async () => {
    render(
      <TimePeriodSelector
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        onTimePeriodChange={mockOnTimePeriodChange}
        timePeriodTitle="Quarter"
      />
    )

    expect(screen.getByText('2024-Q1')).toBeInTheDocument()
  })

  test('displays "No period selected" when current time period is undefined', async () => {
    render(
      <TimePeriodSelector
        timePeriods={[]}
        currentTimePeriodIndex={0}
        onTimePeriodChange={mockOnTimePeriodChange}
        timePeriodTitle="Quarter"
      />
    )

    expect(screen.getByText('No period selected')).toBeInTheDocument()
  })

  test('disables decrease button when on first period', async () => {
    render(
      <TimePeriodSelector
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        onTimePeriodChange={mockOnTimePeriodChange}
        timePeriodTitle="Quarter"
      />
    )

    const decreaseButton = screen.getByRole('button', { name: '-' })
    expect(decreaseButton).toBeDisabled()
  })

  test('disables increase button when on last period', async () => {
    render(
      <TimePeriodSelector
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={1}
        onTimePeriodChange={mockOnTimePeriodChange}
        timePeriodTitle="Quarter"
      />
    )

    const increaseButton = screen.getByRole('button', { name: '+' })
    expect(increaseButton).toBeDisabled()
  })

  test('enables both buttons when on middle period', async () => {
    const extendedMockTimePeriods: TimePeriod[] = [
      ...mockTimePeriods,
      { id: '3', value: { label: '2024-Q3', date_from: '2024-07-01', date_to: '2024-09-30' }, type: 'time_period' },
    ]

    render(
      <TimePeriodSelector
        timePeriods={extendedMockTimePeriods}
        currentTimePeriodIndex={1}
        onTimePeriodChange={mockOnTimePeriodChange}
        timePeriodTitle="Quarter"
      />
    )

    const decreaseButton = screen.getByRole('button', { name: '-' })
    const increaseButton = screen.getByRole('button', { name: '+' })

    expect(decreaseButton).not.toBeDisabled()
    expect(increaseButton).not.toBeDisabled()
  })

  test('calls onTimePeriodChange with decremented index when decrease button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <TimePeriodSelector
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={1}
        onTimePeriodChange={mockOnTimePeriodChange}
        timePeriodTitle="Quarter"
      />
    )

    const decreaseButton = screen.getByRole('button', { name: '-' })
    await user.click(decreaseButton)

    expect(mockOnTimePeriodChange).toHaveBeenCalledWith(0)
    expect(mockOnTimePeriodChange).toHaveBeenCalledTimes(1)
  })

  test('calls onTimePeriodChange with incremented index when increase button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <TimePeriodSelector
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        onTimePeriodChange={mockOnTimePeriodChange}
        timePeriodTitle="Quarter"
      />
    )

    const increaseButton = screen.getByRole('button', { name: '+' })
    await user.click(increaseButton)

    expect(mockOnTimePeriodChange).toHaveBeenCalledWith(1)
    expect(mockOnTimePeriodChange).toHaveBeenCalledTimes(1)
  })

  test('does not call onTimePeriodChange when decrease button is clicked on first period', async () => {
    const user = userEvent.setup()

    render(
      <TimePeriodSelector
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={0}
        onTimePeriodChange={mockOnTimePeriodChange}
        timePeriodTitle="Quarter"
      />
    )

    const decreaseButton = screen.getByRole('button', { name: '-' })
    await user.click(decreaseButton)

    expect(mockOnTimePeriodChange).not.toHaveBeenCalled()
  })

  test('does not call onTimePeriodChange when increase button is clicked on last period', async () => {
    const user = userEvent.setup()

    render(
      <TimePeriodSelector
        timePeriods={mockTimePeriods}
        currentTimePeriodIndex={1}
        onTimePeriodChange={mockOnTimePeriodChange}
        timePeriodTitle="Quarter"
      />
    )

    const increaseButton = screen.getByRole('button', { name: '+' })
    await user.click(increaseButton)

    expect(mockOnTimePeriodChange).not.toHaveBeenCalled()
  })

  test('handles single time period by disabling both buttons', async () => {
    const singlePeriod: TimePeriod[] = [
      { id: '1', value: { label: '2024-Q1', date_from: '2024-01-01', date_to: '2024-03-31' }, type: 'time_period' },
    ]

    render(
      <TimePeriodSelector
        timePeriods={singlePeriod}
        currentTimePeriodIndex={0}
        onTimePeriodChange={mockOnTimePeriodChange}
        timePeriodTitle="Quarter"
      />
    )

    const decreaseButton = screen.getByRole('button', { name: '-' })
    const increaseButton = screen.getByRole('button', { name: '+' })

    expect(decreaseButton).toBeDisabled()
    expect(increaseButton).toBeDisabled()
  })
})
