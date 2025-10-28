import { useSelectedFilters, useVaccinationState } from '@/app/hooks/globalFilterHooks'
import { fireEvent, render, screen } from '@/config/test-utils'

import { VaccinationDropdown } from './VaccinationDropdown'

// Mock hooks
jest.mock('@/app/hooks/globalFilterHooks')

const mockVaccinationList = [
  {
    id: '1',
    value: { label: '6-in-1 (1 year)' },
  },
  {
    id: '2',
    value: { label: 'MMR1 (1 year)' },
  },
] as object[]

describe('VaccinationDropdown', () => {
  const setSelectedVaccination = jest.fn()
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useVaccinationState as jest.Mock).mockReturnValue({
      vaccinationList: mockVaccinationList,
      selectedVaccination: null,
      setSelectedVaccination,
    })
  })

  it('renders with placeholder', () => {
    ;(useSelectedFilters as jest.Mock).mockReturnValue({ selectedFilters: [] })

    render(<VaccinationDropdown onChange={mockOnChange} />)

    expect(screen.getByText('Vaccine Selection')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveValue('')
    expect(screen.getByText('Select a vaccination')).toBeInTheDocument()
  })

  it('shows all vaccinations when no filters selected', () => {
    ;(useSelectedFilters as jest.Mock).mockReturnValue({ selectedFilters: [] })

    render(<VaccinationDropdown />)

    expect(screen.getByText('6-in-1 (1 year)')).toBeInTheDocument()
    expect(screen.getByText('MMR1 (1 year)')).toBeInTheDocument()
  })

  it('filters vaccinations based on selected filters', () => {
    ;(useSelectedFilters as jest.Mock).mockReturnValue({
      selectedFilters: [{ label: 'MMR1 (1 year)' }],
    })

    render(<VaccinationDropdown />)

    expect(screen.queryByText('6-in-1 (1 year)')).not.toBeInTheDocument()
    expect(screen.getByText('MMR1 (1 year)')).toBeInTheDocument()
  })

  it('calls onChange and setSelectedVaccination when option is selected', () => {
    ;(useSelectedFilters as jest.Mock).mockReturnValue({ selectedFilters: [] })

    render(<VaccinationDropdown onChange={mockOnChange} />)

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } })

    expect(setSelectedVaccination).toHaveBeenCalledWith(mockVaccinationList[0])
    expect(mockOnChange).toHaveBeenCalledWith('1')
  })

  it('resets when empty option selected', () => {
    ;(useSelectedFilters as jest.Mock).mockReturnValue({ selectedFilters: [] })

    render(<VaccinationDropdown onChange={mockOnChange} />)

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '' } })

    expect(setSelectedVaccination).toHaveBeenCalledWith(null)
    expect(mockOnChange).toHaveBeenCalledWith(null)
  })
})
