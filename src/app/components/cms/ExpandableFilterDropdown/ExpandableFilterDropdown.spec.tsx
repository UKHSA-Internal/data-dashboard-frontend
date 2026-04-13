import '@testing-library/jest-dom'

import React from 'react'

import { fireEvent, render, screen } from '@/config/test-utils'

import { ExpandableFilterDropdown, type ExpandableFilterItem } from './ExpandableFilterDropdown'

const mockTopicsAndThemes: ExpandableFilterItem[] = [
  {
    id: 'theme-infectious-diseases',
    label: 'Infectious diseases',
    children: [
      { id: 'topic-covid-19', label: 'COVID-19' },
      { id: 'topic-flu', label: 'Seasonal flu' },
      { id: 'topic-tb', label: 'Tuberculosis' },
    ],
  },
  {
    id: 'theme-environmental-health',
    label: 'Environmental health',
    children: [
      { id: 'topic-air-quality', label: 'Air quality' },
      { id: 'topic-radiation', label: 'Radiation' },
    ],
  },
]

const mockFlatItems: ExpandableFilterItem[] = [
  { id: 'topic-covid-19', label: 'COVID-19' },
  { id: 'topic-flu', label: 'Seasonal flu' },
]

const mockMixedItems: ExpandableFilterItem[] = [
  { id: 'topic-other', label: 'Other health topic' },
  {
    id: 'theme-environmental-health',
    label: 'Environmental health',
    children: [{ id: 'topic-air-quality', label: 'Air quality' }],
  },
]

describe('ExpandableFilterDropdown', () => {
  describe('initial rendering', () => {
    test('does not show selected filters list when nothing is selected', () => {
      render(<ExpandableFilterDropdown items={mockFlatItems} />)

      expect(screen.queryByTestId('expandable-filter-selected-list')).not.toBeInTheDocument()
    })

    test('button has correct aria attributes when closed', () => {
      render(<ExpandableFilterDropdown items={mockFlatItems} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      expect(button).toHaveAttribute('aria-expanded', 'false')
      expect(button).toHaveAttribute('aria-controls')
    })

    test('button has aria-expanded true when dropdown is open', () => {
      render(<ExpandableFilterDropdown items={mockFlatItems} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('dropdown opening and closing', () => {
    test('opens dropdown when button is clicked', () => {
      render(<ExpandableFilterDropdown items={mockFlatItems} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)

      expect(screen.getByTestId('expandable-filter-dropdown-content')).toBeInTheDocument()
      expect(screen.getByText('COVID-19')).toBeInTheDocument()
      expect(screen.getByText('Seasonal flu')).toBeInTheDocument()
    })

    test('closes dropdown when button is clicked again', () => {
      render(<ExpandableFilterDropdown items={mockFlatItems} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)
      expect(screen.getByTestId('expandable-filter-dropdown-content')).toBeInTheDocument()

      fireEvent.click(button)
      expect(screen.queryByTestId('expandable-filter-dropdown-content')).not.toBeInTheDocument()
    })

    test('opens dropdown with Enter key', () => {
      render(<ExpandableFilterDropdown items={mockFlatItems} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.keyDown(button, { key: 'Enter' })

      expect(screen.getByTestId('expandable-filter-dropdown-content')).toBeInTheDocument()
    })

    test('opens dropdown with Space key', () => {
      render(<ExpandableFilterDropdown items={mockFlatItems} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.keyDown(button, { key: ' ' })

      expect(screen.getByTestId('expandable-filter-dropdown-content')).toBeInTheDocument()
    })

    test('closes dropdown when Escape is pressed', () => {
      render(<ExpandableFilterDropdown items={mockFlatItems} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)
      expect(screen.getByTestId('expandable-filter-dropdown-content')).toBeInTheDocument()

      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByTestId('expandable-filter-dropdown-content')).not.toBeInTheDocument()
    })

    test('closes dropdown when clicking outside', () => {
      render(
        <div>
          <div data-testid="outside">Outside</div>
          <ExpandableFilterDropdown items={mockFlatItems} />
        </div>
      )

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)
      expect(screen.getByTestId('expandable-filter-dropdown-content')).toBeInTheDocument()

      fireEvent.mouseDown(screen.getByTestId('outside'))
      expect(screen.queryByTestId('expandable-filter-dropdown-content')).not.toBeInTheDocument()
    })
  })

  describe('flat items selection', () => {
    test('selects a flat item when checkbox is clicked', () => {
      render(<ExpandableFilterDropdown items={mockFlatItems} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)

      const covidCheckbox = screen.getByLabelText('COVID-19')
      fireEvent.click(covidCheckbox)

      expect(screen.getByTestId('expandable-filter-selected-list')).toBeInTheDocument()
      expect(screen.getByTestId('selected-filters-list')).toHaveTextContent('COVID-19')
    })

    test('deselects a flat item when checkbox is clicked again', () => {
      render(<ExpandableFilterDropdown items={mockFlatItems} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)

      const covidCheckbox = screen.getByLabelText('COVID-19')
      fireEvent.click(covidCheckbox)
      expect(screen.getByTestId('selected-filters-list')).toHaveTextContent('COVID-19')

      fireEvent.click(covidCheckbox)
      expect(screen.queryByTestId('expandable-filter-selected-list')).not.toBeInTheDocument()
    })

    test('can select multiple flat items', () => {
      render(<ExpandableFilterDropdown items={mockFlatItems} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)

      fireEvent.click(screen.getByLabelText('COVID-19'))
      fireEvent.click(screen.getByLabelText('Seasonal flu'))

      const selectedList = screen.getByTestId('selected-filters-list')
      expect(selectedList).toHaveTextContent('COVID-19')
      expect(selectedList).toHaveTextContent('Seasonal flu')
      expect(screen.getByText('Selected filters (2)')).toBeInTheDocument()
    })
  })

  describe('nested items - expand/collapse', () => {
    test('renders parent items with expand buttons', () => {
      render(<ExpandableFilterDropdown items={mockTopicsAndThemes} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)

      expect(screen.getByText('Infectious diseases')).toBeInTheDocument()
      expect(screen.getByText('Environmental health')).toBeInTheDocument()
      expect(screen.getAllByTitle('Expand')).toHaveLength(2)
    })

    test('expands parent to show children when expand button is clicked', () => {
      render(<ExpandableFilterDropdown items={mockTopicsAndThemes} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)

      const expandButtons = screen.getAllByTitle('Expand')
      fireEvent.click(expandButtons[0])

      expect(screen.getByText('COVID-19')).toBeInTheDocument()
      expect(screen.getByText('Seasonal flu')).toBeInTheDocument()
      expect(screen.getByTitle('Collapse')).toBeInTheDocument()
    })

    test('collapses parent when expand button is clicked again', () => {
      render(<ExpandableFilterDropdown items={mockTopicsAndThemes} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)

      const expandButtons = screen.getAllByTitle('Expand')
      fireEvent.click(expandButtons[0])
      expect(screen.getByText('COVID-19')).toBeInTheDocument()

      const collapseButton = screen.getByTitle('Collapse')
      fireEvent.click(collapseButton)
      expect(screen.queryByText('COVID-19')).not.toBeInTheDocument()
    })
  })

  describe('nested items - parent selection', () => {
    test('selecting parent selects all children', () => {
      render(<ExpandableFilterDropdown items={mockTopicsAndThemes} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)

      fireEvent.click(screen.getByLabelText('Infectious diseases'))

      const selectedList = screen.getByTestId('selected-filters-list')
      expect(selectedList).toHaveTextContent('Infectious diseases')
      expect(screen.getByText('Selected filters (1)')).toBeInTheDocument()
    })

    test('deselecting parent deselects all children', () => {
      render(<ExpandableFilterDropdown items={mockTopicsAndThemes} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)

      fireEvent.click(screen.getByLabelText('Infectious diseases'))
      expect(screen.getByTestId('expandable-filter-selected-list')).toBeInTheDocument()

      fireEvent.click(screen.getByLabelText('Infectious diseases'))
      expect(screen.queryByTestId('expandable-filter-selected-list')).not.toBeInTheDocument()
    })
  })

  describe('nested items - child selection', () => {
    test('selecting individual child shows child in selected list', () => {
      render(<ExpandableFilterDropdown items={mockTopicsAndThemes} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)

      const expandButtons = screen.getAllByTitle('Expand')
      fireEvent.click(expandButtons[0])

      fireEvent.click(screen.getByLabelText('COVID-19'))

      const selectedList = screen.getByTestId('selected-filters-list')
      expect(selectedList).toHaveTextContent('COVID-19')
    })

    test('selecting all children shows parent in selected list', () => {
      render(<ExpandableFilterDropdown items={mockTopicsAndThemes} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)

      const expandButtons = screen.getAllByTitle('Expand')
      fireEvent.click(expandButtons[0])

      fireEvent.click(screen.getByLabelText('COVID-19'))
      fireEvent.click(screen.getByLabelText('Seasonal flu'))
      fireEvent.click(screen.getByLabelText('Tuberculosis'))

      const selectedList = screen.getByTestId('selected-filters-list')
      expect(selectedList).toHaveTextContent('Infectious diseases')
      expect(screen.getByText('Selected filters (1)')).toBeInTheDocument()
    })

    test('deselecting one child when all selected shows individual children', () => {
      render(<ExpandableFilterDropdown items={mockTopicsAndThemes} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)

      const expandButtons = screen.getAllByTitle('Expand')
      fireEvent.click(expandButtons[0])

      fireEvent.click(screen.getByLabelText('COVID-19'))
      fireEvent.click(screen.getByLabelText('Seasonal flu'))
      fireEvent.click(screen.getByLabelText('Tuberculosis'))
      expect(screen.getByTestId('selected-filters-list')).toHaveTextContent('Infectious diseases')

      fireEvent.click(screen.getByLabelText('Seasonal flu'))
      const selectedList = screen.getByTestId('selected-filters-list')
      expect(selectedList).toHaveTextContent('COVID-19')
      expect(selectedList).not.toHaveTextContent('Infectious diseases')
    })
  })

  describe('selected items removal', () => {
    test('removes selected item when remove button is clicked', () => {
      render(<ExpandableFilterDropdown items={mockFlatItems} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)
      fireEvent.click(screen.getByLabelText('COVID-19'))

      const removeButtons = screen.getAllByRole('button').filter((b) => b.textContent?.includes('COVID-19'))
      fireEvent.click(removeButtons[removeButtons.length - 1])

      expect(screen.queryByTestId('expandable-filter-selected-list')).not.toBeInTheDocument()
    })

    test('clears all selections when "Clear filter selection" is clicked', () => {
      render(<ExpandableFilterDropdown items={mockFlatItems} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)
      fireEvent.click(screen.getByLabelText('COVID-19'))
      fireEvent.click(screen.getByLabelText('Seasonal flu'))

      expect(screen.getByText('Selected filters (2)')).toBeInTheDocument()

      fireEvent.click(screen.getByText('Clear filter selection'))

      expect(screen.queryByTestId('expandable-filter-selected-list')).not.toBeInTheDocument()
    })

    test('removing parent selection removes all children from selected state', () => {
      render(<ExpandableFilterDropdown items={mockTopicsAndThemes} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)
      fireEvent.click(screen.getByLabelText('Infectious diseases'))

      const removeButtons = screen.getAllByRole('button').filter((b) => b.textContent?.includes('Infectious diseases'))
      fireEvent.click(removeButtons[removeButtons.length - 1])

      expect(screen.queryByTestId('expandable-filter-selected-list')).not.toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    test('expand button has correct aria-expanded state', () => {
      render(<ExpandableFilterDropdown items={mockTopicsAndThemes} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)

      const expandButtons = screen.getAllByTitle('Expand')
      expect(expandButtons[0]).toHaveAttribute('aria-expanded', 'false')

      fireEvent.click(expandButtons[0])
      const collapseButton = screen.getByTitle('Collapse')
      expect(collapseButton).toHaveAttribute('aria-expanded', 'true')
      expect(collapseButton).toHaveAttribute('aria-label', 'Collapse Infectious diseases')
    })

    test('checkboxes have correct checked state', () => {
      render(<ExpandableFilterDropdown items={mockFlatItems} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)

      const covidCheckbox = screen.getByLabelText('COVID-19')
      expect(covidCheckbox).not.toBeChecked()

      fireEvent.click(covidCheckbox)
      expect(screen.getByLabelText('COVID-19')).toBeChecked()
    })
  })

  describe('mixed flat and nested items', () => {
    test('renders both flat and nested items correctly', () => {
      render(<ExpandableFilterDropdown items={mockMixedItems} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)

      expect(screen.getByText('Other health topic')).toBeInTheDocument()
      expect(screen.getByText('Environmental health')).toBeInTheDocument()
    })

    test('can select flat item and nested item independently', () => {
      render(<ExpandableFilterDropdown items={mockMixedItems} />)

      const button = screen.getByRole('button', { name: 'Select themes or topics to view' })
      fireEvent.click(button)

      fireEvent.click(screen.getByLabelText('Other health topic'))

      const expandButtons = screen.getAllByTitle('Expand')
      fireEvent.click(expandButtons[0])
      fireEvent.click(screen.getByLabelText('Air quality'))

      const selectedList = screen.getByTestId('selected-filters-list')
      expect(selectedList).toHaveTextContent('Other health topic')
      expect(selectedList).toHaveTextContent('Environmental health')
    })
  })
})
