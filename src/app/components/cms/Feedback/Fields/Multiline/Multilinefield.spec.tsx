import { render, screen } from '@/config/test-utils'

import MultilineField from './MultilineField'

describe('MultilineField', () => {
  const mockProps = {
    label: 'What is your feedback?',
    helpText: 'Please provide your feedback in the box below.',
    cleanName: 'feedback',
  }

  test('renders the label correctly', () => {
    render(<MultilineField {...mockProps} />)

    // Check if the label is rendered correctly
    const label = screen.getByLabelText(mockProps.label)
    expect(label).toBeInTheDocument()
  })

  test('renders help text when provided', () => {
    render(<MultilineField {...mockProps} />)

    // Check if the help text is rendered
    const helpText = screen.getByText(mockProps.helpText)
    expect(helpText).toBeInTheDocument()
  })

  test('does not render help text when not provided', () => {
    render(<MultilineField {...{ ...mockProps, helpText: '' }} />)

    // Ensure help text is not rendered if it's an empty string
    const helpText = screen.queryByText(mockProps.helpText)
    expect(helpText).toBeNull()
  })

  test('renders textarea with the correct name, id, and rows attribute', () => {
    render(<MultilineField {...mockProps} />)

    const textarea = screen.getByRole('textbox') // Since it's a <textarea>, it's considered a textbox

    // Check if the textarea has the correct attributes
    expect(textarea).toHaveAttribute('name', mockProps.cleanName)
    expect(textarea).toHaveAttribute('id', mockProps.cleanName)
    expect(textarea).toHaveAttribute('rows', '5') // Ensure rows attribute is set to 5
  })
})
