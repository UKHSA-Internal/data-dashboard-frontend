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

describe('ChartCardSection', () => {
  test('renders chart card section', () => {
    const mockValue = {
      cards: [
        {
          id: 'test-card-1',
          type: 'simplified_chart_with_link',
          value: {
            title: 'Test Chart',
            sub_title: 'Test Description',
            topic_page: 'https://example.com',
          },
        },
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

    expect(screen.getByRole('heading', { name: 'Test Chart', level: 3 })).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })
})
