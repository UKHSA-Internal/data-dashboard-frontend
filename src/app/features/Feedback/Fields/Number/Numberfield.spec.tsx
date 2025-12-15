import { render, screen } from '@/config/test-utils'

import NumberField from './NumberField'

describe('NumberField', () => {
  const mockProps = {
    label: 'Phone Number',
    helpText: 'Please enter your phone number.',
    cleanName: 'phone-number',
  }

  test('should render the component with a label, helpText, and numeric input field', () => {
    render(<NumberField {...mockProps} />)

    // see if the label is rendered correctly
    const labelElement = screen.getByLabelText(mockProps.label)
    expect(labelElement).toBeInTheDocument()

    // help text rendered correctly
    const helpTextElement = screen.getByText(mockProps.helpText)
    expect(helpTextElement).toBeInTheDocument()

    // input rendered with  correct attributes
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveAttribute('name', mockProps.cleanName)
    expect(inputElement).toHaveAttribute('id', mockProps.cleanName)
    expect(inputElement).toHaveAttribute('inputMode', 'numeric')
  })

  test('should not render help text when helpText is an empty string', () => {
    render(<NumberField {...{ ...mockProps, helpText: '' }} />)

    // Check that help text is not rendered
    const helpTextElement = screen.queryByText('Please enter your phone number.')
    expect(helpTextElement).not.toBeInTheDocument()
  })

  it('should render the error message text if the field is required and not completed', () => {
    render(<NumberField {...{ ...mockProps, fieldHasError: true }} />)

    const expectedErrorText = 'Please enter a value as this field is required'

    // Check if no radio buttons are rendered
    expect(screen.getByText(expectedErrorText)).toBeInTheDocument()
  })
})
