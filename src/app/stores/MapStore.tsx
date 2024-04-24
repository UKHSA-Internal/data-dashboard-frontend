import { createStore } from 'zustand/vanilla'

import { Feature } from '../components/ui/ukhsa/Map/geojson/ukhsa-regions'

export type MapState = {
  selectedMapFeature: Feature | null
}

export type MapActions = {
  setSelectedMapFeature: (feature: Feature) => void
}

export type MapStore = MapState & MapActions

export const defaultInitState: MapState = {
  selectedMapFeature: null,
}

export const createMapStore = (initState: MapState = defaultInitState) => {
  return createStore<MapStore>()((set) => ({
    ...initState,
    setSelectedMapFeature: (feature) => set(() => ({ selectedMapFeature: feature })),
  }))
}
