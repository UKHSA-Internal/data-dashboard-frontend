import { render, screen } from '@/config/test-utils'

import HiddenField from './HiddenField'

describe('HiddenField component', () => {
  test('renders a hidden input with the correct attributes', () => {
    const cleanName = 'userId'

    render(<HiddenField cleanName={cleanName} />)

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('name', cleanName)
    expect(inputElement).toHaveAttribute('id', cleanName)
    expect(inputElement).toHaveAttribute('value', cleanName)
    expect(inputElement).toHaveClass('govuk-visually-hidden')
    expect(inputElement).toHaveAttribute('aria-label', 'Unused Hidden Date Input')
  })
})
