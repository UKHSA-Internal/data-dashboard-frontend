import React from 'react'

import { render, screen } from '@/config/test-utils'

import { TopicBodyActions, TopicBodyContext, TopicBodyState } from '../Context/TopicBodyContext'
import { FilterBanners } from './FilterBanners'

const MockContextProvider = ({
  children,
  selectedFilters = [],
}: {
  children: React.ReactNode
  selectedFilters?: Array<{ id: string; label: string }>
}) => {
  const mockActions: TopicBodyActions = {
    updateFilters: jest.fn(),
    addFilter: jest.fn(),
    removeFilter: jest.fn(),
    clearFilters: jest.fn(),
    setTimePeriods: jest.fn(),
    setSelectedTimePeriod: jest.fn(),
    clearTimePeriods: jest.fn(),
  }

  const state: TopicBodyState = {
    selectedFilters,
    timePeriods: [],
    selectedTimePeriod: null,
  }

  const contextValue = [state, mockActions] as const

  return <TopicBodyContext.Provider value={contextValue}>{children}</TopicBodyContext.Provider>
}

describe('FilterBanners', () => {
  it('should not show banner when all location filter types have 4 or fewer selections', () => {
    const selectedFilters = [
      { id: 'Country.England', label: 'England' },
      { id: 'Country.Scotland', label: 'Scotland' },
      { id: 'Region.London', label: 'London' },
      { id: 'Region.Manchester', label: 'Manchester' },
      { id: 'Local Authority.Westminster', label: 'Westminster' },
    ]

    render(
      <MockContextProvider selectedFilters={selectedFilters}>
        <FilterBanners />
      </MockContextProvider>
    )

    expect(screen.queryByText(/Important information/)).not.toBeInTheDocument()
  })

  it('should show banner when one filter has 4 selections', () => {
    const selectedFilters = [
      { id: 'Country.England', label: 'England' },
      { id: 'Country.Scotland', label: 'Scotland' },
      { id: 'Country.Wales', label: 'Wales' },
      { id: 'Country.NorthernIreland', label: 'Northern Ireland' },
      { id: 'Country.IsleOfMan', label: 'Isle of Man' },
    ]

    render(
      <MockContextProvider selectedFilters={selectedFilters}>
        <FilterBanners />
      </MockContextProvider>
    )

    expect(screen.getByText(/Important information/)).toBeInTheDocument()
    expect(
      screen.getByText((content, element) => {
        return element?.textContent?.includes('You can only select four locations to display at a time') ?? false
      })
    ).toBeInTheDocument()
  })

  it('should show banner when multiple location types exceed their limits', () => {
    const selectedFilters = [
      { id: 'Country.England', label: 'England' },
      { id: 'Country.Scotland', label: 'Scotland' },
      { id: 'Country.Wales', label: 'Wales' },
      { id: 'Country.NorthernIreland', label: 'Northern Ireland' },
      { id: 'Country.IsleOfMan', label: 'Isle of Man' },
      { id: 'Region.London', label: 'London' },
      { id: 'Region.Manchester', label: 'Manchester' },
      { id: 'Region.Birmingham', label: 'Birmingham' },
      { id: 'Region.Leeds', label: 'Leeds' },
      { id: 'Region.Liverpool', label: 'Liverpool' },
    ]

    render(
      <MockContextProvider selectedFilters={selectedFilters}>
        <FilterBanners />
      </MockContextProvider>
    )

    expect(screen.getByText(/Important information/)).toBeInTheDocument()
    expect(
      screen.getByText((content, element) => {
        return element?.textContent?.includes('You can only select four locations to display at a time') ?? false
      })
    ).toBeInTheDocument()
  })
})
