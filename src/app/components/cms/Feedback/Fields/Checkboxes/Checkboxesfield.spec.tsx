import { render, screen } from '@/config/test-utils'

import CheckboxesField from './CheckboxesField'

describe('CheckboxesField Component', () => {
  const mockProps = {
    label: 'What would you like to see on the dashboard in the future?',
    helpText: 'Pick one or more options from the list.',
    cleanName: 'dashboard_features',
    choicesList: ['Choice 1', 'Choice 2', 'Choice 3'],
    defaultValuesList: ['Choice 1', 'Choice 3'], // The items in the defaultValuesList Choices should be checked by default
  }

  it('should render the label correctly', () => {
    render(<CheckboxesField {...mockProps} />)

    // Check if the label is rendered correctly
    expect(screen.getByText(mockProps.label)).toBeInTheDocument()
  })

  it('should render the help text if provided', () => {
    render(<CheckboxesField {...mockProps} />)

    // Check if the help text is rendered
    expect(screen.getByText(mockProps.helpText)).toBeInTheDocument()
  })

  it('should not render help text if not provided', () => {
    render(<CheckboxesField {...{ ...mockProps, helpText: '' }} />)

    // Check if help text is not rendered
    expect(screen.queryByText(mockProps.helpText)).not.toBeInTheDocument()
  })

  it('should render the correct number of checkboxes from choicesList', () => {
    render(<CheckboxesField {...mockProps} />)

    // Check if the correct number of checkboxes are rendered
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(mockProps.choicesList.length)
  })

  it('should render checkboxes with the correct values from choicesList', () => {
    render(<CheckboxesField {...mockProps} />)

    // Check if the checkboxes have the correct value attribute
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes[0]).toHaveAttribute('value', mockProps.choicesList[0])
    expect(checkboxes[1]).toHaveAttribute('value', mockProps.choicesList[1])
    expect(checkboxes[2]).toHaveAttribute('value', mockProps.choicesList[2])
  })

  it('should render checkboxes with the correct label associated', () => {
    render(<CheckboxesField {...mockProps} />)

    // Check if the checkboxes have the correct labels
    expect(screen.getByLabelText(mockProps.choicesList[0])).toBeInTheDocument()
    expect(screen.getByLabelText(mockProps.choicesList[1])).toBeInTheDocument()
    expect(screen.getByLabelText(mockProps.choicesList[2])).toBeInTheDocument()
  })

  it('should render the checkboxes with the correct default checked state', () => {
    render(<CheckboxesField {...mockProps} />)

    // Check if the checkboxes have the correct default checked state
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes[0]).toBeChecked() // Choice 1 is in defaultValuesList, hence it should be checked
    expect(checkboxes[1]).not.toBeChecked() // Choice 2 is not in defaultValuesList, so it should not be checked
    expect(checkboxes[2]).toBeChecked()
  })

  it('should render unique ids for each checkbox', () => {
    render(<CheckboxesField {...mockProps} />)

    // Check if each checkbox has a unique id
    const checkboxes = screen.getAllByRole('checkbox')
    checkboxes.forEach((checkbox, index) => {
      expect(checkbox).toHaveAttribute('id', `${mockProps.cleanName}-${index}`)
    })
  })

  it('should not render any checkboxes if choicesList is empty', () => {
    render(<CheckboxesField {...{ ...mockProps, choicesList: [] }} />)

    // Check if no checkboxes are rendered
    const checkboxes = screen.queryAllByRole('checkbox')
    expect(checkboxes).toHaveLength(0)
  })

  it('should render the error message text if the field is required and not completed', () => {
    render(<CheckboxesField {...{ ...mockProps, fieldHasError: true }} />)

    const expectedErrorText = 'Please select at least one of the below options'

    // Check if no radio buttons are rendered
    expect(screen.getByText(expectedErrorText)).toBeInTheDocument()
  })
})
