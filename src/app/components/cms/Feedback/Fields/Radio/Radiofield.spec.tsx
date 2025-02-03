import { render, screen } from '@/config/test-utils'

import RadioField from './RadioField'

describe('RadioField Component', () => {
  const mockProps = {
    label: 'What would you like to see on the dashboard in the future?',
    helpText: 'Pick one option from the list.',
    cleanName: 'what_would_you_like_to_see_on_the_dashboard_in_the_future',
    choicesList: ['Choice 1', 'Choice 2', 'Choice 3'],
  }

  it('should render the label correctly', () => {
    render(<RadioField {...mockProps} />)

    // Check if the label is rendered
    expect(screen.getByText(mockProps.label)).toBeInTheDocument()
  })

  it('should render the help text if provided', () => {
    render(<RadioField {...mockProps} />)

    // Check if the help text is rendered
    expect(screen.getByText(mockProps.helpText)).toBeInTheDocument()
  })

  it('should render the correct number of radio buttons from choicesList', () => {
    render(<RadioField {...mockProps} />)

    // Check if the correct number of radio buttons are rendered
    const radioButtons = screen.getAllByRole('radio')
    expect(radioButtons).toHaveLength(mockProps.choicesList.length)
  })

  it('should render radio buttons with the correct values from choicesList', () => {
    render(<RadioField {...mockProps} />)

    // Check if the radio buttons have the correct value attribute
    const radioButtons = screen.getAllByRole('radio')
    expect(radioButtons[0]).toHaveAttribute('value', mockProps.choicesList[0])
    expect(radioButtons[1]).toHaveAttribute('value', mockProps.choicesList[1])
    expect(radioButtons[2]).toHaveAttribute('value', mockProps.choicesList[2])
  })

  it('should render the radio buttons with the correct labels', () => {
    render(<RadioField {...mockProps} />)

    // Check if the radio button labels are rendered correctly
    expect(screen.getByLabelText(mockProps.choicesList[0])).toBeInTheDocument()
    expect(screen.getByLabelText(mockProps.choicesList[1])).toBeInTheDocument()
    expect(screen.getByLabelText(mockProps.choicesList[2])).toBeInTheDocument()
  })

  it('should not render any radio buttons if choicesList is empty', () => {
    render(<RadioField {...{ ...mockProps, choicesList: [] }} />)

    // Check if no radio buttons are rendered
    const radioButtons = screen.queryAllByRole('radio')
    expect(radioButtons).toHaveLength(0)
  })

  it('should render the error message text if the field is required and not completed', () => {
    render(<RadioField {...{ ...mockProps, choicesList: [], fieldHasError: true }} />)

    const expectedErrorText = 'Please enter a value as this field is required'

    // Check if no radio buttons are rendered
    expect(screen.getByText(expectedErrorText)).toBeInTheDocument()
  })
})
