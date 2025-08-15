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
  it('should not show banner when no filters are selected', () => {
    render(
      <MockContextProvider selectedFilters={[]}>
        <FilterBanners />
      </MockContextProvider>
    )

    expect(screen.queryByText(/Important information/)).not.toBeInTheDocument()
  })

  it('should not show banner when all filter groups have 3 or fewer selections', () => {
    const selectedFilters = [
      { id: 'Country.England', label: 'England' },
      { id: 'Country.Scotland', label: 'Scotland' },
      { id: 'Country.Wales', label: 'Wales' },
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

  it('should show banner when one filter group has exactly 4 selections', () => {
    const selectedFilters = [
      { id: 'Country.England', label: 'England' },
      { id: 'Country.Scotland', label: 'Scotland' },
      { id: 'Country.Wales', label: 'Wales' },
      { id: 'Country.NorthernIreland', label: 'Northern Ireland' },
    ]

    render(
      <MockContextProvider selectedFilters={selectedFilters}>
        <FilterBanners />
      </MockContextProvider>
    )

    expect(screen.getByText(/Important information/)).toBeInTheDocument()
    expect(screen.getByText(/You can only select/)).toBeInTheDocument()
    expect(screen.getByText(/four locations/)).toBeInTheDocument()
    expect(screen.getByText(/display at a time/)).toBeInTheDocument()
  })

  it('should show banner when one filter group has more than 4 selections', () => {
    const selectedFilters = [
      { id: 'Country.England', label: 'England' },
      { id: 'Country.Scotland', label: 'Scotland' },
      { id: 'Country.Wales', label: 'Wales' },
      { id: 'Country.NorthernIreland', label: 'Northern Ireland' },
      { id: 'Country.Ireland', label: 'Ireland' },
    ]

    render(
      <MockContextProvider selectedFilters={selectedFilters}>
        <FilterBanners />
      </MockContextProvider>
    )

    expect(screen.getByText(/Important information/)).toBeInTheDocument()
  })

  it('should show banner when any filter group exceeds 3 items, regardless of filter type', () => {
    const selectedFilters = [
      { id: 'vaccine.6-in-1', label: '6-in-1' },
      { id: 'vaccine.MMR', label: 'MMR' },
      { id: 'vaccine.DTaP', label: 'DTaP' },
      { id: 'vaccine.HepatitisB', label: 'Hepatitis B' },
    ]

    render(
      <MockContextProvider selectedFilters={selectedFilters}>
        <FilterBanners />
      </MockContextProvider>
    )

    expect(screen.getByText(/Important information/)).toBeInTheDocument()
  })

  it('should not show banner when multiple filter groups each have 3 or fewer items', () => {
    const selectedFilters = [
      { id: 'Country.England', label: 'England' },
      { id: 'Country.Scotland', label: 'Scotland' },
      { id: 'vaccine.6-in-1', label: '6-in-1' },
      { id: 'vaccine.MMR', label: 'MMR' },
      { id: 'vaccine.DTaP', label: 'DTaP' },
    ]

    render(
      <MockContextProvider selectedFilters={selectedFilters}>
        <FilterBanners />
      </MockContextProvider>
    )

    expect(screen.queryByText(/Important information/)).not.toBeInTheDocument()
  })
})
