import React from 'react'

import { fireEvent, render, screen } from '@/config/test-utils'

import { TopicBodyContext } from '../Context/TopicBodyContext'
import { SelectedFilters } from './SelectedFilters'

const mockRemoveFilter = jest.fn()

const MockProvider = ({ children }: { children: React.ReactNode }) => (
  <TopicBodyContext.Provider
    value={[
      ['Test Filter'],
      { removeFilter: mockRemoveFilter, updateFilters: jest.fn(), addFilter: jest.fn(), clearFilters: jest.fn() },
    ]}
  >
    {children}
  </TopicBodyContext.Provider>
)

describe('SelectedFilters', () => {
  beforeEach(() => {
    mockRemoveFilter.mockClear()
    render(
      <MockProvider>
        <SelectedFilters />
      </MockProvider>
    )
  })

  it('renders the title', () => {
    expect(screen.getByRole('heading', { level: 2, name: 'Selected filters' })).toBeInTheDocument()
  })

  it('renders selected filters', () => {
    expect(screen.getByText('Test Filter')).toBeInTheDocument()
  })

  it('calls removeFilter when a filter is clicked', () => {
    fireEvent.click(screen.getByText('Test Filter'))
    expect(mockRemoveFilter).toHaveBeenCalledWith('Test Filter')
  })
})
