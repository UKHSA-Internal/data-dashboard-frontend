import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const MapCard = dynamic(() => import('./MapCard'), { ssr: false })

export async function MapCardWrapper() {
  return (
    <Suspense fallback={null}>
      <MapCard />
    </Suspense>
  )
}
