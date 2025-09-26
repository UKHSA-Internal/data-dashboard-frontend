import { render, screen, within } from '@/config/test-utils'

import { FilterLinkedMap } from './FilterLinkedMap'

// Mock components
jest.mock('@/app/components/cms', () => ({
  ...jest.requireActual('@/app/components/cms'),
  MapCardWrapper: () => <div>Mocked Map</div>,
  ChartRowCardHeader: ({ title, id }: { title: string; id: string }) => (
    <header>
      <h3 id={`map-row-heading-${id}`}>{title}</h3>
    </header>
  ),
}))

describe('FilterLinkedMap', () => {
  test('linked Map card displays correctly', () => {
    const mockProps = {
      id: 'test-id',
      value: {
        title_prefix: 'Map Heading',
      },
    }

    render(<FilterLinkedMap {...mockProps} />)

    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()
    expect(article).toHaveClass('ukhsa-map-card')

    // Heading
    expect(within(article).getByRole('heading', { level: 3, name: 'Map Heading' })).toBeInTheDocument()

    // Map
    expect(screen.getByText('Mocked Map')).toBeVisible()
  })

  test('renders without title prefix', () => {
    const mockProps = {
      id: 'test-id',
      value: {
        title_prefix: undefined,
      },
    }

    render(<FilterLinkedMap {...mockProps} />)

    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()
    expect(article).toHaveClass('ukhsa-map-card')

    // Should still render the header even without title
    expect(within(article).getByRole('heading', { level: 3 })).toBeInTheDocument()
  })
})
