import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { Feature } from '../geojson/ukhsa-regions'

interface WeatherHealthAlertsState {
  selectedMapFeature: Feature | null
  setSelectedMapFeature: (feature: Feature) => void
  // bears: number
  // increase: (by: number) => void
}

export const useWeatherHealthAlertsStore = create<WeatherHealthAlertsState>()(
  devtools(
    (set) => ({
      selectedMapFeature: null,
      setSelectedMapFeature: (feature) => set(() => ({ selectedMapFeature: feature })),
    }),
    {
      name: 'bear-storage',
    }
  )
)
