import React from 'react'

import { TimeseriesFilterProvider } from '@/app/hooks/useTimeseriesFilter'
import { fireEvent, render, screen } from '@/config/test-utils'

import ChartSelect, { getSelectOptions } from './ChartSelect'

const renderWithProvider = (component: React.ReactElement) => {
  return render(<TimeseriesFilterProvider>{component}</TimeseriesFilterProvider>)
}

describe('ChartSelect Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getSelectOptions', () => {
    test('less than 6 months', () => {
      const result = getSelectOptions({ years: 0, months: 5 })
      expect(result).toEqual(['All'])
    })

    test('six months to two years', () => {
      const result = getSelectOptions({ years: 0, months: 6 })
      expect(result).toEqual(['1 Month', '3 Months', '6 Months', 'All'])
    })

    test('if months is equal to 9', () => {
      const result = getSelectOptions({ years: 0, months: 9 })
      expect(result).toEqual(['1 Month', '3 Months', '6 Months', 'All'])
    })

    test('one to two years', () => {
      const result = getSelectOptions({ years: 1, months: 0 })
      expect(result).toEqual(['1 Month', '3 Months', '6 Months', 'All'])
    })

    test('8 years responds with 6-10y response', () => {
      const result = getSelectOptions({ years: 8, months: 0 })
      expect(result).toEqual(['1 Year', '2 Years', '3 Years', '4 Years', '5 Years', 'All'])
    })

    test('22 years responds with 20-25y response', () => {
      const result = getSelectOptions({ years: 22, months: 0 })
      expect(result).toEqual(['1 Year', '2 Years', '5 Years', '10 Years', '15 Years', 'All'])
    })
  })

  describe('Renders ChartSelect component correctly', () => {
    test('renders with correct label and select element', () => {
      renderWithProvider(<ChartSelect timespan={{ years: 1, months: 0 }} />)

      expect(screen.getByLabelText('Filter data by')).toBeInTheDocument()
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    test('renders correct options based on timespan', () => {
      renderWithProvider(<ChartSelect timespan={{ years: 1, months: 0 }} />)

      const options = screen.getAllByRole('option')
      expect(options).toHaveLength(4)
      expect(options.map((option) => option.textContent)).toEqual(['1 Month', '3 Months', '6 Months', 'All'])
    })

    //TODO: Add additional tests for other timespans
  })

  describe('Filter Handling', () => {
    test('updates context when selecting a filter', () => {
      renderWithProvider(<ChartSelect timespan={{ years: 1, months: 0 }} />)

      const select = screen.getByRole('combobox') as HTMLSelectElement
      expect(select.value).toBe('all')

      fireEvent.change(select, { target: { value: '1-month' } })

      expect(select.value).toBe('1-month')
    })

    test('updates context when selecting different filter options', () => {
      renderWithProvider(<ChartSelect timespan={{ years: 1, months: 0 }} />)

      const select = screen.getByRole('combobox') as HTMLSelectElement

      fireEvent.change(select, { target: { value: '3-months' } })
      expect(select.value).toBe('3-months')

      fireEvent.change(select, { target: { value: '6-months' } })
      expect(select.value).toBe('6-months')

      fireEvent.change(select, { target: { value: 'all' } })
      expect(select.value).toBe('all')
    })
  })

  describe('Initial State', () => {
    test('initializes with "all" selected by default', () => {
      renderWithProvider(<ChartSelect timespan={{ years: 1, months: 0 }} />)

      const select = screen.getByRole('combobox') as HTMLSelectElement
      expect(select.value).toBe('all')
    })

    test('displays correct option values based on timespan', () => {
      renderWithProvider(<ChartSelect timespan={{ years: 1, months: 0 }} />)

      const select = screen.getByRole('combobox') as HTMLSelectElement
      const options = Array.from(select.options)

      expect(options.map((opt) => opt.value)).toEqual(['1-month', '3-months', '6-months', 'all'])
      expect(options.map((opt) => opt.textContent)).toEqual(['1 Month', '3 Months', '6 Months', 'All'])
    })
  })
})
