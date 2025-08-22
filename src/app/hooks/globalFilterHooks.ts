import {
  DataFilter,
  DataFilters,
  GeographyFilters,
  ThresholdFilter,
  ThresholdFilters,
  TimePeriod,
} from '@/api/models/cms/Page/GlobalFilter'
import { MapDataResponse } from '@/api/models/Maps'
import { GeographiesSchema } from '@/api/requests/geographies/getGeographies'
import { FilterOption, useGlobalFilters } from '@/app/context/globalFilterContext'

export function useTimePeriods(): TimePeriod[] | null {
  const { state } = useGlobalFilters()
  return state.timePeriods
}

export function useGeographyFilters(): GeographyFilters | null {
  const { state } = useGlobalFilters()
  return state.geographyFilters
}

export function useThresholdFilters(): ThresholdFilters | null {
  const { state } = useGlobalFilters()
  return state.thresholdFilters
}

export function useDataFilters(): DataFilters | null {
  const { state } = useGlobalFilters()
  return state.dataFilters
}

export function useSelectedFilters(): {
  selectedFilters: FilterOption[] | null
  selectedVaccinationFilters: DataFilter[] | null
  selectedGeographyFilters: GeographiesSchema | null
  selectedThresholdFilters: ThresholdFilter[] | null
  selectedMapFilters: GeographiesSchemaObject | null
  updateFilters: (newFilters: FilterOption[]) => void
  addFilter: (filter: FilterOption) => void
  removeFilter: (filterId: string) => void
  clearFilters: () => void
  addFilterFromMap: (filter: FilterOption, mapSelectedId?: string) => void
} {
  const { state, actions } = useGlobalFilters()

  return {
    selectedFilters: state.selectedFilters,
    selectedVaccinationFilters: state.selectedVaccinationFilters,
    selectedGeographyFilters: state.selectedGeographyFilters,
    selectedThresholdFilters: state.selectedThresholdFilters,
    selectedMapFilters: state.selectedMapFilters,
    updateFilters: actions.updateFilters,
    addFilter: actions.addFilter,
    removeFilter: actions.removeFilter,
    clearFilters: actions.clearFilters,
    addFilterFromMap: actions.addFilterFromMap,
  }
}

export function useGeographyState(): {
  geographyAreas: Map<string, GeographiesSchema>
  geographyAreasLoading: boolean
  geographyAreasError: string | null
} {
  const { state } = useGlobalFilters()

  return {
    geographyAreas: state.geographyAreas,
    geographyAreasLoading: state.geographyAreasLoading,
    geographyAreasError: state.geographyAreasError,
  }
}

export function useVaccinationState(): {
  vaccinationList: DataFilter[] | null
  selectedVaccination: DataFilter | null
  setSelectedVaccination: (vaccination: DataFilter | null) => void
} {
  const { state, actions } = useGlobalFilters()

  const vaccinationList: DataFilter[] | null = state.dataFilters?.data_filters ?? null

  return {
    vaccinationList,
    selectedVaccination: state.selectedVaccination,
    setSelectedVaccination: actions.setSelectedVaccination,
  }
}

export function useMapData(): {
  mapData: MapDataResponse | null
  mapDataLoading: boolean
  mapDataError: string | null
} {
  const { state } = useGlobalFilters()

  return {
    mapData: state.mapData,
    mapDataLoading: state.mapDataLoading,
    mapDataError: state.mapDataError,
  }
}
