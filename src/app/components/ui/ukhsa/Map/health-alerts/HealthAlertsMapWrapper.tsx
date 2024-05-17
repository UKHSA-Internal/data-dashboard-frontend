import { Suspense, use } from 'react'

import { HealthAlertsMapDialog } from './HealthAlertsMapDialog'

export function HealthAlertsMapWrapper() {
  const featureCollection = use(import('@/app/components/ui/ukhsa/Map/shared/data/geojson/ukhsa-regions')).default

  return (
    <Suspense fallback={null}>
      <HealthAlertsMapDialog featureCollection={featureCollection} />
    </Suspense>
  )
}
