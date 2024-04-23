'use client'

import { useWeatherHealthAlertsStore } from './Store'

export const DrawerContent = () => {
  const store = useWeatherHealthAlertsStore()

  return <h1>hi {store.selectedMapFeature && store.selectedMapFeature.id}</h1>
}
