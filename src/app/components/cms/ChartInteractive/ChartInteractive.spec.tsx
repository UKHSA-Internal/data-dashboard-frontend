import { useIntersectionObserver, useResizeObserver, useWindowSize } from 'usehooks-ts'

import { fireEvent, render, screen } from '@/config/test-utils'
import { logger } from '@/lib/logger'

import ChartInteractive from './ChartInteractive'

const mockPlot = jest.fn()

jest.mock('react-plotly.js', () => ({
  __esModule: true,
  default: (props: any) => {
    mockPlot(props)
    return (
      <div data-testid="mock-plotly-chart">
        <button onClick={props.onInitialized}>init</button>
      </div>
    )
  },
}))

jest.mock('usehooks-ts', () => ({
  useIntersectionObserver: jest.fn(),
  useResizeObserver: jest.fn(),
  useWindowSize: jest.fn(),
}))

const mockUseIntersectionObserver = useIntersectionObserver as jest.Mock
const mockUseResizeObserver = useResizeObserver as jest.Mock
const mockUseWindowSize = useWindowSize as jest.Mock

const COMPACT_WIDTH = 514
const FULL_WIDTH = 1100
const SINGLE_COLUMN_WIDTH = 1023
const TWO_COLUMN_WIDTH = 1024

describe('ChartInteractive', () => {
  const figure = {
    data: [
      { x: [1, 2], y: [3, 4], type: 'scatter' },
      { x: [5, 6], y: [7, 8], type: 'scatter' },
    ],
    layout: { title: 'Base layout' },
  } as any

  const figure_config = {
    full: {
      data: [
        {
          x: [3, 4],
          y: [1, 2],
          hovertemplate: 'Full: %{y} (%{x|%d %b %Y})',
          orientation: 'h',
        },
        {
          x: [7, 8],
          y: [5, 6],
          hovertemplate: 'Full: %{y} (%{x|%d %b %Y})',
          orientation: 'h',
        },
      ],
      layout: { xaxis: { nticks: 10 } },
    },
    compact: {
      data: [
        {
          x: [11, 12],
          y: [9, 10],
          hovertemplate: 'Compact: %{x} (%{y|%d %b %Y})',
          orientation: 'v',
        },
        {
          x: [15, 16],
          y: [13, 14],
          hovertemplate: 'Compact: %{x} (%{y|%d %b %Y})',
          orientation: 'v',
        },
      ],
      layout: { xaxis: { nticks: 4 } },
    },
    compact_rotated: {
      data: [
        {
          x: [9, 10],
          y: [11, 12],
          hovertemplate: 'Compact rotated: %{y} (%{x|%d %b %Y})',
          orientation: 'h',
        },
        {
          x: [13, 14],
          y: [15, 16],
          hovertemplate: 'Compact rotated: %{y} (%{x|%d %b %Y})',
          orientation: 'h',
        },
      ],
      layout: { xaxis: { nticks: 2 }, height: 400 },
    },
  } as any

  const fallback = <div data-testid="fallback">Loading chart...</div>

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseIntersectionObserver.mockReturnValue({ isIntersecting: true, ref: jest.fn() })
    mockUseResizeObserver.mockRejectedValue({ width: FULL_WIDTH, height: 260 })
    mockUseWindowSize.mockReturnValue({ width: 1440, height: 900 })
  })

  test('renders only the fallback when the chart is not in view', () => {
    mockUseIntersectionObserver.mockReturnValue({ isIntersecting: false, ref: jest.fn() })

    render(<ChartInteractive fallbackUntilLoaded={fallback} figure={figure} chartHeight={260} />)

    expect(screen.getByTestId('fallback')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-plotly-chart')).not.toBeInTheDocument()
  })

  test('renders the plot when in view and hides the fallback once initialised', () => {
    render(<ChartInteractive fallbackUntilLoaded={fallback} figure={figure} chartHeight={260} />)

    expect(screen.getByTestId('mock-plotly-chart')).toBeInTheDocument()
    expect(screen.getByTestId('fallback')).toBeInTheDocument()

    fireEvent.click(screen.getByText('init'))

    expect(screen.queryByTestId('fallback')).not.toBeInTheDocument()
  })

  test('passes the original layout to Plot when there is no figure_config', () => {
    render(<ChartInteractive fallbackUntilLoaded={fallback} figure={figure} chartHeight={260} />)

    expect(mockPlot).toHaveBeenLastCalledWith(expect.objectContaining({ data: figure.data, layout: figure.layout }))
  })

  test.each([200, 260])('uses the supplied chart height of %ipx', (chartHeight) => {
    render(<ChartInteractive fallbackUntilLoaded={fallback} figure={figure} chartHeight={chartHeight} />)

    expect(mockPlot).toHaveBeenLastCalledWith(
      expect.objectContaining({ style: { width: '100%', height: `${chartHeight}px` } })
    )
  })

  test('uses the compact height supplied by the backend', () => {
    const fixedHeightFigureConfig = {
      ...figure_config,
      compact_rotated: {
        ...figure_config.compact_rotated,
        layout: {
          ...figure_config.compact_rotated.layout,
          height: 400,
        },
      },
    }
    mockUseResizeObserver.mockReturnValue({ width: 400, height: 260 })
    mockUseWindowSize.mockReturnValue({ width: SINGLE_COLUMN_WIDTH, height: 900 })

    render(
      <ChartInteractive
        fallbackUntilLoaded={fallback}
        figure={figure}
        figureConfig={fixedHeightFigureConfig}
        chartHeight={260}
      />
    )

    expect(mockPlot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        layout: expect.objectContaining({ height: 400 }),
        style: { width: '100%', height: '400px' },
      })
    )
  })

  test.each([
    { size: 'full', width: FULL_WIDTH, expected: { xaxis: { nticks: 10 } } },
    { size: 'compact', width: COMPACT_WIDTH, expected: { xaxis: { nticks: 4 } } },
  ])('merges the correct xaxis layout overrides on a $size screen', ({ width, expected }) => {
    mockUseResizeObserver.mockReturnValue({ width, height: 260 })

    render(
      <ChartInteractive fallbackUntilLoaded={fallback} figure={figure} figureConfig={figure_config} chartHeight={260} />
    )

    expect(mockPlot).toHaveBeenLastCalledWith(expect.objectContaining({ layout: expect.objectContaining(expected) }))
  })

  test('uses compact settings for a two-column chart on a wide screen', () => {
    mockUseWindowSize.mockReturnValue({ width: 1440, height: 900 })
    mockUseResizeObserver.mockReturnValue({ width: COMPACT_WIDTH, height: 260 })

    render(
      <ChartInteractive fallbackUntilLoaded={fallback} figure={figure} figureConfig={figure_config} chartHeight={260} />
    )

    expect(mockPlot).toHaveBeenLastCalledWith(
      expect.objectContaining({ layout: expect.objectContaining({ ...figure.layout, xaxis: { nticks: 4 } }) })
    )
  })

  test('uses compact rotated settings below the single-column layout boundary', () => {
    mockUseWindowSize.mockReturnValue({ width: SINGLE_COLUMN_WIDTH, height: 900 })
    mockUseResizeObserver.mockReturnValue({ width: COMPACT_WIDTH, height: 260 })

    render(
      <ChartInteractive fallbackUntilLoaded={fallback} figure={figure} figureConfig={figure_config} chartHeight={260} />
    )

    expect(mockPlot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        data: expect.arrayContaining([expect.objectContaining({ orientation: 'h', x: [9, 10], y: [11, 12] })]),
        layout: expect.objectContaining({ xaxis: { nticks: 2 }, height: 400 }),
      })
    )
  })

  test('uses compact settings at the two-column layout boundary', () => {
    mockUseWindowSize.mockReturnValue({ width: TWO_COLUMN_WIDTH, height: 900 })
    mockUseResizeObserver.mockReturnValue({ width: COMPACT_WIDTH, height: 260 })

    render(
      <ChartInteractive fallbackUntilLoaded={fallback} figure={figure} figureConfig={figure_config} chartHeight={260} />
    )

    expect(mockPlot).toHaveBeenLastCalledWith(
      expect.objectContaining({ layout: expect.objectContaining({ xaxis: { nticks: 4 } }) })
    )
  })

  test('updates the xaxis layout when the chart container is resized', () => {
    mockUseResizeObserver.mockReturnValue({ width: COMPACT_WIDTH, height: 260 })
    const { rerender } = render(
      <ChartInteractive fallbackUntilLoaded={fallback} figure={figure} figureConfig={figure_config} chartHeight={260} />
    )

    fireEvent.click(screen.getByText('init'))
    expect(mockPlot).toHaveBeenCalledWith(
      expect.objectContaining({ layout: expect.objectContaining({ ...figure.layout, xaxis: { nticks: 4 } }) })
    )

    mockUseResizeObserver.mockReturnValue({ width: FULL_WIDTH, height: 260 })
    rerender(
      <ChartInteractive fallbackUntilLoaded={fallback} figure={figure} figureConfig={figure_config} chartHeight={260} />
    )
    expect(mockPlot).toHaveBeenCalledWith(
      expect.objectContaining({ layout: expect.objectContaining({ ...figure.layout, xaxis: { nticks: 10 } }) })
    )
  })

  test('Passes the orignal data when dataOverrides have not been provided', () => {
    const undefinedFigureConfig = undefined
    mockUseResizeObserver.mockReturnValue({ width: 900, height: 260 })

    render(
      <ChartInteractive
        fallbackUntilLoaded={fallback}
        figure={figure}
        figureConfig={undefinedFigureConfig}
        chartHeight={260}
      />
    )

    expect(mockPlot).toHaveBeenLastCalledWith(expect.objectContaining(figure))
  })

  test('Passes the origianl data object and logs an error if the amount of data in dataOverrides does not match data', () => {
    const mockFigure = {
      data: [
        { x: [1, 2], y: [3, 4] },
        { x: [1, 2], y: [3, 4] },
        { x: [1, 2], y: [3, 4] },
      ],
    } as any
    mockUseResizeObserver.mockReturnValue({ width: 900, height: 260 })

    render(
      <ChartInteractive
        fallbackUntilLoaded={fallback}
        figure={mockFigure}
        figureConfig={figure_config}
        chartHeight={260}
      />
    )

    expect(logger.error).toHaveBeenCalled()
    expect(mockPlot).toHaveBeenLastCalledWith(expect.objectContaining(mockFigure))
  })

  test.each([
    {
      chartWidth: 1100,
      expectedLayout: { xaxis: { nticks: 13 } },
      expectedData: [{ x: [3, 4], y: [1, 2], hovertemplate: 'Full %{y:,} (%{x|%d %b %Y})' }],
    },
    {
      chartWidth: 900,
      expectedLayout: { xaxis: { nticks: 5 } },
      expectedData: [{ x: [3, 4], y: [1, 1], hovertemplate: 'Compact %{x:,} (%{y|%d %b %Y})' }],
    },
  ])('Passes the expected overrides based on the chart size', ({ chartWidth, expectedLayout, expectedData }) => {
    const mockCombinedFigureConfig = {
      full: {
        layout: { xaxis: { nticks: 13 } },
        data: [{ x: [3, 4], y: [1, 2], hovertemplate: 'Full %{y:,} (%{x|%d %b %Y})' }],
      },
      compact: {
        layout: { xaxis: { nticks: 5 } },
        data: [{ x: [3, 4], y: [1, 1], hovertemplate: 'Compact %{x:,} (%{y|%d %b %Y})' }],
      },
    } as any
    const plots = [{ x: [1, 2], y: [3, 4], type: 'scatter', name: 'First trace' }]
    mockUseResizeObserver.mockReturnValue({ width: chartWidth, height: 260 })

    render(
      <ChartInteractive
        fallbackUntilLoaded={fallback}
        figure={{ ...figure, data: plots }}
        figureConfig={mockCombinedFigureConfig}
        chartHeight={260}
      />
    )

    expect(mockPlot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        data: [
          {
            ...plots[0],
            x: expectedData[0].x,
            y: expectedData[0].y,
            hovertemplate: expectedData[0].hovertemplate,
          },
        ],
        layout: expect.objectContaining({
          ...figure.layout,
          ...expectedLayout,
        }),
      })
    )
  })
})
