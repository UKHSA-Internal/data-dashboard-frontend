import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@/config/test-utils'

import DropdownTab from './DropdownTab'

describe('DropdownTab Component', () => {
  const chartIdentifier = 'test-chart'

  beforeEach(() => {
    // Set up DOM elements that will be manipulated
    document.body.innerHTML = `
      <div id="chart-${chartIdentifier}-content" data-state="active"></div>
      <div id="table-${chartIdentifier}-content" data-state="inactive"></div>
      <div id="download-${chartIdentifier}-content" data-state="inactive"></div>
      <div id="about-${chartIdentifier}-content" data-state="inactive"></div>
    `
  })

  it('renders without crashing', () => {
    render(
      <DropdownTab
        className="govuk-select relative mb-[-1px] block min-w-[7em] rounded-none border border-b-0 border-mid-grey py-0 sm:hidden"
        chartIdentifier={chartIdentifier}
      />
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders all dropdown options', () => {
    render(
      <DropdownTab
        className="govuk-select relative mb-[-1px] block min-w-[7em] rounded-none border border-b-0 border-mid-grey py-0 sm:hidden"
        chartIdentifier={chartIdentifier}
      />
    )

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(4)
    expect(options.map((option) => option.textContent)).toEqual(['Chart', 'Tabular Data', 'Download', 'About'])
  })

  it('changes active state on selecting an option', () => {
    render(
      <DropdownTab
        className="govuk-select relative mb-[-1px] block min-w-[7em] rounded-none border border-b-0 border-mid-grey py-0 sm:hidden"
        chartIdentifier={chartIdentifier}
      />
    )

    const dropdown = screen.getByRole('combobox') as HTMLSelectElement
    fireEvent.change(dropdown, { target: { value: 'table' } })

    expect(document.getElementById(`chart-${chartIdentifier}-content`)).toHaveAttribute('data-state', 'inactive')
    expect(document.getElementById(`table-${chartIdentifier}-content`)).toHaveAttribute('data-state', 'active')
  })

  it('sets all non-selected options to inactive', () => {
    render(
      <DropdownTab
        className="govuk-select relative mb-[-1px] block min-w-[7em] rounded-none border border-b-0 border-mid-grey py-0 sm:hidden"
        chartIdentifier={chartIdentifier}
      />
    )

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'download' } })

    expect(document.getElementById(`chart-${chartIdentifier}-content`)).toHaveAttribute('data-state', 'inactive')
    expect(document.getElementById(`table-${chartIdentifier}-content`)).toHaveAttribute('data-state', 'inactive')
    expect(document.getElementById(`about-${chartIdentifier}-content`)).toHaveAttribute('data-state', 'inactive')
    expect(document.getElementById(`download-${chartIdentifier}-content`)).toHaveAttribute('data-state', 'active')
  })
})
