import '@testing-library/jest-dom'

import { fireEvent, render, screen, waitFor } from '@/config/test-utils'

import DropdownTab from './DropdownTab'
import { Tabs, TabsContext } from './Tabs'

describe('DropdownTab Component', () => {
  const chartTitle = 'Test-chart'

  beforeEach(() => {
    // Set up DOM elements that will be manipulated
    document.body.innerHTML = `
      <div id="chart-${chartTitle}-content" data-state="active"></div>
      <div id="table-${chartTitle}-content" data-state="inactive"></div>
      <div id="download-${chartTitle}-content" data-state="inactive"></div>
      <div id="about-${chartTitle}-content" data-state="inactive"></div>
    `
  })

  it('throws an error when not rendered inside a Tab', () => {
    expect(() =>
      render(
        <DropdownTab
          className="govuk-select relative mb-[-1px] block min-w-[7em] rounded-none border border-b-0 border-mid-grey py-0 sm:hidden"
          tabGroupTitle={chartTitle}
          defaultValue={`${chartTitle}-chart`}
          showAbout={false}
        />
      )
    ).toThrow('DropdownTab must be used within the <Tabs/> component')
  })

  it('renders without crashing', () => {
    render(
      <Tabs>
        <DropdownTab
          className="govuk-select relative mb-[-1px] block min-w-[7em] rounded-none border border-b-0 border-mid-grey py-0 sm:hidden"
          tabGroupTitle={chartTitle}
          defaultValue={`${chartTitle}-chart`}
          showAbout={true}
          showDownload={false}
        />
      </Tabs>
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders all dropdown options', () => {
    render(
      <Tabs>
        <DropdownTab
          className="govuk-select relative mb-[-1px] block min-w-[7em] rounded-none border border-b-0 border-mid-grey py-0 sm:hidden"
          tabGroupTitle={chartTitle}
          defaultValue={`${chartTitle}-chart`}
          showAbout={true}
          showDownload={true}
        />
      </Tabs>
    )

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(4)
    expect(options.map((option) => option.textContent)).toEqual(['Chart', 'Tabular Data', 'Download', 'About'])
  })

  it('renders only 3 dropdown options when show about is false', () => {
    render(
      <Tabs>
        <DropdownTab
          className="govuk-select relative mb-[-1px] block min-w-[7em] rounded-none border border-b-0 border-mid-grey py-0 sm:hidden"
          tabGroupTitle={chartTitle}
          defaultValue={`${chartTitle}-chart`}
          showAbout={false}
        />
      </Tabs>
    )

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(3)
    expect(options.map((option) => option.textContent)).toEqual(['Chart', 'Tabular Data', 'Download'])
  })

  it('renders only the map if other options are set to false.', () => {
    render(
      <Tabs>
        <DropdownTab
          className="govuk-select relative mb-[-1px] block min-w-[7em] rounded-none border border-b-0 border-mid-grey py-0 sm:hidden"
          tabGroupTitle={chartTitle}
          defaultValue={`${chartTitle}-chart`}
          showAbout={false}
          showChart={false}
          showTable={false}
          showDownload={false}
          showMap={true}
        />
      </Tabs>
    )

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(1)
    expect(options.map((option) => option.textContent)).toEqual(['Map'])
  })

  it('changes active state on selecting an option', () => {
    const mockSetSelectedTab = jest.fn()
    render(
      <TabsContext.Provider value={['chart-default', mockSetSelectedTab]}>
        <Tabs>
          <DropdownTab
            className="govuk-select relative mb-[-1px] block min-w-[7em] rounded-none border border-b-0 border-mid-grey py-0 sm:hidden"
            tabGroupTitle={chartTitle}
            defaultValue={`${chartTitle}-chart`}
            showAbout={true}
          />
        </Tabs>
      </TabsContext.Provider>
    )

    const dropdown = screen.getByRole('combobox') as HTMLSelectElement
    fireEvent.change(dropdown, { target: { value: 'table' } })
    waitFor(() => {
      expect(document.getElementById(`chart-${chartTitle}-content`)).toHaveAttribute('data-state', 'inactive')
      expect(document.getElementById(`table-${chartTitle}-content`)).toHaveAttribute('data-state', 'active')
    })
  })
})
