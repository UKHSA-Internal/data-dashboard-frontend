import userEvent from '@testing-library/user-event'
import { useRouter, useSearchParams } from 'next/navigation'

import { getSelectOptions } from '@/app/utils/chart.utils'
import { fireEvent, render, screen } from '@/config/test-utils'

import ChartSelect from './ChartSelect'

// Mock the next/navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

const mockRouter = {
  replace: jest.fn(),
}

const mockSearchParams = new URLSearchParams()

// Mock the useChartFilterState hook
jest.mock('@/app/hooks/useChartFilterState', () => ({
  useChartFilterState: (chartId: string, timespan: { years: number; months: number }) => {
    // Mock sessionStorage
    const mockStorage: Record<string, string> = {}
    const storageKey = `chart-filter-${chartId}`

    return [
      mockStorage[storageKey] || (timespan.years >= 2 ? '1-year' : 'all'),
      (value: string) => {
        mockStorage[storageKey] = value
      },
    ]
  },
}))

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

      const expectedParams = new URLSearchParams()
      expectedParams.set('timeseriesFilter', 'test-chart|1-month')

      expect(mockRouter.replace).toHaveBeenCalledWith(`?${expectedParams.toString()}`, { scroll: false })
    })

    test('preserves existing URL parameters when updating filter', () => {
      const existingParams = new URLSearchParams('areaType=Nation&areaName=England')
      ;(useSearchParams as jest.Mock).mockReturnValue(existingParams)

      render(<ChartSelect timespan={{ years: 1, months: 0 }} chartId="test-chart" />)

      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: 'test-chart|1-month' } })

      const expectedParams = new URLSearchParams('areaType=Nation&areaName=England')
      expectedParams.set('timeseriesFilter', 'test-chart|1-month')

      expect(mockRouter.replace).toHaveBeenCalledWith(`?${expectedParams.toString()}`, { scroll: false })
    })

    test('removes filter when selecting "All" with other URL params', () => {
      const existingParams = new URLSearchParams('areaType=Nation&timeseriesFilter=test-chart|1-month')
      ;(useSearchParams as jest.Mock).mockReturnValue(existingParams)

      render(<ChartSelect timespan={{ years: 1, months: 0 }} chartId="test-chart" />)

      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: 'test-chart|all' } })

      const expectedParams = new URLSearchParams('areaType=Nation')
      expect(mockRouter.replace).toHaveBeenCalledWith(`?${expectedParams.toString()}`, { scroll: false })
    })

    test('removes filter when selecting "All" with no other URL params', () => {
      const existingParams = new URLSearchParams('timeseriesFilter=test-chart|1-month')
      ;(useSearchParams as jest.Mock).mockReturnValue(existingParams)

      render(<ChartSelect timespan={{ years: 1, months: 0 }} chartId="test-chart" />)

      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: 'test-chart|all' } })

      const expectedParams = new URLSearchParams()
      expect(mockRouter.replace).toHaveBeenCalledWith(`?${expectedParams.toString()}`, { scroll: false })
    })

    test('handles multiple filters correctly', () => {
      const existingParams = new URLSearchParams('areaType=Nation&timeseriesFilter=other-chart|3-months')
      ;(useSearchParams as jest.Mock).mockReturnValue(existingParams)

      render(<ChartSelect timespan={{ years: 1, months: 0 }} chartId="test-chart" />)

      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: 'test-chart|1-month' } })

      const expectedParams = new URLSearchParams('areaType=Nation')
      expectedParams.set('timeseriesFilter', 'other-chart|3-months;test-chart|1-month')

      expect(mockRouter.replace).toHaveBeenCalledWith(`?${expectedParams.toString()}`, { scroll: false })
    })

    test('replaces existing filter for same chart', () => {
      const existingParams = new URLSearchParams('areaType=Nation&timeseriesFilter=test-chart|3-months')
      ;(useSearchParams as jest.Mock).mockReturnValue(existingParams)

      render(<ChartSelect timespan={{ years: 1, months: 0 }} chartId="test-chart" />)

      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: 'test-chart|1-month' } })

      const expectedParams = new URLSearchParams('areaType=Nation')
      expectedParams.set('timeseriesFilter', 'test-chart|1-month')

      expect(mockRouter.replace).toHaveBeenCalledWith(`?${expectedParams.toString()}`, { scroll: false })
    })

    test('handles empty filters correctly', () => {
      const existingParams = new URLSearchParams('areaType=Nation&timeseriesFilter=')
      ;(useSearchParams as jest.Mock).mockReturnValue(existingParams)

      render(<ChartSelect timespan={{ years: 1, months: 0 }} chartId="test-chart" />)

      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: 'test-chart|1-month' } })

      const expectedParams = new URLSearchParams('areaType=Nation')
      expectedParams.set('timeseriesFilter', 'test-chart|1-month')

      expect(mockRouter.replace).toHaveBeenCalledWith(`?${expectedParams.toString()}`, { scroll: false })
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

    test('initializes with "1 Year" selected when no filter in URL and timespan >= 2 years', () => {
      render(<ChartSelect timespan={{ years: 2, months: 0 }} chartId="test-chart" />)

      const select = screen.getByRole('combobox') as HTMLSelectElement
      expect(select.value).toBe('test-chart|1-year')
    })

    test('initializes with "All" selected when no filter in URL and timespan < 2 years', () => {
      render(<ChartSelect timespan={{ years: 1, months: 6 }} chartId="test-chart" />)

      const select = screen.getByRole('combobox') as HTMLSelectElement
      expect(select.value).toBe('test-chart|all')
    })
  })

  test('renders with correct initial value based on timespan', () => {
    render(<ChartSelect timespan={{ years: 2, months: 0 }} chartId="test-chart" />)

    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('test-chart|1-year')
  })

  test('renders with "all" selected when timespan is less than 2 years', () => {
    render(<ChartSelect timespan={{ years: 1, months: 0 }} chartId="test-chart" />)

    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('test-chart|all')
  })

  test('updates selected value when changed', async () => {
    render(<ChartSelect timespan={{ years: 2, months: 0 }} chartId="test-chart" />)

    const select = screen.getByRole('combobox')
    await userEvent.selectOptions(select, 'test-chart|3-months')

    expect(select).toHaveValue('test-chart|3-months')
  })

  test('renders correct options based on timespan', () => {
    render(<ChartSelect timespan={{ years: 2, months: 0 }} chartId="test-chart" />)

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(5) // 1-month, 3-months, 6-months, 1-year, all
    expect(options[0]).toHaveValue('test-chart|1-month')
    expect(options[3]).toHaveValue('test-chart|1-year')
    expect(options[4]).toHaveValue('test-chart|all')
  })

  test('renders with correct GOV.UK classes', () => {
    render(<ChartSelect timespan={{ years: 1, months: 0 }} chartId="test-chart" />)

    expect(screen.getByRole('combobox')).toHaveClass('govuk-select')
    expect(screen.getByText('Filter data by')).toHaveClass('govuk-label')
    expect(screen.getByRole('combobox').parentElement).toHaveClass('govuk-form-group')
  })
})
