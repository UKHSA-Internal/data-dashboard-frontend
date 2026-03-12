import { render, screen } from '@/config/test-utils'

import { ChartCardSectionRow } from './ChartCardSectionRow'

describe('ChartCardSectionRow', () => {
  test('renders children', () => {
    render(
      <ChartCardSectionRow>
        <span data-testid="child-1">First</span>
        <span data-testid="child-2">Second</span>
      </ChartCardSectionRow>
    )

    expect(screen.getByTestId('child-1')).toHaveTextContent('First')
    expect(screen.getByTestId('child-2')).toHaveTextContent('Second')
  })

  test('renders a single wrapper div that contains all children', () => {
    const { container } = render(
      <ChartCardSectionRow>
        <div className="ukhsa-chart-card-section">Card 1</div>
        <div className="ukhsa-chart-card-section">Card 2</div>
      </ChartCardSectionRow>
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.tagName).toBe('DIV')
    expect(wrapper.querySelectorAll('.ukhsa-chart-card-section')).toHaveLength(2)
  })

  test('renders empty row when given no children', () => {
    const { container } = render(<ChartCardSectionRow>{null}</ChartCardSectionRow>)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.querySelector('.ukhsa-chart-card-section')).not.toBeInTheDocument()
  })
})
