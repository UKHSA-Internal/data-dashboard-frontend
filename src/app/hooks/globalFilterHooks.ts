import { DataFilters, GeographyFilters, ThresholdFilters, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
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
  updateFilters: (newFilters: FilterOption[]) => void
  addFilter: (filter: FilterOption) => void
  removeFilter: (filterId: string) => void
  clearFilters: () => void
} {
  const { state, actions } = useGlobalFilters()

  return {
    selectedFilters: state.selectedFilters,
    updateFilters: actions.updateFilters,
    addFilter: actions.addFilter,
    removeFilter: actions.removeFilter,
    clearFilters: actions.clearFilters,
  }
}
