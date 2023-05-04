import { createContext, useContext } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'
import { extractAndFetchPageData } from '@/api/requests/cms/extractAndFetchPageData'

type PageData = Awaited<ReturnType<typeof extractAndFetchPageData>>

export interface StoreState {
  trends: PageData['trends']
  headlines: PageData['headlines']
  charts: PageData['charts']
}

const getDefaultInitialState = () => ({
  trends: {},
  headlines: {},
  charts: {},
})

export type StoreType = ReturnType<typeof initializeStore>

const zustandContext = createContext<StoreType | null>(null)

export const Provider = zustandContext.Provider

export const useStore = <T>(selector: (state: StoreState) => T) => {
  const store = useContext(zustandContext)

  if (!store) throw new Error('Store is missing the provider')

  return useZustandStore(store, selector)
}

export const initializeStore = (preloadedState: Partial<StoreState>) => {
  return createStore<StoreState>(() => ({
    ...getDefaultInitialState(),
    ...preloadedState,
  }))
}
