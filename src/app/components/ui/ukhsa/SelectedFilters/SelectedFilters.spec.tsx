import React from 'react'

import { fireEvent, render, screen } from '@/config/test-utils'

import { TopicBodyContext } from '../Context/TopicBodyContext'
import { SelectedFilters } from './SelectedFilters'

const mockRemoveFilter = jest.fn()
const mockClearFilters = jest.fn()

const MockProvider = ({ children }: { children: React.ReactNode }) => (
  <TopicBodyContext.Provider
    value={[
      ['Test Filter'],
      {
        removeFilter: mockRemoveFilter,
        updateFilters: jest.fn(),
        addFilter: jest.fn(),
        clearFilters: mockClearFilters,
      },
    ]}
  >
    {children}
  </TopicBodyContext.Provider>
)

describe('SelectedFilters', () => {
  beforeEach(() => {
    mockRemoveFilter.mockClear()
    mockClearFilters.mockClear()
    render(
      <MockProvider>
        <SelectedFilters />
      </MockProvider>
    )
  })

  it('renders the title', () => {
    expect(screen.getByRole('heading', { level: 2, name: 'Selected filters (1)' })).toBeInTheDocument()
  })

  it('renders selected filters', () => {
    expect(screen.getByText('Test Filter')).toBeInTheDocument()
  })

  it('calls removeFilter when a filter is clicked', () => {
    fireEvent.click(screen.getByText('Test Filter'))
    expect(mockRemoveFilter).toHaveBeenCalledWith('Test Filter')
  })

  it('renders the clear filter selection button', () => {
    expect(screen.getByRole('button', { name: /clear filter selection/i })).toBeInTheDocument()
  })

  it('calls clearFilters when the clear filter selection button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /clear filter selection/i }))
    expect(mockClearFilters).toHaveBeenCalled()
  })
})
