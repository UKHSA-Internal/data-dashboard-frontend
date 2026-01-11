import { fireEvent, render, screen, waitFor } from '@/config/test-utils'

import DateField from './DateField'

describe('DateField component', () => {
  const mockProps = {
    label: 'Date of Birth',
    helpText: 'Enter a memorable date',
    cleanName: 'dob',
  }

  test('renders DateField component with label, helpText, and cleanName props', () => {
    render(<DateField {...mockProps} />)
    expect(screen.getByText('Date of Birth')).toBeInTheDocument()
    expect(screen.getByText('Enter a memorable date')).toBeInTheDocument()
  })

  test('renders the correct label text', () => {
    render(<DateField {...mockProps} />)
    const label = screen.getByText('Date of Birth')
    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'dob')
  })

  test('renders help text when provided', () => {
    render(<DateField {...mockProps} />)
    expect(screen.getByText('Enter a memorable date')).toBeInTheDocument()
  })

  test('does not render help text when empty', () => {
    render(<DateField label="Date of Birth" helpText="" cleanName="dob" />)
    const helpText = screen.queryByText('Enter a valid date')
    expect(helpText).not.toBeInTheDocument()
  })

  test('renders day, month, and year input fields', () => {
    render(<DateField {...mockProps} />)
    const dayInput = screen.getByLabelText(/day/i)
    const monthInput = screen.getByLabelText(/month/i)
    const yearInput = screen.getByLabelText(/year/i)

    expect(dayInput).toBeInTheDocument()
    expect(monthInput).toBeInTheDocument()
    expect(yearInput).toBeInTheDocument()
  })

  test('renders labels for Day, Month, and Year', () => {
    render(<DateField {...mockProps} />)

    // Check for the presence of each label
    expect(screen.getByLabelText(/day/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/month/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/year/i)).toBeInTheDocument()
  })

  test('input fields have correct attributes', () => {
    render(<DateField {...mockProps} />)

    const dayInput = screen.getByLabelText(/day/i)
    const monthInput = screen.getByLabelText(/month/i)
    const yearInput = screen.getByLabelText(/year/i)

    expect(dayInput).toHaveAttribute('id', 'day')
    expect(monthInput).toHaveAttribute('id', 'month')
    expect(yearInput).toHaveAttribute('id', 'year')

    expect(dayInput).toHaveAttribute('name', 'day')
    expect(monthInput).toHaveAttribute('name', 'month')
    expect(yearInput).toHaveAttribute('name', 'year')

    expect(dayInput).toHaveAttribute('type', 'number')
    expect(monthInput).toHaveAttribute('type', 'number')
    expect(yearInput).toHaveAttribute('type', 'number')

    expect(dayInput).toHaveAttribute('min', '1')
    expect(dayInput).toHaveAttribute('max', '31')
    expect(monthInput).toHaveAttribute('min', '1')
    expect(monthInput).toHaveAttribute('max', '12')
    expect(yearInput).toHaveAttribute('min', '1900')
    expect(yearInput).toHaveAttribute('max', '2100')
  })

  test('handleChange updates day input value', () => {
    render(<DateField {...mockProps} />)
    const dayInput = screen.getByLabelText(/day/i) as HTMLInputElement

    fireEvent.change(dayInput, { target: { name: 'day', value: '15' } })

    expect(dayInput.value).toBe('15')
  })

  test('handleChange updates month input value', () => {
    render(<DateField {...mockProps} />)
    const monthInput = screen.getByLabelText(/month/i) as HTMLInputElement

    fireEvent.change(monthInput, { target: { name: 'month', value: '6' } })

    expect(monthInput.value).toBe('6')
  })

  test('handleChange updates year input value', () => {
    render(<DateField {...mockProps} />)
    const yearInput = screen.getByLabelText(/year/i) as HTMLInputElement

    fireEvent.change(yearInput, { target: { name: 'year', value: '2023' } })

    expect(yearInput.value).toBe('2023')
  })

  test('handleChange updates multiple fields independently', () => {
    render(<DateField {...mockProps} />)
    const dayInput = screen.getByLabelText(/day/i) as HTMLInputElement
    const monthInput = screen.getByLabelText(/month/i) as HTMLInputElement
    const yearInput = screen.getByLabelText(/year/i) as HTMLInputElement

    fireEvent.change(dayInput, { target: { name: 'day', value: '15' } })
    fireEvent.change(monthInput, { target: { name: 'month', value: '6' } })
    fireEvent.change(yearInput, { target: { name: 'year', value: '2023' } })

    expect(dayInput.value).toBe('15')
    expect(monthInput.value).toBe('6')
    expect(yearInput.value).toBe('2023')
  })

  test('useEffect sets hiddenDateInput when all date fields are filled', async () => {
    render(<DateField {...mockProps} />)
    const dayInput = screen.getByLabelText(/day/i) as HTMLInputElement
    const monthInput = screen.getByLabelText(/month/i) as HTMLInputElement
    const yearInput = screen.getByLabelText(/year/i) as HTMLInputElement
    const hiddenInput = screen.getByLabelText(/Unused Hidden Date Input/i) as HTMLInputElement

    fireEvent.change(dayInput, { target: { name: 'day', value: '15' } })
    fireEvent.change(monthInput, { target: { name: 'month', value: '6' } })
    fireEvent.change(yearInput, { target: { name: 'year', value: '2023' } })

    await waitFor(() => {
      expect(hiddenInput.value).toBe('15-6-2023')
    })
  })

  test('useEffect clears hiddenDateInput when any date field is empty', async () => {
    render(<DateField {...mockProps} />)
    const dayInput = screen.getByLabelText(/day/i) as HTMLInputElement
    const monthInput = screen.getByLabelText(/month/i) as HTMLInputElement
    const yearInput = screen.getByLabelText(/year/i) as HTMLInputElement
    const hiddenInput = screen.getByLabelText(/Unused Hidden Date Input/i) as HTMLInputElement

    // Fill all fields
    fireEvent.change(dayInput, { target: { name: 'day', value: '15' } })
    fireEvent.change(monthInput, { target: { name: 'month', value: '6' } })
    fireEvent.change(yearInput, { target: { name: 'year', value: '2023' } })

    await waitFor(() => {
      expect(hiddenInput.value).toBe('15-6-2023')
    })

    // Clear one field
    fireEvent.change(dayInput, { target: { name: 'day', value: '' } })

    await waitFor(() => {
      expect(hiddenInput.value).toBe('')
    })
  })

  test('useEffect does not set hiddenDateInput when only some fields are filled', async () => {
    render(<DateField {...mockProps} />)
    const dayInput = screen.getByLabelText(/day/i) as HTMLInputElement
    const monthInput = screen.getByLabelText(/month/i) as HTMLInputElement
    const hiddenInput = screen.getByLabelText(/Unused Hidden Date Input/i) as HTMLInputElement

    fireEvent.change(dayInput, { target: { name: 'day', value: '15' } })
    fireEvent.change(monthInput, { target: { name: 'month', value: '6' } })

    await waitFor(() => {
      expect(hiddenInput.value).toBe('')
    })
  })

  test('renders error message when fieldHasError is true', () => {
    render(<DateField {...mockProps} fieldHasError={true} />)
    expect(screen.getByText(/Please enter a valid date/i)).toBeInTheDocument()
  })

  test('does not render error message when fieldHasError is false', () => {
    render(<DateField {...mockProps} fieldHasError={false} />)
    expect(screen.queryByText(/Please enter a valid date/i)).not.toBeInTheDocument()
  })

  test('applies error styling when fieldHasError is true', () => {
    render(<DateField {...mockProps} fieldHasError={true} />)
    const formGroup = screen.getByText('Date of Birth').closest('.govuk-form-group')
    expect(formGroup).toHaveClass('govuk-form-group--error')
  })

  test('hidden input has correct name attribute', () => {
    render(<DateField {...mockProps} />)
    const hiddenInput = screen.getByLabelText(/Unused Hidden Date Input/i)
    expect(hiddenInput).toHaveAttribute('name', 'dob')
  })
})
