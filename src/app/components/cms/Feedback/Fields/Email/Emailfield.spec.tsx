import { render, screen } from '@/config/test-utils'

import EmailField from './EmailField'

describe('EmailField Component', () => {
  const mockProps = {
    label: 'What is your email address?',
    helpText: 'Please provide your email address.',
    cleanName: 'email-address',
  }

  it('should render the component with a label, helpText, and an email input', () => {
    render(<EmailField {...mockProps} />)

    const labelElement = screen.getByLabelText(mockProps.label)
    expect(labelElement).toBeInTheDocument()

    const helpTextElement = screen.getByText(mockProps.helpText)
    expect(helpTextElement).toBeInTheDocument()

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveAttribute('type', 'email')
    expect(inputElement).toHaveAttribute('name', mockProps.cleanName)
    expect(inputElement).toHaveAttribute('id', mockProps.cleanName)
  })

  it('should render the error message text if the field is required and not completed', () => {
    render(<EmailField {...{ ...mockProps, fieldHasError: true }} />)

    const expectedErrorText = 'Please enter a value as this field is required'

    // Check if no radio buttons are rendered
    expect(screen.getByText(expectedErrorText)).toBeInTheDocument()
  })
})
