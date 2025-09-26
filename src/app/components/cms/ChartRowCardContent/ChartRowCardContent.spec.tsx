import { render, screen, within } from '@/config/test-utils'

import { ChartRowCardContent } from './ChartRowCardContent'

// Mock components
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

jest.mock('@/app/utils/cms.utils', () => ({
  ...jest.requireActual('@/app/utils/cms.utils'),
  renderBlock: jest.fn(),
}))

describe('ChartRowCardContent', () => {
  test('chart card displays correctly', () => {
    const mockValue = {
      columns: [
        {
          id: 'col-1',
          type: 'chart_card',
          value: {
            title: 'Chart heading 1',
            body: 'Chart description 1',
            about: 'Sample About Field',
            x_axis: '',
            y_axis: '',
          },
        },
      ],
    }

    render(<ChartRowCardContent value={mockValue} timeseriesFilter="" />)

    expect(screen.getAllByRole('article')).toHaveLength(1)

    const article = screen.getByRole('article', { name: 'Chart heading 1' })
    expect(article).toBeInTheDocument()
    expect(article).toHaveClass('ukhsa-chart-card')

    // Heading and description
    expect(within(article).getByRole('heading', { level: 3, name: 'Chart heading 1' })).toBeInTheDocument()
    expect(within(article).getByText('Chart description 1')).toBeInTheDocument()
    expect(within(article).getByText('Up to and including 27 September 2023')).toBeInTheDocument()

    // Tabs list
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Chart' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Tabular data' })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tab', { name: 'Download' })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tab', { name: 'About' })).toHaveAttribute('aria-selected', 'false')

    // Tabs panel
    expect(screen.getByRole('tab', { name: 'Chart' })).toHaveAttribute('data-state', 'active')
    expect(screen.getByRole('tab', { name: 'Tabular data' })).toHaveAttribute('data-state', 'inactive')
    expect(screen.getByRole('tab', { name: 'Download' })).toHaveAttribute('data-state', 'inactive')
    expect(screen.getByRole('tab', { name: 'About' })).toHaveAttribute('data-state', 'inactive')

    // Chart
    expect(screen.getByText('Mocked chart')).toBeVisible()
  })

  test('chart card in a full width column', () => {
    const mockValue = {
      columns: [
        {
          id: 'col-1',
          type: 'chart_card',
          value: {
            title: 'Chart heading 1',
            body: 'Chart description 1',
            x_axis: '',
            y_axis: '',
          },
        },
      ],
    }

    render(<ChartRowCardContent value={mockValue} timeseriesFilter="" />)
    const article = screen.getByRole('article', { name: 'Chart heading 1' })
    expect(article.parentElement).toHaveClass('lg:w-full')
  })

  test('chart cards in two columns', () => {
    const mockValue = {
      columns: [
        {
          id: 'col-1',
          type: 'chart_card',
          value: {
            title: 'Chart heading 1',
            body: 'Chart description 1',
            x_axis: '',
            y_axis: '',
          },
        },
        {
          id: 'col-2',
          type: 'chart_card',
          value: {
            title: 'Chart heading 2',
            body: 'Chart description 2',
            x_axis: '',
            y_axis: '',
          },
        },
      ],
    }

    render(<ChartRowCardContent value={mockValue} timeseriesFilter="" />)
    const article1 = screen.getByRole('article', { name: 'Chart heading 1' })
    const article2 = screen.getByRole('article', { name: 'Chart heading 2' })
    expect(article1.parentElement).toHaveClass('lg:w-1/2')
    expect(article2.parentElement).toHaveClass('lg:w-1/2')
  })
})
