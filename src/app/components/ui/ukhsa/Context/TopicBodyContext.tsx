'use client'

import * as React from 'react'
import { useState } from 'react'

import { DataFilters, GeographyFilters, ThresholdFilters, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'

export interface TopicBodyState {
  selectedFilters: FilterOption[]
  timePeriods: TimePeriod[]
  dataFilters: DataFilters
  geographyFilters: GeographyFilters
  thresholdFilters: ThresholdFilters
  selectedTimePeriod: TimePeriod | null
  vaccinations: Vaccination[]
  selectedVaccination: string | null
}

export interface TopicBodyActions {
  // Filter actions
  updateFilters: (newFilters: FilterOption[]) => void
  addFilter: (filter: FilterOption) => void
  removeFilter: (filterId: string) => void
  clearFilters: () => void

  // Time period actions
  setTimePeriods: (timePeriods: TimePeriod[]) => void
  setSelectedTimePeriod: (timePeriod: TimePeriod | null) => void
  clearTimePeriods: () => void

  setDataFilters: (dataFilters: DataFilters) => void
  setGeographyFilters: (geographyFilters: GeographyFilters) => void
  setThresholdFilters: (thresholdFilters: ThresholdFilters) => void
}

const initialState: TopicBodyState = {
  selectedFilters: [],
  timePeriods: [],
  dataFilters: {} as DataFilters,
  geographyFilters: {} as GeographyFilters,
  thresholdFilters: {} as ThresholdFilters,
  selectedTimePeriod: null,
  vaccinations: [],
  selectedVaccination: null,
}

export function useTopicBodyFilters(topicBodyState?: TopicBodyState) {
  const providedState = topicBodyState ? topicBodyState : initialState
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>(providedState.selectedFilters)
  const [timePeriods, setTimePeriodsState] = useState<TimePeriod[]>([])
  const [geographyFilters, setGeographyFiltersState] = useState<GeographyFilters>({} as GeographyFilters)
  const [dataFilters, setDataFiltersState] = useState<DataFilters>({} as DataFilters)
  const [thresholdFilters, setThresholdFiltersState] = useState<ThresholdFilters>({} as ThresholdFilters)
  const [selectedTimePeriod, setSelectedTimePeriodState] = useState<TimePeriod | null>(null)
  const [vaccinations, setVaccinationsState] = useState<Vaccination[]>([])
  const [selectedVaccination, setSelectedVaccinationState] = useState<VaccinationId | null>(null)

  const updateFilters = (newFilters: FilterOption[]) => {
    setSelectedFilters(newFilters)
  }

  const addFilter = (filter: FilterOption) => {
    if (!selectedFilters.some((existingFilter) => existingFilter.id === filter.id)) {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  const removeFilter = (filterId: string) => {
    setSelectedFilters(selectedFilters.filter((filter) => filter.id !== filterId))
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

  const setVaccinations = (newVaccinations: Vaccination[]) => {
    setVaccinationsState(newVaccinations)

    if (newVaccinations.length > 0 && !selectedVaccination) {
      setSelectedVaccinationState(newVaccinations[0].id)
    }
  }

  const setSelectedVaccination = (vaccinationId: Vaccination['id'] | null) => {
    setSelectedVaccinationState(vaccinationId)
  }

  const clearVaccinations = () => {
    setVaccinationsState([])
    setSelectedVaccinationState(null)
  }
  const state: TopicBodyState = {
    selectedFilters,
    timePeriods,
    dataFilters,
    geographyFilters,
    thresholdFilters,
    selectedTimePeriod,
    vaccinations,
    selectedVaccination: null,
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
    setVaccinations,
    setSelectedVaccination,
    clearVaccinations,
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
