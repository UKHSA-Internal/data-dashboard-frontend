'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

import { DataFilters, GeographyFilters, ThresholdFilters, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'

interface InitialGlobalFilterState {
  timePeriods: TimePeriod[] | null
  geographyFilters: GeographyFilters | null
  thresholdFilters: ThresholdFilters | null
  dataFilters: DataFilters | null
}

export interface GlobalFilterProviderProps {
  children: ReactNode
  filters: InitialGlobalFilterState
}

interface GlobalFilterState extends InitialGlobalFilterState {
  selectedTimePeriod: TimePeriod | null
  selectedFilters: string[]
}

// Global Filter Action Interface
export interface GlobalFilterActions {
  setSelectedTimePeriod: (selectedTimePeriod: TimePeriod | null) => void
  updateFilters: (newFilters: string[]) => void
  addFilter: (filter: string) => void
  removeFilter: (filterName: string) => void
  clearFilters: () => void
}

//Interface for the global filter context
interface GlobalFilterContextValue {
  state: GlobalFilterState
  actions: GlobalFilterActions
}

//Creates the Global Filter Context
const GlobalFilterContext = createContext<GlobalFilterContextValue | null>(null)

//global filter Provider
export const GlobalFilterProvider = ({ children, filters }: GlobalFilterProviderProps) => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<TimePeriod | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['Leicester', 'London', '6-in-1'])

  const state: GlobalFilterState = {
    ...filters,
    selectedTimePeriod,
    selectedFilters,
  }
  const actions: GlobalFilterActions = {
    setSelectedTimePeriod: (timePeriod: TimePeriod | null) => {
      setSelectedTimePeriod(timePeriod)
    },
    //Filter selection actions
    updateFilters: (newFilters: string[]) => {
      setSelectedFilters(newFilters)
    },
    addFilter: (filter: string) => {
      if (!selectedFilters.includes(filter)) {
        setSelectedFilters([...selectedFilters, filter])
      }
    },
    removeFilter: (filterName: string) => {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== filterName))
    },
    clearFilters: () => {
      setSelectedFilters([])
    },
  }

  const contextValue: GlobalFilterContextValue = {
    state,
    actions,
  }

  return <GlobalFilterContext.Provider value={contextValue}>{children}</GlobalFilterContext.Provider>
}

export function useGlobalFilters(): GlobalFilterContextValue {
  const context = useContext(GlobalFilterContext)

  if (context === null) {
    throw new Error('useGlobalFilters must be used within a GlobalFilterProvider')
  }

  return context
}
