'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

import { Feature } from '../components/ui/ukhsa/Map/geojson/ukhsa-regions'

export type MapState = {
  selectedMapFeature: Feature | null
}

export type MapActions = {
  setSelectedMapFeature: (feature: Feature | null) => void
}

export type MapContextType = MapState & MapActions

export const MapContext = createContext<MapContextType | null>(null)

interface ContextProviderProps {
  children: ReactNode
}

export const MapContextProvider = ({ children }: ContextProviderProps) => {
  const [selectedMapFeature, setSelectedMapFeature] = useState<MapState['selectedMapFeature'] | null>(null)

  return <MapContext.Provider value={{ selectedMapFeature, setSelectedMapFeature }}>{children}</MapContext.Provider>
}

export const useMapContext = () => {
  const mapContext = useContext(MapContext)

  if (!mapContext) {
    throw new Error('useMapContext has to be used within <MapContext.Provider>')
  }

  return mapContext
}
