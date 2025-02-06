import { render, screen } from '@/config/test-utils'

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
})
