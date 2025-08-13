'use client'

import * as React from 'react'
import { useState } from 'react'

import {
  DataFilters,
  GeographyFilters,
  ThresholdFilters,
  TimePeriod,
  GeographyFilter,
} from '@/api/models/cms/Page/GlobalFilter'
import { GeographyResponse } from '@/api/requests/geographies/getGeographies'

export interface TopicBodyState {
  selectedFilters: string[]
  timePeriods: TimePeriod[]
  dataFilters: DataFilters
  geographyFilters: GeographyFilters
  thresholdFilters: ThresholdFilters
  selectedTimePeriod: TimePeriod | null
  geographyAreas: Map<string, GeographyResponse>
  geographyAreasLoading: boolean
  geographyAreasError: string | null
}

export interface TopicBodyActions {
  // Filter actions
  updateFilters: (newFilters: string[]) => void
  addFilter: (filter: string) => void
  removeFilter: (filterName: string) => void
  clearFilters: () => void

  // Time period actions
  setTimePeriods: (timePeriods: TimePeriod[]) => void
  setSelectedTimePeriod: (timePeriod: TimePeriod | null) => void
  clearTimePeriods: () => void

  setDataFilters: (dataFilters: DataFilters) => void
  setGeographyFilters: (geographyFilters: GeographyFilters) => void
  setThresholdFilters: (thresholdFilters: ThresholdFilters) => void
  setGeographyAreas: (geographyType: string, areas: GeographyResponse) => void
  setGeographyAreasLoading: (loading: boolean) => void
  setGeographyAreasError: (error: string | null) => void
  clearGeographyAreas: () => void
  getGeographyAreasByType: (geographyType: string) => GeographyResponse
}

const initialState: TopicBodyState = {
  selectedFilters: ['Leicester', 'London', '6-in-1'],
  timePeriods: [],
  dataFilters: {} as DataFilters,
  geographyFilters: {} as GeographyFilters,
  thresholdFilters: {} as ThresholdFilters,
  selectedTimePeriod: null,
  geographyAreas: new Map(),
  geographyAreasLoading: false,
  geographyAreasError: null,
}

export function useTopicBodyFilters(topicBodyState?: TopicBodyState) {
  const providedState = topicBodyState ? topicBodyState : initialState
  const [selectedFilters, setSelectedFilters] = useState<string[]>(providedState.selectedFilters)
  const [timePeriods, setTimePeriodsState] = useState<TimePeriod[]>([])
  const [geographyFilters, setGeographyFiltersState] = useState<GeographyFilters>({} as GeographyFilters)
  const [dataFilters, setDataFiltersState] = useState<DataFilters>({} as DataFilters)
  const [thresholdFilters, setThresholdFiltersState] = useState<ThresholdFilters>({} as ThresholdFilters)
  const [selectedTimePeriod, setSelectedTimePeriodState] = useState<TimePeriod | null>(null)

  const [geographyAreas, setGeographyAreasMap] = useState<Map<string, GeographyResponse>>(new Map())
  const [geographyAreasLoading, setGeographyAreasLoadingState] = useState<boolean>(false)
  const [geographyAreasError, setGeographyAreasErrorState] = useState<string | null>(null)

  const updateFilters = (newFilters: string[]) => {
    setSelectedFilters(newFilters)
  }

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  const removeFilter = (filterName: string) => {
    setSelectedFilters(selectedFilters.filter((filter) => filter !== filterName))
  }

  const clearFilters = () => {
    setSelectedFilters([])
  }

  const setTimePeriods = (newTimePeriods: TimePeriod[]) => {
    setTimePeriodsState(newTimePeriods)

    // Optionally auto-select the first time period or most recent one
    if (newTimePeriods.length > 0 && !selectedTimePeriod) {
      setSelectedTimePeriodState(newTimePeriods[0])
    }
  }

  const setGeographyFilters = (newGeographyFilters: GeographyFilters) => {
    setGeographyFiltersState(newGeographyFilters)
  }

  const setDataFilters = (newDataFilters: DataFilters) => {
    setDataFiltersState(newDataFilters)
  }

  const setThresholdFilters = (newThresholdFilters: ThresholdFilters) => {
    setThresholdFiltersState(newThresholdFilters)
  }

  const setSelectedTimePeriod = (timePeriod: TimePeriod | null) => {
    setSelectedTimePeriodState(timePeriod)
  }

  const clearTimePeriods = () => {
    setTimePeriodsState([])
    setSelectedTimePeriodState(null)
  }

  const setGeographyAreas = (geographyType: string, areas: GeographyResponse) => {
    setGeographyAreasMap((prevMap) => {
      const newMap = new Map(prevMap)
      newMap.set(geographyType, areas)
      return newMap
    })
  }

  const setGeographyAreasLoading = (loading: boolean) => {
    setGeographyAreasLoadingState(loading)
  }

  const setGeographyAreasError = (error: string | null) => {
    setGeographyAreasErrorState(error)
  }

  const clearGeographyAreas = () => {
    setGeographyAreasMap(new Map())
    setGeographyAreasErrorState(null)
  }

  const getGeographyAreasByType = (geographyType: string): GeographyResponse => {
    return geographyAreas.get(geographyType) || []
  }

  const state: TopicBodyState = {
    selectedFilters,
    timePeriods,
    dataFilters,
    geographyFilters,
    thresholdFilters,
    selectedTimePeriod,
    geographyAreas,
    geographyAreasLoading,
    geographyAreasError,
  }

  const actions: TopicBodyActions = {
    updateFilters,
    addFilter,
    removeFilter,
    clearFilters,
    setTimePeriods,
    setGeographyFilters,
    setDataFilters,
    setThresholdFilters,
    setSelectedTimePeriod,
    clearTimePeriods,
    setGeographyAreas,
    setGeographyAreasLoading,
    setGeographyAreasError,
    clearGeographyAreas,
    getGeographyAreasByType,
  }

  return [state, actions] as const
}

export const TopicBodyContext = React.createContext<ReturnType<typeof useTopicBodyFilters> | null>(null)

interface TopicBodyContextProviderProps {
  children: React.ReactNode
}

export const TopicBodyContextProvider = ({ children }: TopicBodyContextProviderProps) => {
  const topicBodyState = useTopicBodyFilters()

  return <TopicBodyContext.Provider value={topicBodyState}>{children}</TopicBodyContext.Provider>
}

// Custom hook for consuming the context
export const useTopicBody = () => {
  const context = React.useContext(TopicBodyContext)

  if (!context) {
    throw new Error('useTopicBody must be used within a TopicBodyContextProvider')
  }

  return context
}
