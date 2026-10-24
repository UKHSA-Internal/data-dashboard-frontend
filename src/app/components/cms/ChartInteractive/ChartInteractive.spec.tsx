import { useIntersectionObserver, useResizeObserver } from 'usehooks-ts'

import { fireEvent, render, screen } from '@/config/test-utils'

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
}))

const mockUseIntersectionObserver = useIntersectionObserver as jest.Mock
const mockUseResizeObserver = useResizeObserver as jest.Mock

const COMPACT_WIDTH = 514
const FULL_WIDTH = 1100

describe('ChartInteractive', () => {
  const figure = {
    data: [{ x: [1, 2], y: [3, 4], type: 'scatter' }],
    layout: { title: 'Base layout' },
  } as any

  const figure_config = {
    full: { layout: { xaxis: { nticks: 10 } } },
    compact: { layout: { xaxis: { nticks: 4 } } },
  } as any

  const fallback = <div data-testid="fallback">Loading chart...</div>

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseIntersectionObserver.mockReturnValue({ isIntersecting: true, ref: jest.fn() })
    mockUseResizeObserver.mockRejectedValue({ width: FULL_WIDTH, height: 260 })
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
    window.innerWidth = 1440
    mockUseResizeObserver.mockReturnValue({ width: COMPACT_WIDTH, height: 260 })

    render(
      <ChartInteractive fallbackUntilLoaded={fallback} figure={figure} figureConfig={figure_config} chartHeight={260} />
    )

    expect(mockPlot).toHaveBeenLastCalledWith(
      expect.objectContaining({ layout: expect.objectContaining({ ...figure.layout, xaxis: { nticks: 4 } }) })
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
})
