import { render, screen } from '@/config/test-utils'

import { GlobalFilterLinkedMap } from './GlobalFilterLinkedMap'

// Mock hooks used by ChartRowCard
const mockUseWindowSize = jest.fn()
const mockUseDebounceValue = jest.fn()
jest.mock('usehooks-ts', () => ({
  useWindowSize: (...args: any[]) => mockUseWindowSize(...args),
  useDebounceValue: (...args: any[]) => mockUseDebounceValue(...args),
}))

const mockSearchParams = new URLSearchParams()
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => mockSearchParams),
}))

// Mock ChartRowCard and ChartRowCardHeader
jest.mock('@/app/components/ui/ukhsa', () => ({
  ChartRowCard: ({ children }: { children: React.ReactNode }) => <div data-testid="chart-row-card">{children}</div>,
  ChartRowCardHeader: ({ id, title }: { id: string; title: string }) => (
    <header data-testid="chart-row-card-header" id={id}>
      {title}
    </header>
  ),
}))

// Mock MapCardTabWrapper
jest.mock('./MapCard/MapCardTabWrapper', () => ({
  MapCardTabWrapper: ({ id, about }: { id: string; about: string | null }) => (
    <div data-testid="map-card-tab-wrapper" data-id={id} data-about={about || ''}>
      Map Card Tab Wrapper
    </div>
  ),
}))

describe('GlobalFilterLinkedMap', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseWindowSize.mockReturnValue({ width: 1200, height: 800 })
    mockUseDebounceValue.mockReturnValue([1200])
  })
  test('renders map card when type is filter_linked_map', () => {
    render(
      <GlobalFilterLinkedMap
        type="filter_linked_map"
        value={{
          title_prefix: 'Test Map Title',
          about: 'Test about content',
        }}
        id="test-map-id"
      />
    )

    expect(screen.getByTestId('chart-row-card')).toBeInTheDocument()
    expect(screen.getByTestId('chart-row-card-header')).toBeInTheDocument()
    expect(screen.getByTestId('map-card-tab-wrapper')).toBeInTheDocument()
    expect(screen.getByText('Test Map Title')).toBeInTheDocument()
  })

  test('renders with title_prefix when provided', () => {
    render(
      <GlobalFilterLinkedMap
        type="filter_linked_map"
        value={{
          title_prefix: 'Custom Title',
          about: undefined,
        }}
        id="test-id"
      />
    )

    expect(screen.getByText('Custom Title')).toBeInTheDocument()
  })

  test('renders with empty title when title_prefix is not provided', () => {
    render(
      <GlobalFilterLinkedMap
        type="filter_linked_map"
        value={{
          about: undefined,
        }}
        id="test-id"
      />
    )

    const header = screen.getByTestId('chart-row-card-header')
    expect(header).toBeInTheDocument()
    expect(header.textContent).toBe('')
  })

  test('passes about content to MapCardTabWrapper when provided', () => {
    render(
      <GlobalFilterLinkedMap
        type="filter_linked_map"
        value={{
          title_prefix: 'Test',
          about: 'About content here',
        }}
        id="test-id"
      />
    )

    const tabWrapper = screen.getByTestId('map-card-tab-wrapper')
    expect(tabWrapper).toHaveAttribute('data-about', 'About content here')
  })

  test('passes null about to MapCardTabWrapper when not provided', () => {
    render(
      <GlobalFilterLinkedMap
        type="filter_linked_map"
        value={{
          title_prefix: 'Test',
          about: undefined,
        }}
        id="test-id"
      />
    )

    const tabWrapper = screen.getByTestId('map-card-tab-wrapper')
    expect(tabWrapper).toHaveAttribute('data-about', '')
  })

  test('generates correct header id from component id', () => {
    render(
      <GlobalFilterLinkedMap
        type="filter_linked_map"
        value={{
          title_prefix: 'Test',
        }}
        id="my-map-id"
      />
    )

    const header = screen.getByTestId('chart-row-card-header')
    expect(header).toHaveAttribute('id', 'map-row-heading-my-map-id')
  })

  test('does not render when type is not filter_linked_map', () => {
    const { container } = render(
      <GlobalFilterLinkedMap
        type="text_card"
        value={{
          body: 'Test body',
        }}
        id="test-id"
      />
    )

    expect(container.firstChild).toBeNull()
    expect(screen.queryByTestId('chart-row-card')).not.toBeInTheDocument()
  })

  test('applies correct CSS classes to article wrapper', () => {
    const { container } = render(
      <GlobalFilterLinkedMap
        type="filter_linked_map"
        value={{
          title_prefix: 'Test',
        }}
        id="test-id"
      />
    )

    const article = container.querySelector('article.ukhsa-map-card')
    expect(article).toBeInTheDocument()
  })
})
