import { render, screen } from '@/config/test-utils'

import DropdownField from './DropdownField'

describe('Dropdownfield Component', () => {
  const mockProps = {
    label: 'What would you like to see on the dashboard in the future?',
    helpText: 'Pick one option from the list.',
    cleanName: 'what_would_you_like_to_see_on_the_dashboard_in_the_future',
    choicesList: ['Option 1', 'Option 2', 'Option 3'],
  }

  it('should render the label correctly', () => {
    render(<DropdownField {...mockProps} />)

    const labelElement = screen.getByText('What would you like to see on the dashboard in the future?')
    expect(labelElement).toBeInTheDocument()
  })

  it('should render help text if provided', () => {
    render(<DropdownField {...mockProps} />)

    const helpTextElement = screen.getByText('Pick one option from the list.')
    expect(helpTextElement).toBeInTheDocument()
  })

  it('should not render help text if not provided', () => {
    render(<DropdownField {...{ ...mockProps, helpText: '' }} />)

    const helpTextElement = screen.queryByText('Pick one option from the list.')
    expect(helpTextElement).toBeNull()
  })

  it('should render the default "Choose an option" option', () => {
    render(<DropdownField {...mockProps} />)

    const defaultOption = screen.getByText('Choose an option')
    expect(defaultOption).toBeInTheDocument()
  })

  it('should render options based on choicesList array', () => {
    render(<DropdownField {...mockProps} />)

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(4) // 3 options + 1 default option
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })

  it('should render options when choicesList is provided as an array', () => {
    const propsWithChoicesList = {
      ...mockProps,
      choicesList: ['Option 1', 'Option 2', 'Option 3'],
    }
    render(<DropdownField {...propsWithChoicesList} />)

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(4) // 3 options + 1 default option
    expect(screen.getByText('Choose an option')).toBeInTheDocument()
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })

  it('should correctly render the cleanName in the select input', () => {
    render(<DropdownField {...mockProps} />)

    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toHaveAttribute('name', 'what_would_you_like_to_see_on_the_dashboard_in_the_future')
    expect(selectElement).toHaveAttribute('id', 'what_would_you_like_to_see_on_the_dashboard_in_the_future')
  })

  it('should render the error message text if the field is required and not completed', () => {
    render(<DropdownField {...{ ...mockProps, fieldHasError: true }} />)

    const expectedErrorText = 'Please select a value from the dropdown as this field is required'

    // Check if no radio buttons are rendered
    expect(screen.getByText(expectedErrorText)).toBeInTheDocument()
  })
})
