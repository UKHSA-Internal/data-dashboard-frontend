'use client'

import { createContext, type ReactNode, useContext, useRef } from 'react'
import { type StoreApi, useStore } from 'zustand'

import { createMapStore, type MapStore } from '@/app/stores/MapStore'

export const MapStoreContext = createContext<StoreApi<MapStore> | null>(null)

export interface MapStoreProviderProps {
  children: ReactNode
}

export const MapStoreProvider = ({ children }: MapStoreProviderProps) => {
  const storeRef = useRef<StoreApi<MapStore>>()
  if (!storeRef.current) {
    storeRef.current = createMapStore()
  }

  return <MapStoreContext.Provider value={storeRef.current}>{children}</MapStoreContext.Provider>
}

export const useMapStore = <T,>(selector: (store: MapStore) => T): T => {
  const mapStoreContext = useContext(MapStoreContext)

  if (!mapStoreContext) {
    throw new Error(`useMapStore must be use within MapStoreProvider`)
  }

  return useStore(mapStoreContext, selector)
}
