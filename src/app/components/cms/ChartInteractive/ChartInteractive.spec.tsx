import { useIntersectionObserver } from 'usehooks-ts'

import { act, fireEvent, render, screen } from '@/config/test-utils'

import ChartInteractive, { NARROW_SCREEN_QUERY } from './ChartInteractive'

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
}))

const mockUseIntersectionObserver = useIntersectionObserver as jest.Mock

const COMPACT_WIDTH = 800
const FULL_WIDTH = 1400

function mockMatchMedia() {
  const isNarrow = () => window.innerWidth <= 1100
  let onResize: () => void

  window.matchMedia = jest.fn().mockImplementation(() => ({
    get matches() {
      return isNarrow()
    },
    addEventListener: (_event: string, listener: (event: { matches: boolean }) => void) => {
      onResize = () => listener({ matches: isNarrow() })
      window.addEventListener('resize', onResize)
    },
    removeEventListener: () => window.removeEventListener('resize', onResize),
  }))
}

function resizeWindow(width: number) {
  act(() => {
    window.innerWidth = width
    window.dispatchEvent(new Event('resize'))
  })
}

describe('ChartInteractive', () => {
  const figure = {
    data: [{ x: [1, 2], y: [3, 4], type: 'scatter' }],
    layout: { title: 'Base layout' },
  } as any

  const defaultFigureConfig = {
    full: { layout: { xaxis: { nticks: 10 } } },
    compact: { layout: { xaxis: { nticks: 4 } } },
  } as any

  const dataFigureConfig = {
    full: {
      data: {
        x: [10, 20],
        y: [30, 40],
        hovertemplate: 'Full screen: %{x} (%{y|%d %b %Y})',
      },
    },
    compact: {
      data: {
        x: [30, 40],
        y: [10, 20],
        hovertemplate: 'Compact screen: %{y} (%{x|%d %b %Y})',
      },
    },
  } as any

  const fallback = <div data-testid="fallback">Loading chart...</div>

  beforeEach(() => {
    jest.clearAllMocks()
    window.innerWidth = FULL_WIDTH
    mockMatchMedia()
    mockUseIntersectionObserver.mockReturnValue({ isIntersecting: true, ref: jest.fn() })
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
    { screen: 'full', width: FULL_WIDTH, expected: { xaxis: { nticks: 10 } } },
    { screen: 'compact', width: COMPACT_WIDTH, expected: { xaxis: { nticks: 4 } } },
  ])('merges the correct xaxis layout overrides on a $screen screen', ({ width, expected }) => {
    window.innerWidth = width

    render(
      <ChartInteractive
        fallbackUntilLoaded={fallback}
        figure={figure}
        figureConfig={defaultFigureConfig}
        chartHeight={260}
      />
    )

    expect(mockPlot).toHaveBeenLastCalledWith(expect.objectContaining({ layout: expect.objectContaining(expected) }))
  })

  test('updates the xaxis layout when the window is resized after load', () => {
    render(
      <ChartInteractive
        fallbackUntilLoaded={fallback}
        figure={figure}
        figureConfig={defaultFigureConfig}
        chartHeight={260}
      />
    )

    expect(window.matchMedia).toHaveBeenCalledWith(NARROW_SCREEN_QUERY)

    // Initial load on a wide screen
    fireEvent.click(screen.getByText('init'))
    expect(mockPlot).toHaveBeenLastCalledWith(
      expect.objectContaining({ layout: expect.objectContaining({ ...figure.layout, xaxis: { nticks: 10 } }) })
    )

    // Window shrinks below the breakpoint
    resizeWindow(COMPACT_WIDTH)
    expect(mockPlot).toHaveBeenLastCalledWith(
      expect.objectContaining({ layout: expect.objectContaining({ ...figure.layout, xaxis: { nticks: 4 } }) })
    )

    // And back to wide
    resizeWindow(FULL_WIDTH)
    expect(mockPlot).toHaveBeenLastCalledWith(
      expect.objectContaining({ layout: expect.objectContaining({ ...figure.layout, xaxis: { nticks: 10 } }) })
    )
  })

  test.each([
    {
      screen: 'full',
      width: FULL_WIDTH,
      expectedX: [10, 20],
      expectedY: [30, 40],
      hovertemplate: 'Full screen: %{x} (%{y|%d %b %Y})',
    },
    {
      screen: 'compact',
      width: COMPACT_WIDTH,
      expectedX: [30, 40],
      expectedY: [10, 20],
      hovertemplate: 'Compact screen: %{y} (%{x|%d %b %Y})',
    },
  ])('applies data overrides to every trace on a $screen screen', ({ width, expectedX, expectedY, hovertemplate }) => {
    window.innerWidth = width
    const traces = [
      { x: [1, 2], y: [3, 4], type: 'scatter', name: 'First trace' },
      { x: [5, 6], y: [7, 8], type: 'scatter', name: 'Second trace' },
    ]

    render(
      <ChartInteractive
        fallbackUntilLoaded={fallback}
        figure={{ ...figure, data: traces }}
        figureConfig={dataFigureConfig}
        chartHeight={260}
      />
    )

    expect(mockPlot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        data: traces.map((trace) => ({ ...trace, x: expectedX, y: expectedY, hovertemplate })),
      })
    )
  })

  test('passes both layout and data figure_config overrides to Plotly', () => {
    const combinedFigureConfig = {
      full: {
        layout: { xaxis: { nticks: 13 } },
        data: { x: [10, 20], y: [30, 40], hovertemplate: 'Full %{y:,} (%{x|%d %b %Y})' },
      },
      compact: {
        layout: { xaxis: { nticks: 5 } },
        data: { x: [30, 40], y: [10, 20], hovertemplate: 'Compact %{x:,} (%{y|%d %b %Y})' },
      },
    } as any
    const traces = [
      { x: [1, 2], y: [3, 4], type: 'scatter', name: 'First trace' },
      { x: [5, 6], y: [7, 8], type: 'scatter', name: 'Second trace' },
    ]

    render(
      <ChartInteractive
        fallbackUntilLoaded={fallback}
        figure={{ ...figure, data: traces }}
        figureConfig={combinedFigureConfig}
        chartHeight={260}
      />
    )

    expect(mockPlot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        data: traces.map((trace) => ({
          ...trace,
          x: [10, 20],
          y: [30, 40],
          hovertemplate: 'Full %{y:,} (%{x|%d %b %Y})',
        })),
        layout: expect.objectContaining({
          ...figure.layout,
          xaxis: { nticks: 13 },
          autosize: true,
        }),
      })
    )
  })

  test('passes the rotated compact shape from figure_config to Plotly', () => {
    window.innerWidth = COMPACT_WIDTH
    const originalShape = {
      type: 'rect',
      x0: 10,
      x1: 20,
      y0: 30,
      y1: 40,
      xref: 'x',
      yref: 'y',
    }

    const rotatedShape = {
      type: 'rect',
      x0: 30,
      x1: 40,
      y0: 10,
      y1: 20,
      xref: 'y',
      yref: 'x',
    }
    const shapeFigureConfig = {
      full: { layout: { shapes: [originalShape] } },
      compact: { layout: { shapes: [rotatedShape] } },
    } as any

    render(
      <ChartInteractive
        fallbackUntilLoaded={fallback}
        figure={figure}
        figureConfig={shapeFigureConfig}
        chartHeight={260}
      />
    )

    expect(mockPlot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        layout: expect.objectContaining({
          ...figure.layout,
          shapes: [rotatedShape],
          autosize: true,
        }),
      })
    )
  })
})
