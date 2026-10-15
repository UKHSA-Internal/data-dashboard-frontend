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

  const figure_config = {
    xaxis_full: { nticks: 10 },
    xaxis_compact: { nticks: 4 },
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

    render(<ChartInteractive fallbackUntilLoaded={fallback} figure={figure} />)

    expect(screen.getByTestId('fallback')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-plotly-chart')).not.toBeInTheDocument()
  })

  test('renders the plot when in view and hides the fallback once initialised', () => {
    render(<ChartInteractive fallbackUntilLoaded={fallback} figure={figure} />)

    expect(screen.getByTestId('mock-plotly-chart')).toBeInTheDocument()
    expect(screen.getByTestId('fallback')).toBeInTheDocument()

    fireEvent.click(screen.getByText('init'))

    expect(screen.queryByTestId('fallback')).not.toBeInTheDocument()
  })

  test('passes the original layout to Plot when there is no figure_config', () => {
    render(<ChartInteractive fallbackUntilLoaded={fallback} figure={figure} />)

    expect(mockPlot).toHaveBeenLastCalledWith(expect.objectContaining({ data: figure.data, layout: figure.layout }))
  })

  test.each([
    { screen: 'full', width: FULL_WIDTH, expected: { xaxis: { nticks: 10 } } },
    { screen: 'compact', width: COMPACT_WIDTH, expected: { xaxis: { nticks: 4 } } },
  ])('merges the correct xaxis layout overrides on a $screen screen', ({ width, expected }) => {
    window.innerWidth = width

    render(<ChartInteractive fallbackUntilLoaded={fallback} figure={figure} figure_config={figure_config} />)

    expect(mockPlot).toHaveBeenLastCalledWith(expect.objectContaining({ layout: { ...figure.layout, ...expected } }))
  })

  test('updates the xaxis layout when the window is resized after load', () => {
    render(<ChartInteractive fallbackUntilLoaded={fallback} figure={figure} figure_config={figure_config} />)

    expect(window.matchMedia).toHaveBeenCalledWith(NARROW_SCREEN_QUERY)

    // Initial load on a wide screen
    fireEvent.click(screen.getByText('init'))
    expect(mockPlot).toHaveBeenLastCalledWith(
      expect.objectContaining({ layout: { ...figure.layout, xaxis: { nticks: 10 } } })
    )

    // Window shrinks below the breakpoint
    resizeWindow(COMPACT_WIDTH)
    expect(mockPlot).toHaveBeenLastCalledWith(
      expect.objectContaining({ layout: { ...figure.layout, xaxis: { nticks: 4 } } })
    )

    // And back to wide
    resizeWindow(FULL_WIDTH)
    expect(mockPlot).toHaveBeenLastCalledWith(
      expect.objectContaining({ layout: { ...figure.layout, xaxis: { nticks: 10 } } })
    )
  })
})
