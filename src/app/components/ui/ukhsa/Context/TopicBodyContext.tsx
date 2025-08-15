'use client'

import * as React from 'react'
import { useState } from 'react'

import { TimePeriod, Vaccination, VaccinationId } from '@/api/models/cms/Page/GlobalFilter'

export interface FilterOption {
  id: string
  label: string
}

export interface TopicBodyState {
  selectedFilters: FilterOption[]
  timePeriods: TimePeriod[]
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

  //Vaccination actions
  setVaccinations: (vaccinations: Vaccination[]) => void
  setSelectedVaccination: (vaccination: VaccinationId | null) => void
  clearVaccinations: () => void
}

const initialState: TopicBodyState = {
  selectedFilters: [],
  timePeriods: [],
  selectedTimePeriod: null,
  vaccinations: [],
  selectedVaccination: null,
}

export function useTopicBodyFilters(topicBodyState?: TopicBodyState) {
  const providedState = topicBodyState ? topicBodyState : initialState
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>(providedState.selectedFilters)
  const [timePeriods, setTimePeriodsState] = useState<TimePeriod[]>([])
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
