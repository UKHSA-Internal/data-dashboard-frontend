import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import featureCollection from '../shared/data/geojson/ukhsa-regions'

const HealthAlertsMapDialog = dynamic(() => import('./HealthAlertsMapDialog'))

export async function HealthAlertsMapWrapper() {
  return (
    <Suspense fallback={null}>
      <HealthAlertsMapDialog featureCollection={featureCollection} />
    </Suspense>
  )
}
