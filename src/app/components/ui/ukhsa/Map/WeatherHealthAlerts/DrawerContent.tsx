'use client'

import { useMapContext } from '@/app/context/MapContext'

export const DrawerContent = () => {
  const { selectedMapFeature } = useMapContext()

  return <h1>hi {selectedMapFeature && selectedMapFeature.id}</h1>
}
