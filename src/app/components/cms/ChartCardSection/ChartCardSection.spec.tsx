import { render, screen } from '@/config/test-utils'

import { ChartCardSection } from './ChartCardSection'

// Mock components
jest.mock('@/app/components/cms', () => ({
  ...jest.requireActual('@/app/components/cms'),
  ChartRowCard: ({ children }: any) => <div data-testid="chart-row-card">{children}</div>,
  Chart: ({ chartId }: { chartId: string }) => (
    <div data-testid="chart" data-chart-id={chartId}>
      Chart Component Mock
    </div>
  ),
}))

jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return (
      <a href={href} {...props}>
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

  test('renders chart card section with 1 card', () => {
    const mockValue = {
      cards: [createMockCard('test-card-1', 'Test Chart 1', 'Test Description 1')],
    }

    const mockProps = {
      value: mockValue,
      heading: 'Test Section',
      showMoreSections: [],
      timeseriesFilter: '',
      chartId: 'test-chart-id',
    }

    render(<ChartCardSection {...mockProps} />)

    expect(screen.getByRole('heading', { name: 'Test Chart 1', level: 3 })).toBeInTheDocument()
    expect(screen.getByText('Test Description 1')).toBeInTheDocument()
    expect(screen.getAllByTestId('card-wrapper')).toHaveLength(1)
  })

  test('renders chart card section with 3 cards', () => {
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
      timeseriesFilter: '',
      chartId: 'test-chart-id',
    }

    render(<ChartCardSection {...mockProps} />)

    expect(screen.getByRole('heading', { name: 'Test Chart 1', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Test Chart 2', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Test Chart 3', level: 3 })).toBeInTheDocument()
    expect(screen.getAllByTestId('card-wrapper')).toHaveLength(3)
  })

  // test('shows "Show More" button when there are 4 cards and only displays first 3 cards', () => {
  //   const mockValue = {
  //     cards: [
  //       createMockCard('test-card-1', 'Test Chart 1', 'Test Description 1'),
  //       createMockCard('test-card-2', 'Test Chart 2', 'Test Description 2'),
  //       createMockCard('test-card-3', 'Test Chart 3', 'Test Description 3'),
  //       createMockCard('test-card-4', 'Test Chart 4', 'Test Description 4'),
  //     ],
  //   }

  //   const mockProps = {
  //     value: mockValue,
  //     heading: 'Test Section',
  //     showMoreSections: [],
  //     timeseriesFilter: '',
  //     chartId: 'test-chart-id',
  //   }

  //   render(<ChartCardSection {...mockProps} />)

  //   // Should only show first 3 cards
  //   expect(screen.getAllByTestId('card-wrapper')).toHaveLength(3)
  //   expect(screen.getByRole('heading', { name: 'Test Chart 1', level: 3 })).toBeInTheDocument()
  //   expect(screen.getByRole('heading', { name: 'Test Chart 2', level: 3 })).toBeInTheDocument()
  //   expect(screen.getByRole('heading', { name: 'Test Chart 3', level: 3 })).toBeInTheDocument()
  //   expect(screen.queryByRole('heading', { name: 'Test Chart 4', level: 3 })).not.toBeInTheDocument()

  //   // Should show "Show More" link
  //   expect(screen.getByText('Show More')).toBeInTheDocument()
  // })
})
