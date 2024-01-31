import { render, screen } from '@testing-library/react'

import { ChartEmpty } from './ChartEmpty'

describe('ChartEmpty', () => {
  const labels = {
    description: 'No data available',
    reset: 'Reset',
  }
  const resetHref = '/reset-path'

  test('renders the description and reset link', () => {
    render(<ChartEmpty labels={labels} resetHref={resetHref} />)

    const descriptionElement = screen.getByText(labels.description)
    const resetLinkElement = screen.getByRole('link', { name: labels.reset })

    expect(descriptionElement).toBeInTheDocument()
    expect(resetLinkElement).toBeInTheDocument()
    expect(resetLinkElement).toHaveAttribute('href', resetHref)
  })
})
