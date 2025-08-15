import React from 'react'

import { FilterOption } from '@/app/context/globalFilterContext'
import { useSelectedFilters } from '@/app/hooks/globalFilterHooks'
import { fireEvent, render, screen } from '@/config/test-utils'

import { MultiselectDropdown } from './MultiselectDropdown'

// Mock the useSelectedFilters hook
jest.mock('@/app/hooks/globalFilterHooks', () => ({
  useSelectedFilters: jest.fn(),
}))

interface MockFilterFunctions {
  updateFilters: jest.MockedFunction<(newFilters: FilterOption[]) => void>
  addFilter: jest.MockedFunction<(filter: FilterOption) => void>
  removeFilter: jest.MockedFunction<(filterId: string) => void>
  clearFilters: jest.MockedFunction<() => void>
}

const mockUseSelectedFilters = useSelectedFilters as jest.MockedFunction<typeof useSelectedFilters>

describe('flat multiselect component', () => {
  let mockSelectedFilters: FilterOption[] = []
  let mockFunctions: MockFilterFunctions

  beforeEach(() => {
    mockSelectedFilters = []
    jest.clearAllMocks()

    mockFunctions = {
      updateFilters: jest.fn((newFilters: Array<{ id: string; label: string }>) => {
        mockSelectedFilters = newFilters
      }),
      addFilter: jest.fn((filter: { id: string; label: string }) => {
        if (!mockSelectedFilters.some((selectedFilter) => selectedFilter.id === filter.id)) {
          mockSelectedFilters = [...mockSelectedFilters, filter]
        }
      }),
      removeFilter: jest.fn((filterId: string) => {
        mockSelectedFilters = mockSelectedFilters.filter((filter) => filter.id !== filterId)
      }),
      clearFilters: jest.fn(() => {
        mockSelectedFilters = []
      }),
    }

    mockUseSelectedFilters.mockReturnValue({
      selectedFilters: mockSelectedFilters,
      ...mockFunctions,
    })
  })

  const name = 'Test Dropdown'

  it('renders the dropdown button', () => {
    render(<MultiselectDropdown name={name} />)

    expect(screen.getByRole('button', { name })).toBeInTheDocument()
  })

  it('opens and closes the dropdown on click', () => {
    render(<MultiselectDropdown name={name} />)

    const button = screen.getByRole('button', { name })
    fireEvent.click(button)
    expect(screen.getByRole('listbox')).toBeVisible()
    fireEvent.click(button)
    expect(screen.getByRole('listbox')).toHaveClass('hidden')
  })

  it('opens the dropdown with keyboard (Enter/Space)', () => {
    render(<MultiselectDropdown name={name} />)

    const button = screen.getByRole('button', { name })
    fireEvent.keyDown(button, { key: 'Enter' })
    expect(screen.getByRole('listbox')).toBeVisible()
    fireEvent.click(button) // close
    fireEvent.keyDown(button, { key: ' ' })
    expect(screen.getByRole('listbox')).toBeVisible()
  })

  it('focuses first option on ArrowDown from button', () => {
    render(<MultiselectDropdown name={name} />)

    const button = screen.getByRole('button', { name })
    fireEvent.keyDown(button, { key: 'ArrowDown' })
    fireEvent.keyDown(button, { key: 'ArrowDown' }) // Need to press twice, once to open, once to select checkbox
    const checkboxes = screen.getAllByRole('checkbox')
    expect(document.activeElement).toBe(checkboxes[0])
  })

  it('focuses last option on ArrowUp from button', () => {
    render(<MultiselectDropdown name={name} />)

    const button = screen.getByRole('button', { name })
    fireEvent.keyDown(button, { key: 'ArrowDown' }) // Opens dropdown
    fireEvent.keyDown(button, { key: 'ArrowUp' }) // Selects last item
    const checkboxes = screen.getAllByRole('checkbox')
    expect(document.activeElement).toBe(checkboxes[checkboxes.length - 1])
  })

  it('cycles through options with ArrowDown/ArrowUp', () => {
    render(<MultiselectDropdown name={name} />)

    const button = screen.getByRole('button', { name })
    fireEvent.click(button)
    const checkboxes = screen.getAllByRole('checkbox')
    checkboxes[0].focus()
    fireEvent.keyDown(checkboxes[0], { key: 'ArrowDown' })
    expect(document.activeElement).toBe(checkboxes[1])
    fireEvent.keyDown(checkboxes[1], { key: 'ArrowUp' })
    expect(document.activeElement).toBe(checkboxes[0])
  })

  it('toggles option selection with Space/Enter', () => {
    const { rerender } = render(<MultiselectDropdown name={name} />)

    const button = screen.getByRole('button', { name })
    fireEvent.click(button)

    let checkboxes = screen.getAllByRole('checkbox')
    checkboxes[0].focus()
    expect(document.activeElement).toBe(checkboxes[0])
    expect(checkboxes[0]).not.toBeChecked()

    fireEvent.keyDown(checkboxes[0], { key: 'ArrowDown' })
    expect(document.activeElement).toBe(checkboxes[1])

    // Trigger the space key event
    fireEvent.keyDown(checkboxes[1], { key: ' ' })

    // Verify the mock was called
    expect(mockFunctions.addFilter).toHaveBeenCalledWith({
      id: 'Test Dropdown.test2',
      label: 'test2',
    })

    // Update the mock with the new state
    mockUseSelectedFilters.mockReturnValue({
      selectedFilters: mockSelectedFilters,
      ...mockFunctions,
    })

    // Re-render the component to reflect the state change
    rerender(<MultiselectDropdown name={name} />)

    // Get fresh checkbox references after re-render
    checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes[1]).toBeChecked()
  })

  it('enforces selection limit for single depth filters', () => {
    const { rerender } = render(<MultiselectDropdown name={name} selectionLimit={2} />)

    const button = screen.getByRole('button', { name })
    fireEvent.click(button)

    let checkboxes = screen.getAllByRole('checkbox')

    // Select first option
    fireEvent.click(checkboxes[0])
    expect(mockFunctions.addFilter).toHaveBeenCalledWith({
      id: 'Test Dropdown.test1',
      label: 'test1',
    })

    // Update mock and re-render
    mockUseSelectedFilters.mockReturnValue({
      selectedFilters: mockSelectedFilters,
      ...mockFunctions,
    })
    rerender(<MultiselectDropdown name={name} selectionLimit={2} />)

    checkboxes = screen.getAllByRole('checkbox')

    // Select second option
    fireEvent.click(checkboxes[1])
    expect(mockFunctions.addFilter).toHaveBeenCalledWith({
      id: 'Test Dropdown.test2',
      label: 'test2',
    })

    // Update mock and re-render
    mockUseSelectedFilters.mockReturnValue({
      selectedFilters: mockSelectedFilters,
      ...mockFunctions,
    })
    rerender(<MultiselectDropdown name={name} selectionLimit={2} />)

    checkboxes = screen.getAllByRole('checkbox')

    expect(checkboxes[0]).toBeChecked()
    expect(checkboxes[1]).toBeChecked()

    // Third and fourth options should be disabled
    expect(checkboxes[2]).toBeDisabled()
    expect(checkboxes[3]).toBeDisabled()

    // Deselect one option
    fireEvent.click(checkboxes[0])
    expect(mockFunctions.removeFilter).toHaveBeenCalledWith('Test Dropdown.test1')

    // Update mock and re-render
    mockUseSelectedFilters.mockReturnValue({
      selectedFilters: mockSelectedFilters,
      ...mockFunctions,
    })
    rerender(<MultiselectDropdown name={name} selectionLimit={2} />)

    checkboxes = screen.getAllByRole('checkbox')

    expect(checkboxes[0]).not.toBeChecked()
    // Third option should now be enabled
    expect(checkboxes[2]).not.toBeDisabled()
  })
})

describe('nested multiselect', () => {
  let mockSelectedFilters: Array<{ id: string; label: string }> = []
  let mockFunctions: MockFilterFunctions

  beforeEach(() => {
    mockSelectedFilters = []
    jest.clearAllMocks()

    mockFunctions = {
      updateFilters: jest.fn((newFilters: Array<{ id: string; label: string }>) => {
        mockSelectedFilters = newFilters
      }),
      addFilter: jest.fn((filter: { id: string; label: string }) => {
        if (!mockSelectedFilters.some((selectedFilter) => selectedFilter.id === filter.id)) {
          mockSelectedFilters = [...mockSelectedFilters, filter]
        }
      }),
      removeFilter: jest.fn((filterId: string) => {
        mockSelectedFilters = mockSelectedFilters.filter((filter) => filter.id !== filterId)
      }),
      clearFilters: jest.fn(() => {
        mockSelectedFilters = []
      }),
    }

    mockUseSelectedFilters.mockReturnValue({
      selectedFilters: mockSelectedFilters,
      ...mockFunctions,
    })
  })

  const name = 'Nested Dropdown'
  function setup() {
    const renderResult = render(<MultiselectDropdown name={name} nestedMultiselect={true} />)
    const button = screen.getByRole('button', { name })
    fireEvent.click(button)
    return { button, ...renderResult }
  }

  it('renders group and child options', () => {
    setup()
    expect(screen.getByText('Group 1')).toBeInTheDocument()
    expect(screen.getByText('Group 2')).toBeInTheDocument()
    expect(screen.getByText('child1')).toBeInTheDocument()
    expect(screen.getByText('child5')).toBeInTheDocument()
  })

  it('renders correct roles and aria attributes', () => {
    setup()
    const group = screen.getByLabelText('Group 1').closest('[role="option"]')
    const child = screen.getByLabelText('child1').closest('[role="option"]')
    expect(group).toHaveAttribute('aria-selected')
    expect(child).toHaveAttribute('aria-selected')
  })

  it('arrow keys move between group and child options', () => {
    setup()
    const checkboxes = screen.getAllByRole('checkbox')
    checkboxes[0].focus()
    fireEvent.keyDown(checkboxes[0], { key: 'ArrowDown' })
    expect(document.activeElement).toBe(checkboxes[1])
    fireEvent.keyDown(checkboxes[1], { key: 'ArrowDown' })
    expect(document.activeElement).toBe(checkboxes[2])
    fireEvent.keyDown(checkboxes[2], { key: 'ArrowUp' })
    expect(document.activeElement).toBe(checkboxes[1])
  })

  it('space/enter toggles group selection (selects/deselects all children)', () => {
    const { rerender } = setup()

    let groupCheckbox = screen.getByLabelText('Group 1')
    let child1 = screen.getByLabelText('child1')
    let child2 = screen.getByLabelText('child2')
    let child3 = screen.getByLabelText('child3')

    expect(child1).not.toBeChecked()
    expect(child2).not.toBeChecked()
    expect(child3).not.toBeChecked()

    groupCheckbox.focus()
    fireEvent.keyDown(groupCheckbox, { key: ' ' })

    // Verify the updateFilters was called with all children
    expect(mockFunctions.updateFilters).toHaveBeenCalledWith([
      { id: 'Nested Dropdown.child1', label: 'child1' },
      { id: 'Nested Dropdown.child2', label: 'child2' },
      { id: 'Nested Dropdown.child3', label: 'child3' },
    ])

    // Update mock and re-render
    mockUseSelectedFilters.mockReturnValue({
      selectedFilters: mockSelectedFilters,
      ...mockFunctions,
    })
    rerender(<MultiselectDropdown name={name} nestedMultiselect={true} />)

    // Get fresh references after re-render
    groupCheckbox = screen.getByLabelText('Group 1')
    child1 = screen.getByLabelText('child1')
    child2 = screen.getByLabelText('child2')
    child3 = screen.getByLabelText('child3')

    expect(child1).toBeChecked()
    expect(child2).toBeChecked()
    expect(child3).toBeChecked()
    expect(groupCheckbox).toBeChecked()

    // Test deselecting all
    groupCheckbox.focus()
    fireEvent.keyDown(groupCheckbox, { key: ' ' })

    // Verify updateFilters was called to remove all group children
    expect(mockFunctions.updateFilters).toHaveBeenLastCalledWith([])

    // Update mock and re-render
    mockUseSelectedFilters.mockReturnValue({
      selectedFilters: mockSelectedFilters,
      ...mockFunctions,
    })
    rerender(<MultiselectDropdown name={name} nestedMultiselect={true} />)

    // Get fresh references
    child1 = screen.getByLabelText('child1')
    child2 = screen.getByLabelText('child2')
    child3 = screen.getByLabelText('child3')

    expect(child1).not.toBeChecked()
    expect(child2).not.toBeChecked()
    expect(child3).not.toBeChecked()
  })

  it('space/enter toggles individual child selection', () => {
    const { rerender } = setup()

    let child1 = screen.getByLabelText('child1')

    child1.focus()
    fireEvent.keyDown(child1, { key: ' ' })

    // Verify addFilter was called
    expect(mockFunctions.addFilter).toHaveBeenCalledWith({
      id: 'Nested Dropdown.child1',
      label: 'child1',
    })

    // Update mock and re-render
    mockUseSelectedFilters.mockReturnValue({
      selectedFilters: mockSelectedFilters,
      ...mockFunctions,
    })
    rerender(<MultiselectDropdown name={name} nestedMultiselect={true} />)

    // Get fresh reference
    child1 = screen.getByLabelText('child1')
    expect(child1).toBeChecked()

    // Test deselecting
    child1.focus()
    fireEvent.keyDown(child1, { key: ' ' })

    // Verify removeFilter was called
    expect(mockFunctions.removeFilter).toHaveBeenCalledWith('Nested Dropdown.child1')

    // Update mock and re-render
    mockUseSelectedFilters.mockReturnValue({
      selectedFilters: mockSelectedFilters,
      ...mockFunctions,
    })
    rerender(<MultiselectDropdown name={name} nestedMultiselect={true} />)

    // Get fresh reference
    child1 = screen.getByLabelText('child1')
    expect(child1).not.toBeChecked()
  })

  it('selecting all children checks the group', () => {
    const { rerender } = setup()

    let groupCheckbox = screen.getByLabelText('Group 1')
    const child1 = screen.getByLabelText('child1')
    let child2 = screen.getByLabelText('child2')
    let child3 = screen.getByLabelText('child3')

    // Select first child
    fireEvent.click(child1)
    expect(mockFunctions.addFilter).toHaveBeenCalledWith({
      id: 'Nested Dropdown.child1',
      label: 'child1',
    })

    // Update and re-render
    mockUseSelectedFilters.mockReturnValue({
      selectedFilters: mockSelectedFilters,
      ...mockFunctions,
    })
    rerender(<MultiselectDropdown name={name} nestedMultiselect={true} />)

    // Get fresh references
    groupCheckbox = screen.getByLabelText('Group 1')
    child2 = screen.getByLabelText('child2')
    child3 = screen.getByLabelText('child3')

    // Select second child
    fireEvent.click(child2)
    expect(mockFunctions.addFilter).toHaveBeenCalledWith({
      id: 'Nested Dropdown.child2',
      label: 'child2',
    })

    // Update and re-render
    mockUseSelectedFilters.mockReturnValue({
      selectedFilters: mockSelectedFilters,
      ...mockFunctions,
    })
    rerender(<MultiselectDropdown name={name} nestedMultiselect={true} />)

    // Get fresh references
    groupCheckbox = screen.getByLabelText('Group 1')
    child3 = screen.getByLabelText('child3')

    // Select third child
    fireEvent.click(child3)
    expect(mockFunctions.addFilter).toHaveBeenCalledWith({
      id: 'Nested Dropdown.child3',
      label: 'child3',
    })

    // Update and re-render
    mockUseSelectedFilters.mockReturnValue({
      selectedFilters: mockSelectedFilters,
      ...mockFunctions,
    })
    rerender(<MultiselectDropdown name={name} nestedMultiselect={true} />)

    // Get fresh reference and verify group is checked
    groupCheckbox = screen.getByLabelText('Group 1')
    expect(groupCheckbox).toBeChecked()
  })

  it('deselecting any child unchecks the group', () => {
    setup()
    const groupCheckbox = screen.getByLabelText('Group 1')
    const child1 = screen.getByLabelText('child1')
    fireEvent.click(groupCheckbox) // select all
    fireEvent.click(child1) // deselect one
    expect(groupCheckbox).not.toBeChecked()
  })

  it('only the button is tabbable, not checkboxes', () => {
    setup()
    const button = screen.getByRole('button', { name })
    const checkboxes = screen.getAllByRole('checkbox')
    checkboxes.forEach((cb) => {
      expect(cb.tabIndex).toBe(-1)
    })
    expect(button.tabIndex).toBe(0)
  })

  it('focuses first option when dropdown opens', () => {
    render(<MultiselectDropdown name={name} nestedMultiselect={true} />)
    const button = screen.getByRole('button', { name })
    fireEvent.click(button)
    const checkboxes = screen.getAllByRole('checkbox')
    expect(document.activeElement).toBe(checkboxes[0])
  })

  it('multiple dropdowns: tab moves between buttons, not options', () => {
    render(
      <>
        <MultiselectDropdown name="Dropdown 1" nestedMultiselect={true} />
        <MultiselectDropdown name="Dropdown 2" nestedMultiselect={true} />
      </>
    )
    const buttons = screen.getAllByRole('button')
    buttons[0].focus()
    fireEvent.keyDown(buttons[0], { key: 'Tab' })
    // Simulate tabbing to next button
    buttons[1].focus()
    expect(document.activeElement).toBe(buttons[1])
  })
})
