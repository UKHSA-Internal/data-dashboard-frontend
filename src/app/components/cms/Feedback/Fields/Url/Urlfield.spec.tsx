import { render, screen } from '@/config/test-utils'

import UrlField from './UrlField'

describe('UrlField', () => {
  test('renders label correctly', () => {
    const label = 'https://ukhsa-dashboard.data.gov.uk'
    const helpText = 'Please enter a valid URL.'
    const cleanName = 'website-url'

    render(<UrlField label={label} helpText={helpText} cleanName={cleanName} />)

    const labelElement = screen.getByLabelText(label)
    expect(labelElement).toBeInTheDocument()
    expect(labelElement).toHaveAttribute('type', 'url')
  })

  test('should render the component with a label, helpText, and an email input', () => {
    const label = 'Email Address'
    const helpText = 'https://ukhsa-dashboard.data.gov.uk'
    const cleanName = 'email-address'

    render(<UrlField label={label} helpText={helpText} cleanName={cleanName} />)

    // Check
    const labelElement = screen.getByLabelText(label)
    expect(labelElement).toBeInTheDocument()

    const helpTextElement = screen.getByText(helpText)
    expect(helpTextElement).toBeInTheDocument()

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveAttribute('type', 'url')
    expect(inputElement).toHaveAttribute('name', cleanName)
    expect(inputElement).toHaveAttribute('id', cleanName)
  })

  test('renders help text if provided', () => {
    const label = 'https://ukhsa-dashboard.data.gov.uk'
    const helpText = 'Please enter a valid URL.'
    const cleanName = 'website-url'

    render(<UrlField label={label} helpText={helpText} cleanName={cleanName} />)

    // Check if the help text is rendered correctly
    const helpTextElement = screen.getByText(helpText)
    expect(helpTextElement).toBeInTheDocument()
  })

  test('renders input with correct name and id attributes', () => {
    const label = 'Website URL'
    const helpText = 'https://ukhsa-dashboard.data.gov.uk'
    const cleanName = 'website-url'

    render(<UrlField label={label} helpText={helpText} cleanName={cleanName} />)

    // Check if the input has the correct name and id
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveAttribute('name', cleanName)
    expect(inputElement).toHaveAttribute('id', cleanName)
  })
})
