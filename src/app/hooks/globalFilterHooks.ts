import { DataFilters, GeographyFilters, ThresholdFilters, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { useGlobalFilters } from '@/app/context/globalFilterContext'

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
  console.log(state)
  return state.thresholdFilters
}

export function useDataFilters(): DataFilters | null {
  const { state } = useGlobalFilters()
  return state.dataFilters
}

export function useSelectedFilters(): {
  selectedFilters: string[] | null
  updateFilters: (newFilters: string[]) => void
  addFilter: (filter: string) => void
  removeFilter: (filterName: string) => void
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
