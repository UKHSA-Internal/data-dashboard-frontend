import { render, screen } from '@/config/test-utils'

import { MiniMapCard } from './MiniMapCard'

//
jest.mock('./MiniMap', () => ({
  MiniMap: jest.fn(() => <div>MiniMap Mock Component</div>),
}))

describe('MiniMapCard Component', () => {
  it('renders the heading with the correct title text', () => {
    const title = 'Heat Health Alert'
    const subTitle = 'High temperatures expected'
    const alertType = 'heat'

    render(<MiniMapCard title={title} subTitle={subTitle} alertType={alertType} />)

    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toHaveTextContent('Heat Health Alert')
  })

  it('renders the subtitle correctly', () => {
    const title = 'Cold Health Alert'
    const subTitle = 'Freezing temperatures expected'
    const alertType = 'cold'

    render(<MiniMapCard title={title} subTitle={subTitle} alertType={alertType} />)

    const subtitle = screen.getByText('Freezing temperatures expected')
    expect(subtitle).toBeInTheDocument()
  })

  it('links to the correct summary page based on alertType (heat)', () => {
    const title = 'Heat Health Alert'
    const subTitle = 'High temperatures expected'
    const alertType = 'heat'

    render(<MiniMapCard title={title} subTitle={subTitle} alertType={alertType} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/weather-health-alerts/heat')
  })

  it('links to the correct summary page based on alertType (cold)', () => {
    const title = 'Cold Health Alert'
    const subTitle = 'Freezing temperatures expected'
    const alertType = 'cold'

    render(<MiniMapCard title={title} subTitle={subTitle} alertType={alertType} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/weather-health-alerts/cold')
  })

  it('renders the MiniMap component with the correct alertType', () => {
    const title = 'Cold Health Alert'
    const subTitle = 'Freezing temperatures expected'
    const alertType = 'cold'

    render(<MiniMapCard title={title} subTitle={subTitle} alertType={alertType} />)

    // Ensure <MiniMap /> is rndered (mocked as 'MiniMap Mock Component')
    expect(screen.getByText('MiniMap Mock Component')).toBeInTheDocument()
  })

  it('has the correct aria-labelledby attribute for accessibility', () => {
    const title = 'Heat Health Alert'
    const subTitle = 'High temperatures expected'
    const alertType = 'heat'

    render(<MiniMapCard title={title} subTitle={subTitle} alertType={alertType} />)

    const card = screen.getByRole('link')
    expect(card).toHaveAttribute('aria-labelledby', 'chart-row-card-heading-x4')
  })
})
