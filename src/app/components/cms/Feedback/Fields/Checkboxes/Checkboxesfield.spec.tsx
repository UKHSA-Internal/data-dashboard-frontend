import { render, screen } from '@/config/test-utils'

import CheckboxesField from './CheckboxesField'

describe('CheckboxesField Component', () => {
  const mockProps = {
    label: 'What would you like to see on the dashboard in the future?',
    helpText: 'Pick one option from the list.',
    cleanName: 'what_would_you_like_to_see_on_the_dashboard_in_the_future',
    defaultValue: 'Option 1, Option 2, Option 3',
  }

  it('should render the label correctly', () => {
    render(<CheckboxesField {...mockProps} />)

    const labelElement = screen.getByText(mockProps.label)
    expect(labelElement).toBeInTheDocument()
  })

  it('should render help text if provided', () => {
    render(<CheckboxesField {...mockProps} />)

    const helpTextElement = screen.getByText(mockProps.helpText)
    expect(helpTextElement).toBeInTheDocument()
  })

  it('should not render help text if not provided', () => {
    render(<CheckboxesField {...{ ...mockProps, helpText: '' }} />)

    const helpTextElement = screen.queryByText(mockProps.helpText)
    expect(helpTextElement).toBeNull()
  })

  it('should render the correct number of checkboxes based on the defaultValue', () => {
    render(<CheckboxesField {...mockProps} />)

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3) // There are 3 choices in the defaultValue
  })

  it('should render checkboxes with correct labels and values', () => {
    render(<CheckboxesField {...mockProps} />)

    // Check that the checkboxes are present
    const checkboxOption1 = screen.getByLabelText('Option 1')
    const checkboxOption2 = screen.getByLabelText('Option 2')
    const checkboxOption3 = screen.getByLabelText('Option 3')

    expect(checkboxOption1).toBeInTheDocument()
    expect(checkboxOption2).toBeInTheDocument()
    expect(checkboxOption3).toBeInTheDocument()

    // Check that the checkboxes have the correct value
    expect(checkboxOption1).toHaveAttribute('value', 'Option 1')
    expect(checkboxOption2).toHaveAttribute('value', 'Option 2')
    expect(checkboxOption3).toHaveAttribute('value', 'Option 3')
  })

  it('should correctly handle defaultValue with newline characters', () => {
    const propsWithNewline = {
      ...mockProps,
      defaultValue: 'Option 1\r\nOption 2\r\nOption 3',
    }

    render(<CheckboxesField {...propsWithNewline} />)

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3) // There are 3 options in the defaultValue with newline characters
  })

  it('should correctly render the cleanName in the checkbox inputs', () => {
    render(<CheckboxesField {...mockProps} />)

    const checkboxes = screen.getAllByRole('checkbox')
    checkboxes.forEach((checkbox, index) => {
      const uniqueId = `${mockProps.cleanName}-${index}` // Match the generated id
      expect(checkbox).toHaveAttribute('name', mockProps.cleanName)
      expect(checkbox).toHaveAttribute('id', uniqueId) // Check that the id is unique
    })
  })
})
