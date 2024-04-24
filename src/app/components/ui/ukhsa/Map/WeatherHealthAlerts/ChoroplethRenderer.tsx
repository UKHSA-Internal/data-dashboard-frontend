'use client'

import dynamic from 'next/dynamic'

import { useMapStore } from '@/app/providers/MapProvider'

const Choropleth = dynamic(() => import('@/app/components/ui/ukhsa/Map/Choropleth'), {
  ssr: false,
})

export const ChoroplethRenderer = () => {
  const { setSelectedMapFeature } = useMapStore((state) => state)

  return <Choropleth onClick={setSelectedMapFeature} />
}
