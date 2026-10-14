import { useIntersectionObserver } from 'usehooks-ts'

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
}))

const mockUseIntersectionObserver = useIntersectionObserver as jest.Mock

function mockMatchMedia(matches: boolean) {
  window.matchMedia = jest.fn().mockReturnValue({
    matches,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })
}

describe('ChartInteractive', () => {
  const figure = {
    data: [{ x: [1, 2], y: [3, 4], type: 'scatter' }],
    layout: { title: 'Base layout' },
  } as any

  const fallback = <div data-testid="fallback">Loading chart...</div>

  beforeEach(() => {
    jest.clearAllMocks()
    mockMatchMedia(false)
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
    { screen: 'full', isCompact: false, expected: { xaxis: { nticks: 10 } } },
    { screen: 'compact', isCompact: true, expected: { xaxis: { nticks: 4 } } },
  ])('merges the correct xaxis layout overrides on a $screen screen', ({ isCompact, expected }) => {
    mockMatchMedia(isCompact)

    const figure_config = {
      xaxis_full: { xaxis: { nticks: 10 } },
      xaxis_compact: { xaxis: { nticks: 4 } },
    } as any

    render(<ChartInteractive fallbackUntilLoaded={fallback} figure={figure} figure_config={figure_config} />)

    expect(mockPlot).toHaveBeenLastCalledWith(expect.objectContaining({ layout: { ...figure.layout, ...expected } }))
  })
})
