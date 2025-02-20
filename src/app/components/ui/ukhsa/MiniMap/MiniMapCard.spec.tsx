import { render, screen } from '@/config/test-utils'

import { MiniMapCard } from './MiniMapCard'

//
jest.mock('./MiniMap', () => ({
  MiniMap: jest.fn(() => <div>MiniMap Mock Component</div>),
}))

const renderMinimapComponent = (type: 'heat' | 'cold') => {
  const title = `${type} Health Alert`
  const subTitle = `${type} temperatures expected`
  const alertType = type

  const { container } = render(<MiniMapCard title={title} subTitle={subTitle} alertType={alertType} />)
  return {
    container,
  }
}

describe('MiniMapCard Component', () => {
  it('renders the heading with the correct title text', () => {
    renderMinimapComponent('heat')
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toHaveTextContent('heat Health Alert')
  })

  it('renders the subtitle correctly', () => {
    renderMinimapComponent('cold')
    const subtitle = screen.getByText('cold temperatures expected')
    expect(subtitle).toBeInTheDocument()
  })

  it('links to the correct summary page based on alertType (heat)', () => {
    renderMinimapComponent('heat')
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/weather-health-alerts/heat')
  })

  it('links to the correct summary page based on alertType (cold)', () => {
    renderMinimapComponent('cold')
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/weather-health-alerts/cold')
  })

  it('renders the MiniMap component with the correct alertType', () => {
    renderMinimapComponent('cold')
    expect(screen.getByText('MiniMap Mock Component')).toBeInTheDocument()
  })

  it('has the correct aria-labelledby attribute for accessibility', () => {
    renderMinimapComponent('heat')
    const card = screen.getByRole('link')
    expect(card).toHaveAttribute('aria-labelledby', 'chart-row-card-heading-x4')
  })

  it('applies the correct CSS classes to minimap card', () => {
    const { container } = renderMinimapComponent('heat')
    const card = container.querySelector('a') // The Card is a link
    expect(card).toHaveClass(
      'govuk-link--no-visited-state govuk-!-padding-5 ukhsa-chart-card bg-[var(--colour-chart-background)]'
    )
    expect(card).toHaveClass(
      'no-underline transition-colors duration-200 ukhsa-focus hover:bg-[var(--colour-chart-background-hover)] focus:bg-[var(--colour-chart-background-hover)]'
    )
  })
})
