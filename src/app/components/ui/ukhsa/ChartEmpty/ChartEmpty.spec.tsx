import { render, screen } from '@/config/test-utils'

import { ChartEmpty } from './ChartEmpty'

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
}))

describe('ChartEmpty', () => {
  const resetHref = '/reset-path'

  test('renders the description and reset link', () => {
    render(<ChartEmpty resetHref={resetHref} />)

    const descriptionElement = screen.getByText('No data available')
    const resetLinkElement = screen.getByRole('link', { name: 'Reset' })

    expect(descriptionElement).toBeInTheDocument()
    expect(resetLinkElement).toBeInTheDocument()
    expect(resetLinkElement).toHaveAttribute('href', resetHref)
  })

  test('hides the reset link when showResetLink is false', () => {
    render(<ChartEmpty resetHref={resetHref} showResetLink={false} />)

    expect(screen.getByText('No data available')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Reset' })).not.toBeInTheDocument()
  })
})
