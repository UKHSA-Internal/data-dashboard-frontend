import { render, screen } from '@/config/test-utils'

import UrlField from './UrlField'

describe('UrlField', () => {
  const mockProps = {
    label: 'https://ukhsa-dashboard.data.gov.uk',
    helpText: 'Please enter a valid URL.',
    cleanName: 'website-url',
    fieldHasError: false,
  }

  test('renders label correctly', () => {
    render(<UrlField {...mockProps} />)

    const labelElement = screen.getByLabelText(mockProps.label)
    expect(labelElement).toBeInTheDocument()
    expect(labelElement).toHaveAttribute('type', 'url')
  })

  test('should render the component with a label, helpText, and an email input', () => {
    render(<UrlField {...mockProps} />)

    // Check
    const labelElement = screen.getByLabelText(mockProps.label)
    expect(labelElement).toBeInTheDocument()

    const helpTextElement = screen.getByText(mockProps.helpText)
    expect(helpTextElement).toBeInTheDocument()

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveAttribute('type', 'url')
    expect(inputElement).toHaveAttribute('name', mockProps.cleanName)
    expect(inputElement).toHaveAttribute('id', mockProps.cleanName)
  })

  test('renders help text if provided', () => {
    render(<UrlField {...mockProps} />)

    // Check if the help text is rendered correctly
    const helpTextElement = screen.getByText(mockProps.helpText)
    expect(helpTextElement).toBeInTheDocument()
  })

  test('renders input with correct name and id attributes', () => {
    render(<UrlField {...mockProps} />)

    // Check if the input has the correct name and id
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveAttribute('name', mockProps.cleanName)
    expect(inputElement).toHaveAttribute('id', mockProps.cleanName)
  })

  it('should render the error message text if the field is required and not completed', () => {
    render(<UrlField {...{ ...mockProps, fieldHasError: true }} />)

    const expectedErrorText = 'Please enter a value as this field is required'

    // Check if no radio buttons are rendered
    expect(screen.getByText(expectedErrorText)).toBeInTheDocument()
  })
})
