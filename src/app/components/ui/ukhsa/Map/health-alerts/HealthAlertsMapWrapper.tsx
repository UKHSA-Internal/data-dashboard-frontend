import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import featureCollection from '../shared/data/geojson/ukhsa-regions'

const HealthAlertsMapDialog = dynamic(() => import('./HealthAlertsMapDialog'))

import { ErrorBoundary } from 'react-error-boundary'

import { flags } from '@/app/constants/flags.constants'
import { getFeatureFlag } from '@/app/utils/flags.utils'

export async function HealthAlertsMapWrapper() {
  const {
    variant: { name: mapTileProvider },
  } = await getFeatureFlag(flags.mapTileProvider)

  return (
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        {mapTileProvider === 'OrdinanceSurveyMaps' ? (
          <HealthAlertsMapDialog mapTileProvider="OrdinanceSurveyMaps" featureCollection={featureCollection} />
        ) : mapTileProvider === 'ArcGISEsri' ? (
          <HealthAlertsMapDialog mapTileProvider="ArcGISEsri" featureCollection={featureCollection} />
        ) : (
          <HealthAlertsMapDialog mapTileProvider="OpenStreetMaps" featureCollection={featureCollection} />
        )}
      </Suspense>
    </ErrorBoundary>
  )
}
