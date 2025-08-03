import React from 'react'

import { fireEvent, render, screen } from '@/config/test-utils'

import { MultiselectDropdown } from './MultiselectDropdown'

describe('MultiselectDropdown', () => {
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
