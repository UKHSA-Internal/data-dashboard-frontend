'use client'

import * as React from 'react'
import { useState } from 'react'
import dataMockJson from 'src/app/components/ui/ukhsa/VaccinationDropdown/data.json'

import { TimePeriod, Vaccination } from '@/api/models/cms/Page/GlobalFilter'

dataMockJson as Vaccination[]

export interface TopicBodyState {
  selectedFilters: string[]
  timePeriods: TimePeriod[]
  selectedTimePeriod: TimePeriod | null
  vaccinations: Vaccination[]
  selectedVaccination: string | null
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

  //Vaccination actions
  setVaccinations: (vaccinations: Vaccination[]) => void
  setSelectedVaccination: (vaccination: Vaccination['id'] | null) => void
  clearVaccinations: () => void
}

const initialState: TopicBodyState = {
  selectedFilters: ['Leicester', 'London', '6-in-1'],
  timePeriods: [],
  selectedTimePeriod: null,
  vaccinations: [],
  selectedVaccination: null,
}

export function useTopicBodyFilters(topicBodyState?: TopicBodyState) {
  const providedState = topicBodyState ? topicBodyState : initialState
  const [selectedFilters, setSelectedFilters] = useState<string[]>(providedState.selectedFilters)
  const [timePeriods, setTimePeriodsState] = useState<TimePeriod[]>([])
  const [selectedTimePeriod, setSelectedTimePeriodState] = useState<TimePeriod | null>(null)
  const [vaccinations, setVaccinationsState] = useState<Vaccination[]>([])
  const [selectedVaccination, setSelectedVaccinationState] = useState<Vaccination['id'] | null>(null)

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
