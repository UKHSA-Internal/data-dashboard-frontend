'use client'

import dynamic from 'next/dynamic'

import { useWeatherHealthAlertsStore } from './Store'

const Choropleth = dynamic(() => import('@/app/components/ui/ukhsa/Map/Choropleth'), {
  ssr: false,
})

export const ChoroplethRenderer = () => {
  const store = useWeatherHealthAlertsStore()

  return (
    <Choropleth
      onClick={(feature) => {
        store.setSelectedMapFeature(feature)
      }}
    />
  )
}
