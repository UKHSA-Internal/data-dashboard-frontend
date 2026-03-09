import { Suspense } from 'react'

import { render, screen } from '@/config/test-utils'

import { ChartCardSection } from './ChartCardSection'

jest.mock('react-plotly.js', () => ({
  default: () => <div data-testid="mock-plotly-chart">Mocked Plotly Chart</div>,
}))

jest.mock('@/app/hooks/getPathname', () => ({
  getPathname: jest.fn(() => '/test-pathname'),
}))

jest.mock('@/app/hooks/getSearchParams', () => ({
  getSearchParams: jest.fn(() => new URL('http://localhost').searchParams),
}))

jest.mock('@/app/i18n', () => ({
  getServerTranslation: jest.fn(() =>
    Promise.resolve({
      t: jest.fn((key: string) => key),
      i18n: {},
    })
  ),
}))

const OriginalURL = global.URL
Object.defineProperty(window, 'URL', {
  value: class MockURL extends OriginalURL {
    static createObjectURL = jest.fn(() => 'mock-object-url')
    static revokeObjectURL = jest.fn()
  },
  writable: true,
})

// Mock components
jest.mock('@/app/components/ui/ukhsa', () => {
  const actual = jest.requireActual('@/app/components/ui/ukhsa')

  // Withouit 'asChild' prop we were seeing an error about it not being defined
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const MockCard = ({ children, asChild, ...props }: any) => (
    <div data-testid="card" {...props}>
      {children}
    </div>
  )

  return {
    ...actual,
    Card: MockCard,
    Chart: () => <div data-testid="chart">Chart Component Mock</div>,
  }
})

jest.mock('next/link', () => {
  return function MockLink({ children, href, _prefetch, ...props }: any) {
    return (
      <a href={typeof href === 'string' ? href : href.toString()} {...props}>
        {children}
      </a>
    )
  }
})

describe('ChartCardSection', () => {
  const createMockCard = (id: string, title: string, subTitle: string) => ({
    id,
    type: 'simplified_chart_with_link',
    value: {
      title,
      sub_title: subTitle,
      topic_page: `https://example.com/${id}`,
    },
  })

  test('renders chart card section with 1 card', async () => {
    const mockValue = {
      cards: [createMockCard('test-card-1', 'Test Chart 1', 'Test Description 1')],
    }

    const mockProps = {
      value: mockValue,
      heading: 'Test Section',
      showMoreSections: [],
    }

    render(
      <Suspense fallback={<div>Loading...</div>}>
        <ChartCardSection {...mockProps} />
      </Suspense>
    )

    expect(await screen.findByRole('heading', { name: 'Test Chart 1', level: 3 })).toBeInTheDocument()
    expect(screen.getByText('Test Description 1')).toBeInTheDocument()
    expect(screen.getAllByTestId('card-wrapper')).toHaveLength(1)
  })

  test('renders chart card section with 2 cards', async () => {
    const mockValue = {
      cards: [
        createMockCard('test-card-1', 'Test Chart 1', 'Test Description 1'),
        createMockCard('test-card-2', 'Test Chart 2', 'Test Description 2'),
      ],
    }

    const mockProps = {
      value: mockValue,
      heading: 'Test Section',
      showMoreSections: [],
    }

    render(
      <Suspense fallback={<div>Loading...</div>}>
        <ChartCardSection {...mockProps} />
      </Suspense>
    )

    expect(await screen.findByRole('heading', { name: 'Test Chart 1', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Test Chart 2', level: 3 })).toBeInTheDocument()
    expect(screen.getAllByTestId('card-wrapper')).toHaveLength(2)
  })

  test('shows "Show More" button when there are 3 cards and only displays first 3 cards', async () => {
    const mockValue = {
      cards: [
        createMockCard('test-card-1', 'Test Chart 1', 'Test Description 1'),
        createMockCard('test-card-2', 'Test Chart 2', 'Test Description 2'),
        createMockCard('test-card-3', 'Test Chart 3', 'Test Description 3'),
      ],
    }

    const mockProps = {
      value: mockValue,
      heading: 'Test Section',
      showMoreSections: [],
    }

    render(
      <Suspense fallback={<div>Loading...</div>}>
        <ChartCardSection {...mockProps} />
      </Suspense>
    )

    // Wait for component to render
    await screen.findByRole('heading', { name: 'Test Chart 1', level: 3 })

    // Should only show first 2 cards
    expect(screen.getAllByTestId('card-wrapper')).toHaveLength(2)
    expect(screen.getByRole('heading', { name: 'Test Chart 1', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Test Chart 2', level: 3 })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Test Chart 3', level: 3 })).not.toBeInTheDocument()

    // Should show "Show More" link
    expect(screen.getByText('Show More')).toBeInTheDocument()
  })
})
