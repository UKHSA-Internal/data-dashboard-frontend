import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import featureCollection from '../shared/data/geojson/ukhsa-regions'

const HealthAlertsMapDialog = dynamic(() => import('./HealthAlertsMapDialog'))
import { ErrorBoundary } from 'react-error-boundary'

export async function HealthAlertsMapWrapper() {
  return (
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <HealthAlertsMapDialog featureCollection={featureCollection} />
      </Suspense>
    </ErrorBoundary>
  )
}
