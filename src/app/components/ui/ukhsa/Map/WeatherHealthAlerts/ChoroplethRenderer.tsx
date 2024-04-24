'use client'

import dynamic from 'next/dynamic'

import { useMapContext } from '@/app/context/MapContext'

const Choropleth = dynamic(() => import('@/app/components/ui/ukhsa/Map/Choropleth'), {
  ssr: false,
})

export const ChoroplethRenderer = () => {
  const { setSelectedMapFeature } = useMapContext()

  return <Choropleth onClick={setSelectedMapFeature} />
}
