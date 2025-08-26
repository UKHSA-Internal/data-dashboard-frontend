'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import {
  DataFilter,
  DataFilters,
  FilterLinkedSubplotData,
  FilterLinkedTimeSeriesData,
  GeographyFilters,
  ThresholdFilter,
  ThresholdFilters,
  TimePeriod,
} from '@/api/models/cms/Page/GlobalFilter'
import { MapDataResponse } from '@/api/models/Maps'
import { postMapData } from '@/api/requests/cover-maps/postMaps'
import { GeographiesSchema, GeographyObject, getGeographies } from '@/api/requests/geographies/getGeographies'
import { extractGeographyIdFromGeographyFilter, getAccompanyingPoints } from '@/app/utils/global-filter-content-parser'

import {
  addFilterToSelectedGeographyFilters,
  addFilterToSelectedThresholdFilters,
  addFilterToSelectedVaccinationFilters,
  getFilterType,
} from '../utils/selected-filter.utils'

interface InitialGlobalFilterState {
  timePeriods: TimePeriod[] | null
  geographyFilters: GeographyFilters | null
  thresholdFilters: ThresholdFilters | null
  dataFilters: DataFilters | null
  coverageTemplateData: FilterLinkedSubplotData | null
  timeseriesTemplateData: FilterLinkedTimeSeriesData | null
  timePeriodTitle: string | null
}

export type FilterType = 'geography' | 'data_filter' | 'threshold'

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
  selectedGeographyFilters: GeographiesSchema | null
  selectedVaccinationFilters: DataFilter[] | null
  selectedThresholdFilters: ThresholdFilter[] | null
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
  addFilterFromMap: (filter: FilterOption, mapSelectedId?: string) => void
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
  const [selectedGeographyFilters, setSelectedGeographyFilters] = useState<GeographiesSchema>([])
  const [selectedVaccinationFilters, setSelectedVaccinationFilters] = useState<DataFilter[]>([])
  const [selectedThresholdFilters, setSelectedThresholdFilters] = useState<ThresholdFilter[]>([])

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
          const enhancedGeographies = geographyArea.geographies.map((geography) => ({
            ...geography,
            geography_type: geographyArea.geography_type,
          }))

          newGeographyAreas.set(geographyArea.geography_type, enhancedGeographies)
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
    if (!selectedTimePeriod || !selectedVaccination) return
    const accompanyingPoints = getAccompanyingPoints(selectedVaccination.value.accompanying_points)
    const request = {
      date_from: selectedTimePeriod.value.date_from,
      date_to: selectedTimePeriod.value.date_to,
      parameters: {
        theme: selectedVaccination.value.parameters.theme.value,
        sub_theme: selectedVaccination.value.parameters.sub_theme.value,
        topic: selectedVaccination.value.parameters.topic.value,
        metric: selectedVaccination.value.parameters.metric.value,
        stratum: selectedVaccination.value.parameters.stratum.value,
        age: selectedVaccination.value.parameters.age.value,
        sex: selectedVaccination.value.parameters.sex.value,
        geography_type: 'Upper Tier Local Authority',
        geographies: [],
      },
      accompanying_points: accompanyingPoints,
    }

    try {
      setMapDataLoading(true)
      const response = await postMapData(request)

      setMapData(response.data ?? null)
    } catch (error) {
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
    selectedGeographyFilters,
    selectedThresholdFilters,
    selectedVaccinationFilters,
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
      newFilters.map((filter) => {
        const filterType = getFilterType(filter.id)
        if (filterType == 'data_filter') {
          const dataFilterId = filter.id.split('.')[1]
          const newVaccinationFilter = filters.dataFilters!.data_filters.find(
            (data_filter) => data_filter.id === dataFilterId
          )

          if (!newVaccinationFilter) {
            return
          }

          setSelectedVaccinationFilters((prevFilters) =>
            addFilterToSelectedVaccinationFilters(prevFilters, newVaccinationFilter)
          )
        }
      })
      setSelectedFilters(newFilters)
    },
    addFilter: (filter: FilterOption) => {
      if (!selectedFilters.some((existingFilter) => existingFilter.id === filter.id)) {
        setSelectedFilters([...selectedFilters, filter])

        const filterType = getFilterType(filter.id)
        switch (filterType) {
          case 'geography':
            const [, geographyGroup, geographyId] = filter.id.split('.')

            const newGeographyFilter = geographyAreas
              .get(geographyGroup)
              ?.find((geography) => geography.geography_code === geographyId)

            if (!newGeographyFilter) {
              break
            }

            setSelectedGeographyFilters((prevFilters) =>
              addFilterToSelectedGeographyFilters(prevFilters, newGeographyFilter)
            )
            break
          case 'data_filter':
            const dataFilterId = filter.id.split('.')[1]
            const newVaccinationFilter = filters.dataFilters!.data_filters.find(
              (data_filter) => data_filter.id === dataFilterId
            )

            if (!newVaccinationFilter) {
              break
            }
            setSelectedVaccinationFilters((prevFilters) =>
              addFilterToSelectedVaccinationFilters(prevFilters, newVaccinationFilter)
            )
            break

          case 'threshold':
            const thresholdFilterId = filter.id.split('.')[1]
            const newThresholdFilter = filters.thresholdFilters!.thresholds.find(
              (threshold) => threshold.id === thresholdFilterId
            )

            if (!newThresholdFilter) {
              break
            }
            setSelectedThresholdFilters((prevFilters) =>
              addFilterToSelectedThresholdFilters(prevFilters, newThresholdFilter)
            )
            break
        }
      }
    },
    addFilterFromMap: (filter: FilterOption, mapSelectedId?: string) => {
      const [geographyType, geographyGroup, geographyId] = filter.id.split('.')
      const previouslySelectedId = `${geographyType}.${geographyGroup}.${mapSelectedId}`

      // Update selectedFilters: remove existing filter if mapSelectedId exists, then add new filter
      setSelectedFilters((prevFilters) => {
        let updatedFilters = prevFilters

        // Remove the filter if mapSelectedId exists
        if (mapSelectedId) {
          updatedFilters = prevFilters.filter((storedFilter) => storedFilter.id !== previouslySelectedId)
        }

        // Add the new filter (create new array to avoid mutation)
        return [...updatedFilters, filter]
      })

      // Update selectedGeographyFilters: remove existing if mapSelectedId exists
      if (mapSelectedId) {
        setSelectedGeographyFilters((prevFilters) =>
          prevFilters.filter((geoFilter) => geoFilter.geography_code !== mapSelectedId)
        )
      }

      // Find the corresponding geography in state
      const newGeographyFilter = geographyAreas
        .get(geographyGroup)
        ?.find((geography) => geography.geography_code === geographyId)

      if (!newGeographyFilter) {
        return
      }

      // Add new geography to state
      setSelectedGeographyFilters((prevFilters) => addFilterToSelectedGeographyFilters(prevFilters, newGeographyFilter))
    },
    removeFilter: (filterId: string) => {
      setSelectedFilters(selectedFilters.filter((filter) => filter.id !== filterId))
      const filterType = getFilterType(filterId)
      switch (filterType) {
        case 'geography':
          const geographyFilterData = filterId.split('.')
          const geographyId = geographyFilterData[2]
          setSelectedGeographyFilters((prevFilters) =>
            prevFilters.filter((filter) => filter.geography_code !== geographyId)
          )
          break

        case 'data_filter':
          const dataFilterId = filterId.split('.')[1]
          setSelectedVaccinationFilters((prevFilters) => prevFilters.filter((filter) => filter.id !== dataFilterId))
          break

        case 'threshold':
          const thresholdFilterId = filterId.split('.')[1]
          setSelectedThresholdFilters((prevFilters) => prevFilters.filter((filter) => filter.id !== thresholdFilterId))
          break
      }
    },
    clearFilters: () => {
      setSelectedFilters([])
      setSelectedGeographyFilters([])
      setSelectedThresholdFilters([])
      setSelectedVaccinationFilters([])
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
