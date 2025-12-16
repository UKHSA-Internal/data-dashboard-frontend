import { render, screen } from '@/config/test-utils'

import SinglelineField from './SinglelineField'

describe('SinglelineField', () => {
  const mockProps = {
    label: 'What is your name?',
    helpText: 'Please provide your full name.',
    cleanName: 'name',
  }

  test('renders the label correctly', () => {
    render(<SinglelineField {...mockProps} />)

    // Check if the label is rendered correctly and is associated with the textarea
    const label = screen.getByLabelText(mockProps.label)
    expect(label).toBeInTheDocument()
  })

  test('renders help text when provided', () => {
    render(<SinglelineField {...mockProps} />)

    // Check if the help text is rendered
    const helpText = screen.getByText(mockProps.helpText)
    expect(helpText).toBeInTheDocument()
  })

  test('does not render help text when not provided', () => {
    render(<SinglelineField {...{ ...mockProps, helpText: '' }} />)

    // Ensure help text is not rendered if it's an empty string
    const helpText = screen.queryByText(mockProps.helpText)
    expect(helpText).toBeNull()
  })

  test('renders textarea with the correct name, id, and rows attribute', () => {
    render(<SinglelineField {...mockProps} />)

    const textarea = screen.getByRole('textbox')

    // Check if the textarea has the correct attributes
    expect(textarea).toHaveAttribute('name', mockProps.cleanName)
    expect(textarea).toHaveAttribute('id', mockProps.cleanName)
    expect(textarea).toHaveAttribute('rows', '1') // Ensure rows attribute is set to 1
  })

  it('should render the error message text if the field is required and not completed', () => {
    render(<SinglelineField {...{ ...mockProps, fieldHasError: true }} />)

    const expectedErrorText = 'Please enter a value as this field is required'

    // Check if no radio buttons are rendered
    expect(screen.getByText(expectedErrorText)).toBeInTheDocument()
  })
})
