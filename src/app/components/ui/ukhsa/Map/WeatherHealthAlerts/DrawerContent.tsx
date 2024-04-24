'use client'

import { useMapStore } from '@/app/providers/MapProvider'

export const DrawerContent = () => {
  const selectedMapFeature = useMapStore((store) => store.selectedMapFeature)

  return <h1>hi {selectedMapFeature && selectedMapFeature.id}</h1>
}
