import { fireEvent, render, screen, within } from '@/config/test-utils'

import Form, { FormProps, renderErrorSummary } from './Form'

// mock useActionState to avoid the real hook behaviour
let mockActionState = [{}, jest.fn()]
jest.mock('react', () => {
  const original = jest.requireActual('react')
  return {
    ...original,
    useActionState: () => mockActionState,
  }
})

describe('Form', () => {
  const defaultProps: FormProps = {
    iAgreeCheckboxLabel: 'I agree',
    termsOfServiceError: 'You must accept the terms',
    disagreeButtonText: 'No',
    agreeButtonText: 'Yes',
    body: 'This is some text',
    terms_of_service_link: 'http://localhost:3000/accessibility-statement',
    terms_of_service_link_text: 'Read full terms of service here',
  }

  beforeEach(() => {
    mockActionState = [{}, jest.fn()]
  })

  describe('Rendering', () => {
    it('renders form with text', () => {
      render(<Form {...defaultProps} />)

      const text = screen.getByTestId('react-markdown')
      expect(text).toBeInTheDocument()
      expect(within(text).getByText('This is some text')).toBeInTheDocument()
    })

    it('renders terms of service', () => {
      render(<Form {...defaultProps} />)

      const text = screen.getByTestId('terms-link')
      expect(text).toBeInTheDocument()
      expect(within(text).getByText('Read full terms of service here')).toBeInTheDocument()
    })

    it('renders form with checkbox and custom label', () => {
      render(<Form {...defaultProps} />)

      const checkbox = screen.getByRole('checkbox', { name: /I agree/i })
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).not.toBeChecked()
    })

    it('renders disagree button with custom text', () => {
      render(<Form {...defaultProps} />)

      const disagreeButton = screen.getByRole('button', { name: 'No' })
      expect(disagreeButton).toBeInTheDocument()
      expect(disagreeButton).toHaveAttribute('type', 'submit')
      expect(disagreeButton).toHaveAttribute('name', 'action')
      expect(disagreeButton).toHaveAttribute('value', 'disagreed')
    })

    it('renders agree button with custom text and start icon', () => {
      render(<Form {...defaultProps} />)

      const agreeButton = screen.getByRole('button', { name: /Yes/i })
      expect(agreeButton).toBeInTheDocument()
      expect(agreeButton).toHaveAttribute('type', 'submit')
      expect(agreeButton).toHaveAttribute('name', 'action')
      expect(agreeButton).toHaveAttribute('value', 'agree')

      // Check for SVG icon
      const svg = agreeButton.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveClass('govuk-button__start-icon')
    })
  })

  describe('Client-side error handling', () => {
    it('shows an error summary when agree clicked unchecked, hides on tick', () => {
      render(<Form {...defaultProps} />)

      const agreeButton = screen.getByRole('button', { name: /yes/i })
      fireEvent.click(agreeButton)

      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText(/You must accept the terms/)).toBeInTheDocument()

      const checkbox = screen.getByRole('checkbox')
      fireEvent.click(checkbox)
      expect(screen.queryByText(/You must accept the terms/)).not.toBeInTheDocument()
    })

    it('prevents form submission when agree clicked without checkbox checked', () => {
      render(<Form {...defaultProps} />)

      const agreeButton = screen.getByRole('button', { name: /yes/i })
      const mockPreventDefault = jest.fn()

      fireEvent.click(agreeButton, { preventDefault: mockPreventDefault })

      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('does not show error initially', () => {
      render(<Form {...defaultProps} />)

      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('clears client error when checkbox is checked after error', () => {
      render(<Form {...defaultProps} />)

      // Trigger error
      const agreeButton = screen.getByRole('button', { name: /yes/i })
      fireEvent.click(agreeButton)
      expect(screen.getByRole('alert')).toBeInTheDocument()

      // Check the checkbox
      const checkbox = screen.getByRole('checkbox')
      fireEvent.click(checkbox)

      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('allows form submission via disagree button without checking checkbox', () => {
      render(<Form {...defaultProps} />)

      const disagreeButton = screen.getByRole('button', { name: 'No' })
      fireEvent.click(disagreeButton)

      // Should not show error for disagree button
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  describe('Server-side error handling', () => {
    it('shows error summary when useActionState returns error', () => {
      const errorMessage = 'Server error occurred'
      mockActionState = [{ error: errorMessage }, jest.fn()]

      render(<Form {...defaultProps} />)

      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })

    it('hides server error when checkbox is checked', () => {
      const errorMessage = 'Server error occurred'
      mockActionState = [{ error: errorMessage }, jest.fn()]

      render(<Form {...defaultProps} />)

      expect(screen.getByRole('alert')).toBeInTheDocument()

      const checkbox = screen.getByRole('checkbox')
      fireEvent.click(checkbox)

      // Error should not be visible when checked
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('shows server error again when checkbox is unchecked', () => {
      const errorMessage = 'Server error occurred'
      mockActionState = [{ error: errorMessage }, jest.fn()]

      render(<Form {...defaultProps} />)

      const checkbox = screen.getByRole('checkbox')
      fireEvent.click(checkbox) // Check
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()

      fireEvent.click(checkbox) // Uncheck
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('adds aria-describedby to checkbox when error is shown', () => {
      render(<Form {...defaultProps} />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).not.toHaveAttribute('aria-describedby')

      const agreeButton = screen.getByRole('button', { name: /yes/i })
      fireEvent.click(agreeButton)

      expect(checkbox).toHaveAttribute('aria-describedby', 'acknowledgement-error')
    })

    it('removes aria-describedby when error is cleared', () => {
      render(<Form {...defaultProps} />)

      const agreeButton = screen.getByRole('button', { name: /yes/i })
      fireEvent.click(agreeButton)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveAttribute('aria-describedby', 'acknowledgement-error')

      fireEvent.click(checkbox)
      expect(checkbox).not.toHaveAttribute('aria-describedby')
    })

    it('error summary has proper ARIA structure', () => {
      render(<Form {...defaultProps} />)

      const agreeButton = screen.getByRole('button', { name: /yes/i })
      fireEvent.click(agreeButton)

      const alert = screen.getByRole('alert')
      expect(alert).toBeInTheDocument()

      const title = within(alert).getByText(/There is a problem/)
      expect(title).toBeInTheDocument()
      expect(title).toHaveClass('govuk-error-summary__title')

      const visuallyHidden = title.querySelector('.govuk-visually-hidden')
      expect(visuallyHidden).toHaveTextContent('Error:')
    })

    it('error link points to checkbox with correct href', () => {
      render(<Form {...defaultProps} />)

      const agreeButton = screen.getByRole('button', { name: /yes/i })
      fireEvent.click(agreeButton)

      const errorLink = screen.getByRole('link', { name: /You must accept the terms/ })
      expect(errorLink).toHaveAttribute('href', '#acknowledgement')
    })
  })
})

describe('renderErrorSummary', () => {
  it('renders error summary with provided message', () => {
    const message = 'Test error message'
    const { container } = render(<div>{renderErrorSummary(message)}</div>)

    expect(container.querySelector('.govuk-error-summary')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('includes correct error structure', () => {
    const message = 'Custom error'
    render(<div>{renderErrorSummary(message)}</div>)

    expect(screen.getByText('There is a problem')).toBeInTheDocument()
    expect(screen.getByText('Error:')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: message })).toBeInTheDocument()
  })

  it('error link has correct href attribute', () => {
    const message = 'Another error'
    render(<div>{renderErrorSummary(message)}</div>)

    const link = screen.getByRole('link', { name: message })
    expect(link).toHaveAttribute('href', '#acknowledgement')
  })
})
