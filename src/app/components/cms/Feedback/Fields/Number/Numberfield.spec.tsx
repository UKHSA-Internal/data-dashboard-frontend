import { render, screen } from '@/config/test-utils'

import NumberField from './NumberField'

describe('NumberField', () => {
  test('should render the component with a label, helpText, and numeric input field', () => {
    const label = 'Phone Number'
    const helpText = 'Please enter your phone number.'
    const cleanName = 'phone-number'

    render(<NumberField label={label} helpText={helpText} cleanName={cleanName} />)

    // see if the label is rendered correctly
    const labelElement = screen.getByLabelText(label)
    expect(labelElement).toBeInTheDocument()

    // help text rendered correctly
    const helpTextElement = screen.getByText(helpText)
    expect(helpTextElement).toBeInTheDocument()

    // input rendered with  correct attributes
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveAttribute('name', cleanName)
    expect(inputElement).toHaveAttribute('id', cleanName)
    expect(inputElement).toHaveAttribute('inputMode', 'numeric')
  })

  test('should not render help text when helpText is an empty string', () => {
    const label = 'Phone Number'
    const helpText = ''
    const cleanName = 'phone-number'

    render(<NumberField label={label} helpText={helpText} cleanName={cleanName} />)

    // Check that help text is not rendered
    const helpTextElement = screen.queryByText('Please enter your phone number.')
    expect(helpTextElement).not.toBeInTheDocument()
  })
})
