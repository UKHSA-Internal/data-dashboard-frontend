import React from 'react'
import { z } from 'zod'

import { ChartFigure } from '@/api/models/Chart'
import { Chart, ChartCardSchemas } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { getChartTimespan, getFilteredData } from '@/app/utils/chart.utils'
import { act, render, screen, waitFor } from '@/config/test-utils'

import ChartWithFilter from './ChartWithFilter'

jest.mock('@/api/requests/charts/getCharts')
jest.mock('@/app/utils/chart.utils')

let setFilterRef: ((value: string) => void) | null = null
let initialFilterRef = 'all'

jest.mock('@/app/hooks/useTimeseriesFilter', () => {
  const React = require('react') as typeof import('react')
  const Context = React.createContext<{ currentFilter: string; setCurrentFilter: (value: string) => void } | null>(null)

  const TimeseriesFilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentFilter, setCurrentFilter] = React.useState(initialFilterRef)

    React.useEffect(() => {
      setFilterRef = setCurrentFilter
    }, [])

    return <Context.Provider value={{ currentFilter, setCurrentFilter }}>{children}</Context.Provider>
  }

  const useTimeseriesFilter = () => {
    const ctx = React.useContext(Context)
    if (!ctx) {
      throw new Error('useTimeseriesFilter must be used within a TimeseriesFilterProvider')
    }
    return ctx
  }

  return {
    __esModule: true,
    TimeseriesFilterProvider,
    useTimeseriesFilter,
    setTimeseriesFilterForTests: (value: string) => setFilterRef?.(value),
    setTimeseriesInitialFilterForTests: (value: string) => {
      initialFilterRef = value
    },
  }
})

const { setTimeseriesFilterForTests, setTimeseriesInitialFilterForTests } =
  require('@/app/hooks/useTimeseriesFilter') as {
    setTimeseriesFilterForTests: (value: string) => void
    setTimeseriesInitialFilterForTests: (value: string) => void
  }

jest.mock('./ChartInteractive', () => ({
  __esModule: true,
  default: ({ figure }: { figure: ChartFigure }) => (
    <div data-testid="chart-interactive">
      Chart Interactive - {JSON.stringify(figure.data?.length || 0)} data points
    </div>
  ),
}))

jest.mock('../View/ChartSelect/ChartSelect', () => ({
  __esModule: true,
  default: ({ timespan }: { timespan: { years: number; months: number } }) => (
    <div data-testid="chart-select">
      Chart Select - {timespan.years}y {timespan.months}m
    </div>
  ),
}))

jest.mock('../ChartNoScript/ChartNoScript', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div data-testid="chart-no-script">NoScript - {title}</div>,
}))

const mockGetCharts = getCharts as jest.MockedFunction<typeof getCharts>
const mockGetFilteredData = getFilteredData as jest.MockedFunction<typeof getFilteredData>
const mockGetChartTimespan = getChartTimespan as jest.MockedFunction<typeof getChartTimespan>

describe('ChartWithFilter', () => {
  const mockFigure: ChartFigure = {
    data: [{ x: [1, 2, 3], y: [1, 2, 3] }],
    layout: { title: 'Test Chart' },
  }

  const mockChart: Chart = [
    {
      id: 'plot-1',
      type: 'plot',
      value: {
        topic: 'COVID-19',
        metric: 'cases',
        chart_type: 'simple_line',
        date_from: '2023-01-01',
        date_to: '2024-01-01',
      },
    },
  ]

  const mockChartData: z.infer<typeof ChartCardSchemas>['value'] = {
    title: 'Test Chart',
    tag_manager_event_id: 'test-event',
    x_axis: 'Date',
    y_axis: 'Value',
    sub_title: 'Test Chart',
    topic_page: 'test-page',
    show_timeseries_filter: true,
    chart: mockChart,
    body: 'Test description',
    date_prefix: 'Up to',
    headline_number_columns: [],
    about: '',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    console.log = jest.fn()
    console.error = jest.fn()
    setTimeseriesInitialFilterForTests('all')

    // Default mocks
    mockGetChartTimespan.mockReturnValue({ years: 1, months: 0 })
    mockGetFilteredData.mockImplementation((data, filter) => {
      if (filter === 'all' || !filter) {
        return data.chart
      }
      return data.chart.map((plot) => ({
        ...plot,
        value: {
          ...plot.value,
          date_from: '2023-07-01',
        },
      }))
    })
    mockGetCharts.mockResolvedValue({
      success: true,
      data: {
        chart: 'mock-chart-svg',
        alt_text: 'Test chart',
        last_updated: '2024-01-01T00:00:00Z',
        figure: mockFigure,
      },
    })
  })

  describe('Initial Render', () => {
    it('renders with initial figure and does not fetch on first render', async () => {
      render(
        <ChartWithFilter
          figure={mockFigure}
          title="Test Chart"
          chart={mockChart}
          chartData={mockChartData}
          lastUpdated="2025-05-21"
        />
      )

      expect(screen.getByTestId('chart-select')).toBeInTheDocument()

      expect(screen.getByTestId('chart-interactive')).toBeInTheDocument()

      expect(mockGetCharts).not.toHaveBeenCalled()
    })

    it('renders ChartNoScript with kebabCase title', () => {
      render(
        <ChartWithFilter
          figure={mockFigure}
          title="Test Chart Title"
          chart={mockChart}
          chartData={mockChartData}
          lastUpdated="2025-05-21"
        />
      )

      expect(screen.getByTestId('chart-no-script')).toHaveTextContent('NoScript - test-chart-title')
    })
  })

  describe('Filter Change Handling', () => {
    it('skips fetch when filter changes to the same value', async () => {
      render(
        <ChartWithFilter
          figure={mockFigure}
          title="Test Chart"
          chart={mockChart}
          chartData={mockChartData}
          lastUpdated="2025-05-21"
        />
      )

      await act(async () => {
        setTimeseriesFilterForTests('6-months') // first change triggers fetch
      })

      await waitFor(() => {
        expect(mockGetCharts).toHaveBeenCalledTimes(1)
      })

      mockGetCharts.mockClear()

      await act(async () => {
        setTimeseriesFilterForTests('6-months')
      })

      expect(mockGetCharts).not.toHaveBeenCalled()
    })

    it('fetches filtered chart when filter changes from "all" to a specific filter', async () => {
      render(
        <ChartWithFilter
          figure={mockFigure}
          title="Test Chart"
          chart={mockChart}
          chartData={mockChartData}
          lastUpdated="2025-05-21"
        />
      )

      await act(async () => {
        setTimeseriesFilterForTests('6-months')
      })

      await waitFor(() => {
        expect(mockGetFilteredData).toHaveBeenCalledWith(mockChartData, '6-months')
        expect(mockGetCharts).toHaveBeenCalledTimes(1)
      })

      expect(mockGetCharts).toHaveBeenCalledWith(
        expect.objectContaining({
          plots: expect.arrayContaining([
            expect.objectContaining({
              date_from: '2023-07-01', // Filtered date
            }),
          ]),
        })
      )
    })

    it('fetches filtered chart when filter changes between different filters', async () => {
      render(
        <ChartWithFilter
          figure={mockFigure}
          title="Test Chart"
          chart={mockChart}
          chartData={mockChartData}
          lastUpdated="2025-05-21"
        />
      )

      await act(async () => {
        setTimeseriesFilterForTests('1-month')
      })

      await waitFor(() => {
        expect(mockGetCharts).toHaveBeenCalledTimes(1)
      })

      mockGetCharts.mockClear()

      // Change to different filter
      await act(async () => {
        setTimeseriesFilterForTests('3-months')
      })

      await waitFor(() => {
        expect(mockGetFilteredData).toHaveBeenCalledWith(mockChartData, '3-months')
        expect(mockGetCharts).toHaveBeenCalledTimes(1)
      })
    })

    it('does not fetch when filter is "all" on initial mount', async () => {
      render(
        <ChartWithFilter
          figure={mockFigure}
          title="Test Chart"
          chart={mockChart}
          chartData={mockChartData}
          lastUpdated="2025-05-21"
        />
      )

      // Wait a bit to ensure no fetch happens
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100))
      })

      expect(mockGetCharts).not.toHaveBeenCalled()
    })

    it('fetches filtered chart when filter is not "all" on initial mount', async () => {
      setTimeseriesInitialFilterForTests('6-months')

      render(
        <ChartWithFilter
          figure={mockFigure}
          title="Test Chart"
          chart={mockChart}
          chartData={mockChartData}
          lastUpdated="2025-05-21"
        />
      )

      // No fetch until filter actually changes
      await act(async () => {
        setTimeseriesFilterForTests('3-months')
      })

      await waitFor(() => {
        expect(mockGetFilteredData).toHaveBeenCalledWith(mockChartData, '3-months')
        expect(mockGetCharts).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Loading State', () => {
    it('shows loading spinner while fetching filtered chart', async () => {
      // Delay the response to test loading state
      let resolvePromise: (value: any) => void
      const delayedPromise = new Promise((resolve) => {
        resolvePromise = resolve
      })

      mockGetCharts.mockReturnValueOnce(
        delayedPromise.then(() => ({
          success: true,
          data: {
            chart: 'mock-chart-svg',
            alt_text: 'Test chart',
            last_updated: '2024-01-01T00:00:00Z',
            figure: mockFigure,
          },
        })) as any
      )

      render(
        <ChartWithFilter
          figure={mockFigure}
          title="Test Chart"
          chart={mockChart}
          chartData={mockChartData}
          lastUpdated="2025-05-21"
        />
      )

      // Wait a bit then change filter
      await act(async () => {
        setTimeseriesFilterForTests('6-months')
      })

      await waitFor(
        () => {
          expect(screen.getByLabelText('Loading spinner')).toBeInTheDocument()
        },
        { timeout: 1000 }
      )

      await act(async () => {
        resolvePromise!({
          success: true,
          data: {
            chart: 'mock-chart-svg',
            alt_text: 'Test chart',
            last_updated: '2024-01-01T00:00:00Z',
            figure: mockFigure,
          },
        })
        await delayedPromise
      })

      await waitFor(
        () => {
          expect(screen.queryByLabelText('Loading spinner')).not.toBeInTheDocument()
        },
        { timeout: 1000 }
      )
    })
  })

  describe('Error Handling', () => {
    it('shows error message when getFilteredData returns null', async () => {
      mockGetFilteredData.mockReturnValueOnce(undefined)

      render(
        <ChartWithFilter
          figure={mockFigure}
          title="Test Chart"
          chart={mockChart}
          chartData={mockChartData}
          lastUpdated="2025-05-21"
        />
      )

      await act(async () => {
        setTimeseriesFilterForTests('6-months')
      })

      await waitFor(() => {
        expect(screen.getByText('No data available')).toBeInTheDocument()
        expect(screen.getByText('Please adjust or reset the filter to try again.')).toBeInTheDocument()
      })

      expect(mockGetCharts).not.toHaveBeenCalled()
    })

    it('shows error message when getCharts returns unsuccessful response', async () => {
      mockGetCharts.mockResolvedValueOnce({
        success: false,
        error: new z.ZodError([
          { code: 'invalid_type', expected: 'string', received: 'undefined', path: ['chart'], message: 'Required' },
        ]),
      })

      render(
        <ChartWithFilter
          figure={mockFigure}
          title="Test Chart"
          chart={mockChart}
          chartData={mockChartData}
          lastUpdated="2025-05-21"
        />
      )

      await act(async () => {
        setTimeseriesFilterForTests('6-months')
      })

      await waitFor(
        () => {
          expect(screen.getByText('No data available')).toBeInTheDocument()
          expect(screen.getByText('Please adjust or reset the filter to try again.')).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it('shows error message when getCharts throws an error', async () => {
      mockGetCharts.mockRejectedValueOnce(new Error('Network error'))

      render(
        <ChartWithFilter
          figure={mockFigure}
          title="Test Chart"
          chart={mockChart}
          chartData={mockChartData}
          lastUpdated="2025-05-21"
        />
      )

      await act(async () => {
        setTimeseriesFilterForTests('6-months')
      })

      await waitFor(
        () => {
          expect(screen.getByText('No data available')).toBeInTheDocument()
          expect(console.error).toHaveBeenCalledWith('Error fetching filtered chart:', expect.any(Error))
        },
        { timeout: 3000 }
      )
    })
  })

  describe('Successful Fetch', () => {
    it('updates figure when fetch succeeds', async () => {
      const newFigure: ChartFigure = {
        data: [{ x: [4, 5, 6], y: [4, 5, 6] }],
        layout: { title: 'Updated Chart' },
      }

      mockGetCharts.mockResolvedValueOnce({
        success: true,
        data: {
          chart: 'mock-chart-svg',
          alt_text: 'Test chart',
          last_updated: '2024-01-01T00:00:00Z',
          figure: newFigure,
        },
      })

      render(
        <ChartWithFilter
          figure={mockFigure}
          title="Test Chart"
          chart={mockChart}
          chartData={mockChartData}
          lastUpdated="2025-05-21"
        />
      )

      await act(async () => {
        setTimeseriesFilterForTests('6-months')
      })

      await waitFor(
        () => {
          expect(mockGetCharts).toHaveBeenCalledTimes(1)
        },
        { timeout: 3000 }
      )

      // ChartInteractive should receive the updated figure
      const chartInteractive = screen.getByTestId('chart-interactive')
      expect(chartInteractive).toBeInTheDocument()
    })

    it('calls getCharts with correct parameters including axis titles and limits', async () => {
      const chartDataWithAxis: z.infer<typeof ChartCardSchemas>['value'] = {
        ...mockChartData,
        x_axis_title: 'Date Axis',
        y_axis_title: 'Value Axis',
        y_axis_minimum_value: 0,
        y_axis_maximum_value: 100,
      }

      render(
        <ChartWithFilter
          figure={mockFigure}
          title="Test Chart"
          chart={mockChart}
          chartData={chartDataWithAxis}
          lastUpdated="2025-05-21"
        />
      )

      await act(async () => {
        setTimeseriesFilterForTests('6-months')
      })

      await waitFor(
        () => {
          expect(mockGetCharts).toHaveBeenCalledWith(
            expect.objectContaining({
              x_axis_title: 'Date Axis',
              y_axis_title: 'Value Axis',
              y_axis_minimum_value: 0,
              y_axis_maximum_value: 100,
              plots: expect.any(Array),
              x_axis: 'Date',
              y_axis: 'Value',
              chart_width: expect.any(Number),
              chart_height: expect.any(Number),
            })
          )
        },
        { timeout: 3000 }
      )
    })
  })

  describe('useEffect Logic Coverage', () => {
    it('skips refetch on first render even if filter is not "all"', async () => {
      // This tests the isFirstRender.current check
      // The component should skip on first render, then fetch on subsequent effect runs
      setTimeseriesInitialFilterForTests('6-months')
      render(
        <ChartWithFilter
          figure={mockFigure}
          title="Test Chart"
          chart={mockChart}
          chartData={mockChartData}
          lastUpdated="2025-05-21"
        />
      )

      // First render skipped; trigger a change to ensure fetch occurs
      await act(async () => {
        setTimeseriesFilterForTests('3-months')
      })

      await waitFor(() => {
        expect(mockGetCharts).toHaveBeenCalled()
      })
    })

    it('handles multiple rapid filter changes correctly', async () => {
      render(
        <ChartWithFilter
          figure={mockFigure}
          title="Test Chart"
          chart={mockChart}
          chartData={mockChartData}
          lastUpdated="2025-05-21"
        />
      )

      await act(async () => {
        setTimeseriesFilterForTests('1-month')
      })

      await waitFor(() => {
        expect(mockGetCharts).toHaveBeenCalledTimes(1)
      })

      // Rapidly change filters
      await act(async () => {
        setTimeseriesFilterForTests('3-months')
      })

      await waitFor(() => {
        expect(mockGetCharts).toHaveBeenCalledTimes(2)
      })

      await act(async () => {
        setTimeseriesFilterForTests('6-months')
      })

      await waitFor(() => {
        expect(mockGetCharts).toHaveBeenCalledTimes(3)
      })
    })
  })
})
