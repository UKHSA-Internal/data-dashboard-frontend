// Import statements for SelectedFilter tests
import { fireEvent, render, screen } from '@/config/test-utils'

import { SelectedFilter } from './SelectedFilter'

describe('SelectedFilter', () => {
  const mockOnRemove = jest.fn()

  beforeEach(() => {
    render(<SelectedFilter name="Test Filter" onRemove={mockOnRemove} />)
  })

  it('renders the filter name', () => {
    expect(screen.getByText('Test Filter')).toBeInTheDocument()
  })

  it('calls onRemove when clicked', () => {
    fireEvent.click(screen.getByText('Test Filter'))
    expect(mockOnRemove).toHaveBeenCalledWith('Test Filter')
  })
})
