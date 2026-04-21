import { render, screen } from '@/config/test-utils'

import { SimplifiedChartWithLinkCard } from './SimplifiedChartWithLinkCard'

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

describe('SimplifiedChartWithLinkCard', () => {
  const defaultValue = {
    title: 'Influenza',
    sub_title: 'Testing positivity',
    topic_page: 'https://example.com/topics/influenza-vaccination',
  }

  test('renders title and sub_title', () => {
    render(<SimplifiedChartWithLinkCard value={defaultValue} cardsCount={2} />)

    expect(screen.getByRole('heading', { name: 'Influenza', level: 3 })).toBeInTheDocument()
    expect(screen.getByText('Testing positivity')).toBeInTheDocument()
  })

  test('renders link with resolved path from topic_page', () => {
    render(<SimplifiedChartWithLinkCard value={defaultValue} cardsCount={2} />)

    const link = screen.getByRole('link', { name: /Influenza/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('resolved-'))
  })

  test('renders chart', () => {
    render(<SimplifiedChartWithLinkCard value={defaultValue} cardsCount={2} />)

    expect(screen.getByTestId('chart')).toBeInTheDocument()
  })

  test('renders card wrapper', () => {
    render(<SimplifiedChartWithLinkCard value={defaultValue} cardsCount={3} />)

    expect(screen.getByTestId('card')).toBeInTheDocument()
  })
})
