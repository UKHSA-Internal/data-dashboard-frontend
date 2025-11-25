import { render, screen } from '@/config/test-utils'

import { ChartRowCard } from './ChartRowCard'

// Mock ChartRowCardContent and other components
jest.mock('@/app/components/cms', () => ({
  ...jest.requireActual('@/app/components/cms'),
  Timestamp: () => <div>Up to and including 27 September 2023</div>,
  Download: () => <div>Mocked download</div>,
  About: () => <div>Mocked About</div>,
  Table: () => <div>Mocked table</div>,
  Chart: () => <div>Mocked chart</div>,
  ChartRowCardHeader: ({ title, description, children, id }: any) => (
    <header>
      <h3 id={`chart-row-card-heading-${id}`}>{title}</h3>
      <p>{description}</p>
      {children}
    </header>
  ),
}))

describe('ChartRowCard', () => {
  test('renders chart row card wrapper correctly', () => {
    render(
      <ChartRowCard>
        <div data-testid="chart-content">Chart content</div>
      </ChartRowCard>
    )

    expect(screen.getByTestId('chart-row-cards')).toBeInTheDocument()
    expect(screen.getByTestId('chart-content')).toBeInTheDocument()
  })

  test('applies correct CSS classes for layout', () => {
    render(
      <ChartRowCard>
        <div>Chart content</div>
      </ChartRowCard>
    )

    const chartRowCards = screen.getByTestId('chart-row-cards')
    expect(chartRowCards).toHaveClass('mb-3 sm:mb-6 lg:flex lg:gap-6')
  })
})
