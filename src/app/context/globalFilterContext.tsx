'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { DataFilters, GeographyFilters, ThresholdFilters, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { GeographiesSchema, GeographyObject, getGeographies } from '@/api/requests/geographies/getGeographies'
import { extractGeographyIdFromGeographyFilter } from '@/app/utils/global-filter-content-parser'

interface InitialGlobalFilterState {
  timePeriods: TimePeriod[] | null
  geographyFilters: GeographyFilters | null
  thresholdFilters: ThresholdFilters | null
  dataFilters: DataFilters | null
}

export interface FilterOption {
  id: string
  label: string
}

export interface GlobalFilterProviderProps {
  children: ReactNode
  filters: InitialGlobalFilterState
}

export interface GlobalFilterState extends InitialGlobalFilterState {
  selectedTimePeriod: TimePeriod | null
  selectedFilters: FilterOption[]
  geographyAreas: Map<string, GeographiesSchema>
  geographyAreasLoading: boolean
  geographyAreasError: string | null
}

// Global Filter Action Interface
export interface GlobalFilterActions {
  setSelectedTimePeriod: (selectedTimePeriod: TimePeriod | null) => void
  updateFilters: (newFilters: FilterOption[]) => void
  addFilter: (filter: FilterOption) => void
  removeFilter: (filterId: string) => void
  clearFilters: () => void
}

//Interface for the global filter context
export interface GlobalFilterContextValue {
  state: GlobalFilterState
  actions: GlobalFilterActions
}

//Creates the Global Filter Context
export const GlobalFilterContext = createContext<GlobalFilterContextValue | null>(null)

//global filter Provider
export const GlobalFilterProvider = ({ children, filters }: GlobalFilterProviderProps) => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<TimePeriod | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([])
  const [geographyAreas, setGeographyAreas] = useState<Map<string, GeographiesSchema>>(new Map())
  const [geographyAreasLoading, setGeographyAreasLoading] = useState<boolean>(false)
  const [geographyAreasError, setGeographyAreasError] = useState<string | null>(null)

  const fetchGeographyData = async () => {
    try {
      const geographyTypes = extractGeographyIdFromGeographyFilter(filters.geographyFilters)
      setGeographyAreasLoading(true)
      const responses = await Promise.all(
        geographyTypes.map((geographyTypes) =>
          getGeographies({
            geography_type: geographyTypes,
          })
        )
      )
      const newGeographyAreas = new Map(geographyAreas)

      responses.forEach((response) => {
        const geographyAreaData = response.data

        if (!geographyAreaData) {
          throw new Error('No data returned from API')
        }

        geographyAreaData.forEach((geographyArea: GeographyObject) => {
          newGeographyAreas.set(geographyArea.geography_type, geographyArea.geographies)
        })
      })
      setGeographyAreas(newGeographyAreas)
    } catch (error) {
      setGeographyAreasError('Error fetching geography data: ' + error || 'Unknown error')
    } finally {
      setGeographyAreasLoading(false)
    }
  }

  /* Usage: When the geographyFilters are updated this will trigger this use effect 
  to load the most recent list of geography areas for each of the geography filters */
  useEffect(() => {
    if (!filters.geographyFilters) return
    fetchGeographyData()
  }, [filters.geographyFilters])

  const state: GlobalFilterState = {
    ...filters,
    selectedTimePeriod,
    selectedFilters,
    geographyAreas,
    geographyAreasLoading,
    geographyAreasError,
  }
  const actions: GlobalFilterActions = {
    //Time Period Actions
    setSelectedTimePeriod: (timePeriod: TimePeriod | null) => {
      setSelectedTimePeriod(timePeriod)
    },

    //Filter selection actions
    updateFilters: (newFilters: FilterOption[]) => {
      setSelectedFilters(newFilters)
    },
    addFilter: (filter: FilterOption) => {
      if (!selectedFilters.some((existingFilter) => existingFilter.id === filter.id)) {
        setSelectedFilters([...selectedFilters, filter])
      }
    },
    removeFilter: (filterId: string) => {
      setSelectedFilters(selectedFilters.filter((filter) => filter.id !== filterId))
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
