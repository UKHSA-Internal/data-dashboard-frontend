import userEvent from '@testing-library/user-event'
import React from 'react'

import { TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { render, screen } from '@/config/test-utils'

import { TimePeriodSelector } from './TimePeriodSelector'

const mockTimePeriods: TimePeriod[] = [
  {
    id: 'period-1',
    type: 'time_period',
    value: {
      label: '2021',
      date_from: '2021-01-01',
      date_to: '2021-12-31',
    },
  },
  {
    id: 'period-2',
    type: 'time_period',
    value: {
      label: '2022',
      date_from: '2022-01-01',
      date_to: '2022-12-31',
    },
  },
  {
    id: 'period-3',
    type: 'time_period',
    value: {
      label: '2023',
      date_from: '2023-01-01',
      date_to: '2023-12-31',
    },
  },
]

describe('TimePeriodSelector', () => {
  const mockOnTimePeriodChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    console.error = jest.fn()
  })

  describe('Rendering', () => {
    test('renders with custom title', () => {
      render(
        <TimePeriodSelector
          timePeriods={mockTimePeriods}
          currentTimePeriodIndex={1}
          onTimePeriodChange={mockOnTimePeriodChange}
          timePeriodTitle="Custom Title"
        />
      )

      expect(screen.getByText('Custom Title:')).toBeInTheDocument()
      expect(screen.getByText('2022')).toBeInTheDocument()
    })

    test('renders with default title when timePeriodTitle is empty string', () => {
      render(
        <TimePeriodSelector
          timePeriods={mockTimePeriods}
          currentTimePeriodIndex={1}
          onTimePeriodChange={mockOnTimePeriodChange}
          timePeriodTitle=""
        />
      )

      expect(screen.getByText('Year selection:')).toBeInTheDocument()
    })

    test('renders with default title when timePeriodTitle is not provided', () => {
      render(
        <TimePeriodSelector
          timePeriods={mockTimePeriods}
          currentTimePeriodIndex={1}
          onTimePeriodChange={mockOnTimePeriodChange}
          timePeriodTitle={''}
        />
      )

      expect(screen.getByText('Year selection:')).toBeInTheDocument()
    })

    test('displays current time period label', () => {
      render(
        <TimePeriodSelector
          timePeriods={mockTimePeriods}
          currentTimePeriodIndex={0}
          onTimePeriodChange={mockOnTimePeriodChange}
          timePeriodTitle="Test Title"
        />
      )

      expect(screen.getByText('2021')).toBeInTheDocument()
    })

    test('displays "No period selected" when current period is missing', () => {
      render(
        <TimePeriodSelector
          timePeriods={mockTimePeriods}
          currentTimePeriodIndex={10}
          onTimePeriodChange={mockOnTimePeriodChange}
          timePeriodTitle="Test Title"
        />
      )

      expect(screen.getByText('No period selected')).toBeInTheDocument()
    })

    test('renders decrease and increase buttons', () => {
      render(
        <TimePeriodSelector
          timePeriods={mockTimePeriods}
          currentTimePeriodIndex={1}
          onTimePeriodChange={mockOnTimePeriodChange}
          timePeriodTitle="Test Title"
        />
      )

      const decreaseButton = screen.getByRole('button', { name: '-' })
      const increaseButton = screen.getByRole('button', { name: '+' })

      expect(decreaseButton).toBeInTheDocument()
      expect(increaseButton).toBeInTheDocument()
    })
  })

  describe('Button Interactions', () => {
    test('calls onTimePeriodChange with decreased index when decrease button is clicked', async () => {
      const user = userEvent.setup()

      render(
        <TimePeriodSelector
          timePeriods={mockTimePeriods}
          currentTimePeriodIndex={1}
          onTimePeriodChange={mockOnTimePeriodChange}
          timePeriodTitle="Test Title"
        />
      )

      const decreaseButton = screen.getByRole('button', { name: '-' })
      await user.click(decreaseButton)

      expect(mockOnTimePeriodChange).toHaveBeenCalledTimes(1)
      expect(mockOnTimePeriodChange).toHaveBeenCalledWith(0)
    })

    test('calls onTimePeriodChange with increased index when increase button is clicked', async () => {
      const user = userEvent.setup()

      render(
        <TimePeriodSelector
          timePeriods={mockTimePeriods}
          currentTimePeriodIndex={1}
          onTimePeriodChange={mockOnTimePeriodChange}
          timePeriodTitle="Test Title"
        />
      )

      const increaseButton = screen.getByRole('button', { name: '+' })
      await user.click(increaseButton)

      expect(mockOnTimePeriodChange).toHaveBeenCalledTimes(1)
      expect(mockOnTimePeriodChange).toHaveBeenCalledWith(2)
    })

    test('does not call onTimePeriodChange when decrease button is clicked at first period', async () => {
      const user = userEvent.setup()

      render(
        <TimePeriodSelector
          timePeriods={mockTimePeriods}
          currentTimePeriodIndex={0}
          onTimePeriodChange={mockOnTimePeriodChange}
          timePeriodTitle="Test Title"
        />
      )

      const decreaseButton = screen.getByRole('button', { name: '-' })
      await user.click(decreaseButton)

      expect(mockOnTimePeriodChange).not.toHaveBeenCalled()
    })

    test('does not call onTimePeriodChange when increase button is clicked at last period', async () => {
      const user = userEvent.setup()

      render(
        <TimePeriodSelector
          timePeriods={mockTimePeriods}
          currentTimePeriodIndex={2}
          onTimePeriodChange={mockOnTimePeriodChange}
          timePeriodTitle="Test Title"
        />
      )

      const increaseButton = screen.getByRole('button', { name: '+' })
      await user.click(increaseButton)

      expect(mockOnTimePeriodChange).not.toHaveBeenCalled()
    })
  })

  describe('Button Disabled States', () => {
    test('decrease button is disabled at first period', () => {
      render(
        <TimePeriodSelector
          timePeriods={mockTimePeriods}
          currentTimePeriodIndex={0}
          onTimePeriodChange={mockOnTimePeriodChange}
          timePeriodTitle="Test Title"
        />
      )

      const decreaseButton = screen.getByRole('button', { name: '-' })
      expect(decreaseButton).toBeDisabled()
    })

    test('decrease button is enabled when not at first period', () => {
      render(
        <TimePeriodSelector
          timePeriods={mockTimePeriods}
          currentTimePeriodIndex={1}
          onTimePeriodChange={mockOnTimePeriodChange}
          timePeriodTitle="Test Title"
        />
      )

      const decreaseButton = screen.getByRole('button', { name: '-' })
      expect(decreaseButton).not.toBeDisabled()
    })

    test('increase button is disabled at last period', () => {
      render(
        <TimePeriodSelector
          timePeriods={mockTimePeriods}
          currentTimePeriodIndex={2}
          onTimePeriodChange={mockOnTimePeriodChange}
          timePeriodTitle="Test Title"
        />
      )

      const increaseButton = screen.getByRole('button', { name: '+' })
      expect(increaseButton).toBeDisabled()
    })

    test('increase button is enabled when not at last period', () => {
      render(
        <TimePeriodSelector
          timePeriods={mockTimePeriods}
          currentTimePeriodIndex={1}
          onTimePeriodChange={mockOnTimePeriodChange}
          timePeriodTitle="Test Title"
        />
      )

      const increaseButton = screen.getByRole('button', { name: '+' })
      expect(increaseButton).not.toBeDisabled()
    })
  })

  describe('Edge Cases', () => {
    test('handles single time period', () => {
      const singlePeriod: TimePeriod[] = [mockTimePeriods[0]]

      render(
        <TimePeriodSelector
          timePeriods={singlePeriod}
          currentTimePeriodIndex={0}
          onTimePeriodChange={mockOnTimePeriodChange}
          timePeriodTitle="Test Title"
        />
      )

      const decreaseButton = screen.getByRole('button', { name: '-' })
      const increaseButton = screen.getByRole('button', { name: '+' })

      expect(decreaseButton).toBeDisabled()
      expect(increaseButton).toBeDisabled()
      expect(screen.getByText('2021')).toBeInTheDocument()
    })

    test('handles empty time periods array', () => {
      render(
        <TimePeriodSelector
          timePeriods={[]}
          currentTimePeriodIndex={0}
          onTimePeriodChange={mockOnTimePeriodChange}
          timePeriodTitle="Test Title"
        />
      )

      expect(screen.getByText('No period selected')).toBeInTheDocument()
    })
  })
})
