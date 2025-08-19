'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import {
  DataFilter,
  DataFilters,
  GeographyFilters,
  ThresholdFilters,
  TimePeriod,
} from '@/api/models/cms/Page/GlobalFilter'
import { MapDataResponse } from '@/api/models/Maps'
import { postMapData } from '@/api/requests/cover-maps/postMaps'
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
  selectedVaccination: DataFilter | null
  mapData: MapDataResponse | null
  mapDataLoading: boolean
  mapDataError: string | null
}

// Global Filter Action Interface
export interface GlobalFilterActions {
  setSelectedTimePeriod: (selectedTimePeriod: TimePeriod | null) => void
  updateFilters: (newFilters: FilterOption[]) => void
  addFilter: (filter: FilterOption) => void
  removeFilter: (filterId: string) => void
  clearFilters: () => void
  setSelectedVaccination: (selectedVaccination: DataFilter | null) => void
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
  const [selectedVaccination, setSelectedVaccination] = useState<DataFilter | null>(null)
  const [mapData, setMapData] = useState<MapDataResponse | null>(null)
  const [mapDataLoading, setMapDataLoading] = useState<boolean>(false)
  const [mapDataError, setMapDataError] = useState<string | null>(null)

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

  const fetchMapData = async () => {
    const request = {
      date_from: '2023-10-30',
      date_to: '2023-10-31',
      parameters: {
        theme: 'infectious_disease',
        sub_theme: 'respiratory',
        topic: 'COVID-19',
        metric: 'COVID-19_deaths_ONSByWeek',
        stratum: 'default',
        age: 'all',
        sex: 'all',
        geography_type: 'Lower Tier Local Authority',
        geographies: [],
      },
      accompanying_points: [
        {
          label_prefix: 'Rate of cases in England: ',
          label_suffix: '',
          parameters: {
            metric: 'COVID-19_cases_rateRollingMean',
            geography_type: 'Nation',
            geography: 'England',
          },
        },
      ],
    }
    console.log('Fetching Map Data')

    try {
      setMapDataLoading(true)
      const response = await postMapData(request)

      console.log('Map Data Response', response.data)

      setMapData(response.data ?? null)
    } catch (error) {
      console.log('Map Data Error: ', error)
      setMapDataError('Error fetching geography data: ' + error || 'Unknown error')
    } finally {
      setMapDataLoading(false)
    }
  }

  /* Usage: When the geographyFilters are updated this will trigger this use effect 
  to load the most recent list of geography areas for each of the geography filters */
  useEffect(() => {
    if (!filters.geographyFilters) return
    fetchGeographyData()
  }, [filters.geographyFilters])

  useEffect(() => {
    if (!selectedVaccination || !selectedTimePeriod) return
    fetchMapData()
  }, [selectedVaccination, selectedTimePeriod])

  const state: GlobalFilterState = {
    ...filters,
    selectedTimePeriod,
    selectedFilters,
    geographyAreas,
    geographyAreasLoading,
    geographyAreasError,
    selectedVaccination,
    mapData,
    mapDataLoading,
    mapDataError,
  }
  const actions: GlobalFilterActions = {
    //Time Period Actions
    setSelectedTimePeriod: (timePeriod: TimePeriod | null) => {
      setSelectedTimePeriod(timePeriod)
    },

    //Time Period Actions
    setSelectedVaccination: (vaccination: DataFilter | null) => {
      setSelectedVaccination(vaccination)
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
