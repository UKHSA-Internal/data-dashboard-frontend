import { render, screen } from '@/config/test-utils'

import EmailField from './EmailField'

describe('EmailField Component', () => {
  it('should render the component with a label, helpText, and an email input', () => {
    const label = 'Email address'
    const helpText = 'Please enter a valid email address.'
    const cleanName = 'email'

    render(<EmailField label={label} helpText={helpText} cleanName={cleanName} />)

    const labelElement = screen.getByLabelText(label)
    expect(labelElement).toBeInTheDocument()

    const helpTextElement = screen.getByText(helpText)
    expect(helpTextElement).toBeInTheDocument()

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveAttribute('type', 'email')
    expect(inputElement).toHaveAttribute('name', cleanName)
    expect(inputElement).toHaveAttribute('id', cleanName)
  })
})
