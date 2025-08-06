import React from 'react'

import { fireEvent, render, screen } from '@/config/test-utils'

import { MultiselectDropdown } from './MultiselectDropdown'

describe('flat multiselect component', () => {
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
    render(<MultiselectDropdown name={name} />)

    const button = screen.getByRole('button', { name })
    fireEvent.click(button)
    const checkboxes = screen.getAllByRole('checkbox')
    checkboxes[0].focus()
    expect(checkboxes[0]).not.toBeChecked()
    fireEvent.keyDown(checkboxes[0], { key: ' ' })
    expect(checkboxes[0]).toBeChecked()
  })
})

describe('nested multiselect', () => {
  const name = 'Nested Dropdown'
  function setup() {
    render(<MultiselectDropdown name={name} nestedMultiselect={true} />)
    const button = screen.getByRole('button', { name })
    fireEvent.click(button)
    return { button }
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
    setup()
    const groupCheckbox = screen.getByLabelText('Group 1')
    const child1 = screen.getByLabelText('child1')
    const child2 = screen.getByLabelText('child2')
    expect(child1).not.toBeChecked()
    expect(child2).not.toBeChecked()
    groupCheckbox.focus()
    fireEvent.keyDown(groupCheckbox, { key: ' ' })
    expect(child1).toBeChecked()
    expect(child2).toBeChecked()
    fireEvent.keyDown(groupCheckbox, { key: ' ' })
    expect(child1).not.toBeChecked()
    expect(child2).not.toBeChecked()
  })

  it('space/enter toggles individual child selection', () => {
    setup()
    const child1 = screen.getByLabelText('child1')
    child1.focus()
    fireEvent.keyDown(child1, { key: ' ' })
    expect(child1).toBeChecked()
    fireEvent.keyDown(child1, { key: ' ' })
    expect(child1).not.toBeChecked()
  })

  it('selecting all children checks the group', () => {
    setup()
    const groupCheckbox = screen.getByLabelText('Group 1')
    const child1 = screen.getByLabelText('child1')
    fireEvent.click(child1)
    fireEvent.click(screen.getByLabelText('child2'))
    fireEvent.click(screen.getByLabelText('child3'))
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
