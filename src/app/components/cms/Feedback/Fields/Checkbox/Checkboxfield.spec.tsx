import { render, screen } from '@/config/test-utils'

import CheckboxField from './CheckboxField'

describe('CheckboxField', () => {
  const mockProps = {
    label: 'Accept terms and conditions',
    helpText: 'Please read the terms carefully.',
    cleanName: 'terms_and_conditions',
    defaultValue: 'true', // Testing with a string value
  }

  test('renders checkbox field with label and help text when provided', () => {
    render(<CheckboxField {...mockProps} />)

    // Check if the label is rendered correctly
    const label = screen.getByLabelText(mockProps.label)
    expect(label).toBeInTheDocument()

    // Check if the help text is rendered correctly
    const helpText = screen.getByText(mockProps.helpText)
    expect(helpText).toBeInTheDocument()
  })

  test('does not render help text when not provided', () => {
    render(<CheckboxField {...{ ...mockProps, helpText: '' }} />)

    // Ensure help text is not rendered if it's an empty string
    const helpText = screen.queryByText(mockProps.helpText)
    expect(helpText).toBeNull()
  })

  test('checkbox is unchecked by default when defaultValue is an empty string', () => {
    render(<CheckboxField {...{ ...mockProps, defaultValue: '' }} />)

    // Check if the checkbox is unchecked when defaultValue is an empty string
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  test('checkbox is unchecked by default when defaultValue is a falsy string ("false")', () => {
    render(<CheckboxField {...{ ...mockProps, defaultValue: 'false' }} />)

    // Check if the checkbox is unchecked when defaultValue is "false"
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  test('checkbox input has the correct name and id', () => {
    render(<CheckboxField {...mockProps} />)

    const checkbox = screen.getByRole('checkbox')

    // Check if the checkbox has the correct name and id
    expect(checkbox).toHaveAttribute('name', mockProps.cleanName)
    expect(checkbox).toHaveAttribute('id', mockProps.cleanName)
  })

  test('checkbox input value matches the defaultValue prop', () => {
    render(<CheckboxField {...mockProps} />)

    const checkbox = screen.getByRole('checkbox')

    // Ensure the checkbox input value matches defaultValue prop
    expect(checkbox).toHaveAttribute('value', mockProps.defaultValue)
  })

  it('should render the error message text if the field is required and not completed', () => {
    render(<CheckboxField {...{ ...mockProps, fieldHasError: true }} />)

    const expectedErrorText = 'Please check this field as it is required'

    // Check if no radio buttons are rendered
    expect(screen.getByText(expectedErrorText)).toBeInTheDocument()
  })
})
