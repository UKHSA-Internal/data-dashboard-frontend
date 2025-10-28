import { render, screen } from '@/config/test-utils'

import { MapCardTabWrapper } from './MapCardTabWrapper'

// Mock the dynamic import
jest.mock('./MapCard', () => {
  return function MockMapCard() {
    return <div data-testid="map-card">Map Card Component</div>
  }
})

jest.mock('next/dynamic', () => {
  return () => {
    return function MockMapCard() {
      return <div data-testid="map-card">Map Card Component</div>
    }
  }
})

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  Suspense: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock the About component
jest.mock('@/app/components/cms/About/About', () => {
  return function MockAbout({ content }: { content: string }) {
    return <div data-testid="about-component">{content}</div>
  }
})

describe('MapCardTabWrapper', () => {
  test('renders only MapCard component when about prop is null', async () => {
    render(await MapCardTabWrapper({ id: 'test-map', about: null }))

    expect(screen.getByTestId('map-card')).toBeInTheDocument()
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument()
    expect(screen.queryByTestId('about-component')).not.toBeInTheDocument()
  })

  test('renders only MapCard component when about prop is empty string', async () => {
    render(await MapCardTabWrapper({ id: 'test-map', about: '' }))

    expect(screen.getByTestId('map-card')).toBeInTheDocument()
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument()
    expect(screen.queryByTestId('about-component')).not.toBeInTheDocument()
  })

  test('renders Tabs component with Chart and About tabs when about prop is provided', async () => {
    const aboutContent = 'This is test about content'
    render(await MapCardTabWrapper({ id: 'test-map', about: aboutContent }))

    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Map' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'About' })).toBeInTheDocument()
  })

  test('generates correct kebab-case title from id prop', async () => {
    render(await MapCardTabWrapper({ id: 'Test Map ID', about: 'content' }))

    const chartTab = screen.getByRole('tab', { name: 'Map' })
    expect(chartTab.closest('a')).toHaveAttribute('href', '#map-filter-linked-map-test-map-id')
  })

  test('sets correct aria-controls attribute on Chart tab', async () => {
    render(await MapCardTabWrapper({ id: 'test-map', about: 'content' }))

    const chartTab = screen.getByRole('tab', { name: 'Map' })
    expect(chartTab).toHaveAttribute('aria-controls', 'filter-linked-map-test-map-content')
  })

  test('sets correct aria-controls attribute on About tab', async () => {
    render(await MapCardTabWrapper({ id: 'test-map', about: 'content' }))

    const aboutTab = screen.getByRole('tab', { name: 'About' })
    expect(aboutTab).toHaveAttribute('aria-controls', 'about-filter-linked-map-test-map-content')
  })

  test('renders Chart tab content with correct id and data-type attributes', async () => {
    render(await MapCardTabWrapper({ id: 'test-map', about: 'content' }))

    const chartContent = screen.getByTestId('map-card').closest('[data-type="chart"]')
    expect(chartContent).toHaveAttribute('id', 'map-filter-linked-map-test-map')
    expect(chartContent).toHaveAttribute('data-type', 'chart')
  })

  test('renders About tab content with correct id attribute', async () => {
    const aboutContent = 'Test about content'
    render(await MapCardTabWrapper({ id: 'test-map', about: aboutContent }))

    const aboutContentElement = screen
      .getByTestId('about-component')
      .closest('[id="about-filter-linked-map-test-map-content"]')
    expect(aboutContentElement).toBeInTheDocument()
  })

  test('passes about content to About component correctly', async () => {
    const aboutContent = 'This is detailed about information'
    render(await MapCardTabWrapper({ id: 'test-map', about: aboutContent }))

    expect(screen.getByTestId('about-component')).toHaveTextContent(aboutContent)
  })

  test('applies correct CSS classes to Tabs component', async () => {
    render(await MapCardTabWrapper({ id: 'test-map', about: 'content' }))

    const tabsContainer = screen.getByRole('tablist').closest('.govuk-\\!-margin-bottom-0')
    expect(tabsContainer).toBeInTheDocument()
  })

  test('applies correct CSS classes to TabsList component', async () => {
    render(await MapCardTabWrapper({ id: 'test-map', about: 'content' }))

    const tabsList = screen.getByRole('tablist')
    expect(tabsList).toHaveClass('hidden', 'no-js:block', 'sm:block')
  })

  test('applies correct CSS classes to Chart tab content', async () => {
    render(await MapCardTabWrapper({ id: 'test-map', about: 'content' }))

    const chartContent = screen.getByTestId('map-card').closest('[class*="min-h-"]')
    expect(chartContent).toHaveClass('min-h-[var(--ukhsa-chart-card-tab-min-height)]', 'no-js:mb-7')
  })

  test('applies correct CSS classes to About tab content', async () => {
    render(await MapCardTabWrapper({ id: 'test-map', about: 'content' }))

    const aboutContent = screen.getByTestId('about-component').closest('[class*="min-h-"]')
    expect(aboutContent).toHaveClass('min-h-[var(--ukhsa-chart-card-tab-min-height)]')
  })

  test('sets Chart tab as default selected tab', async () => {
    render(await MapCardTabWrapper({ id: 'test-map', about: 'content' }))

    const chartTab = screen.getByRole('tab', { name: 'Map' })
    expect(chartTab).toHaveAttribute('aria-selected', 'true')
  })
})
