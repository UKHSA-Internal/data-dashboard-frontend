import { render, screen } from '@/config/test-utils'

import { ChartWithDescriptionCard } from './ChartWithDescriptionCard'

jest.mock('@/app/utils/cms/slug', () => ({
  getPath: jest.fn((url: string) => (url ? `/resolved-${url.replace(/^https?:\/\/[^/]*\//, '')}` : '/')),
}))

jest.mock('@/app/components/ui/ukhsa', () => ({
  Card: ({ children, asChild: _asChild, ...props }: any) => (
    <div data-testid="card" {...props}>
      {children}
    </div>
  ),
  Chart: () => <div data-testid="chart">Chart</div>,
}))

jest.mock('next/link', () => {
  return function MockLink({ children, href, prefetch: _prefetch, ...props }: any) {
    return (
      <a href={typeof href === 'string' ? href : (href?.toString?.() ?? '#')} {...props}>
        {children}
      </a>
    )
  }
})

describe('ChartWithDescriptionCard', () => {
  const defaultValue = {
    title: 'COVID-19 Cases',
    sub_title: 'Weekly reported cases',
    topic_page: 'https://example.com/topics/covid-19',
  }

  test('renders title and sub_title', () => {
    render(<ChartWithDescriptionCard value={defaultValue} />)

    expect(screen.getByRole('heading', { name: 'COVID-19 Cases', level: 3 })).toBeInTheDocument()
    expect(screen.getByText('Weekly reported cases')).toBeInTheDocument()
  })

  test('renders link with resolved path from topic_page', () => {
    render(<ChartWithDescriptionCard value={defaultValue} />)

    const link = screen.getByRole('link', { name: /COVID-19 Cases/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('resolved-'))
  })

  test('renders description and "Visit ... to find out more" when description is provided', () => {
    render(<ChartWithDescriptionCard value={{ ...defaultValue, description: 'This chart shows weekly trends.' }} />)

    expect(screen.getByTestId('chart')).toBeInTheDocument()
    expect(screen.getByTestId('chart-description')).toHaveTextContent('This chart shows weekly trends.')
    expect(screen.getByText(/Visit COVID-19 Cases to find out more/)).toBeInTheDocument()
  })

  test('does not render description block when description is absent', () => {
    render(<ChartWithDescriptionCard value={defaultValue} />)

    expect(screen.queryByTestId('chart-description')).not.toBeInTheDocument()
  })

  test('renders source section when source with external_url is provided', () => {
    render(
      <ChartWithDescriptionCard
        value={{
          ...defaultValue,
          source: {
            external_url: 'https://gov.uk/data',
            link_display_text: 'ONS',
          },
        }}
      />
    )

    expect(screen.getByTestId('chart-source')).toBeInTheDocument()
    expect(screen.getByText('Source:')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'ONS' })).toHaveAttribute('href', 'https://gov.uk/data')
  })

  test('does not render source section when no source given', () => {
    render(<ChartWithDescriptionCard value={defaultValue} />)

    expect(screen.queryByTestId('chart-source')).not.toBeInTheDocument()
  })

  test('does not render source section when source has no external_url', () => {
    render(
      <ChartWithDescriptionCard
        value={{
          ...defaultValue,
          source: { link_display_text: 'ONS' },
        }}
      />
    )

    expect(screen.queryByTestId('chart-source')).not.toBeInTheDocument()
  })
})
