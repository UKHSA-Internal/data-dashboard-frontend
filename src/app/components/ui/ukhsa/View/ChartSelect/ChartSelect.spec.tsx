import { useRouter, useSearchParams } from 'next/navigation'

import { fireEvent, render, screen } from '@/config/test-utils'

import ChartSelect, { getSelectOptions } from './ChartSelect'

// Mock the next/navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

const mockRouter = {
  replace: jest.fn(),
}

const mockSearchParams = new URLSearchParams()

describe('ChartSelect Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams)
  })

  describe('getSelectOptions', () => {
    test('less than one year', () => {
      const result = getSelectOptions(0)
      expect(result).toEqual(['All'])
    })

    test('one to two years', () => {
      const result = getSelectOptions(1)
      expect(result).toEqual(['1 Month', '3 Months', '6 Months', 'All'])
    })

    test('8 years responds with 6-10y response', () => {
      const result = getSelectOptions(8)
      expect(result).toEqual(['1 Year', '2 Years', '3 Years', '4 Years', '5 Years', 'All'])
    })

    test('22 years responds with 20-25y response', () => {
      const result = getSelectOptions(22)
      expect(result).toEqual(['1 Year', '2 Years', '5 Years', '10 Years', '15 Years', 'All'])
    })
  })

  describe('Renders ChartSelect component correctly', () => {
    test('renders with correct label and select element', () => {
      render(<ChartSelect timespan={{ years: 1, months: 0 }} chartId="test-chart" />)

      expect(screen.getByLabelText('Filter data by')).toBeInTheDocument()
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    test('renders correct options based on timespan', () => {
      render(<ChartSelect timespan={{ years: 1, months: 0 }} chartId="test-chart" />)

      const options = screen.getAllByRole('option')
      expect(options).toHaveLength(4)
      expect(options.map((option) => option.textContent)).toEqual(['1 Month', '3 Months', '6 Months', 'All'])
    })

    //TODO: Add additional tests for other timespans
  })

  describe('Filter Handling', () => {
    test('updates URL when selecting a filter', () => {
      render(<ChartSelect timespan={{ years: 1, months: 0 }} chartId="test-chart" />)

      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: 'test-chart|1-month' } })

      expect(mockRouter.replace).toHaveBeenCalledWith('?timeseriesFilter=test-chart|1-month', { scroll: false })
    })

    test('preserves existing URL parameters when updating filter', () => {
      const existingParams = new URLSearchParams('areaType=Nation&areaName=England')
      ;(useSearchParams as jest.Mock).mockReturnValue(existingParams)

      render(<ChartSelect timespan={{ years: 1, months: 0 }} chartId="test-chart" />)

      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: 'test-chart|1-month' } })

      expect(mockRouter.replace).toHaveBeenCalledWith(
        '?areaType=Nation&areaName=England&timeseriesFilter=test-chart|1-month',
        { scroll: false }
      )
    })

    test('removes filter when selecting "All"', () => {
      const existingParams = new URLSearchParams('timeseriesFilter=test-chart|1-month')
      ;(useSearchParams as jest.Mock).mockReturnValue(existingParams)

      render(<ChartSelect timespan={{ years: 1, months: 0 }} chartId="test-chart" />)

      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: 'test-chart|all' } })

      expect(mockRouter.replace).toHaveBeenCalledWith('?', { scroll: false })
    })

    test('handles multiple filters correctly', () => {
      const existingParams = new URLSearchParams('timeseriesFilter=other-chart|3-months')
      ;(useSearchParams as jest.Mock).mockReturnValue(existingParams)

      render(<ChartSelect timespan={{ years: 1, months: 0 }} chartId="test-chart" />)

      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: 'test-chart|1-month' } })

      expect(mockRouter.replace).toHaveBeenCalledWith('?timeseriesFilter=other-chart|3-months;test-chart|1-month', {
        scroll: false,
      })
    })
  })

  describe('Initial State', () => {
    test('initializes with correct selected value from URL params', () => {
      const existingParams = new URLSearchParams('timeseriesFilter=test-chart|1-month')
      ;(useSearchParams as jest.Mock).mockReturnValue(existingParams)

      render(<ChartSelect timespan={{ years: 1, months: 0 }} chartId="test-chart" />)

      const select = screen.getByRole('combobox') as HTMLSelectElement
      expect(select.value).toBe('test-chart|1-month')
    })

    test('initializes with "All" selected when no filter in URL', () => {
      render(<ChartSelect timespan={{ years: 1, months: 0 }} chartId="test-chart" />)

      const select = screen.getByRole('combobox') as HTMLSelectElement
      expect(select.value).toBe('test-chart|all')
    })
  })
})
