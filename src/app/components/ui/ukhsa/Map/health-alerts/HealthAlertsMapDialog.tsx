'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/ukhsa/Dialog/Dialog'
import { Skeleton } from '@/app/components/ui/ukhsa/Skeleton/Skeleton'
import { mapQueryKeys } from '@/app/constants/map.constants'

const { Map, BaseLayer, Choropleth, HealthAlert } = {
  Map: dynamic(() => import('@/app/components/ui/ukhsa/Map/Map'), {
    ssr: false,
    loading: () => <Skeleton className="h-screen" />,
  }),
  BaseLayer: dynamic(() => import('@/app/components/ui/ukhsa/Map/shared/layers/BaseLayer'), {
    ssr: false,
  }),
  Choropleth: dynamic(() => import('@/app/components/ui/ukhsa/Map/shared/layers/ChoroplethLayer'), {
    ssr: false,
  }),
  HealthAlert: dynamic(() => import('@/app/components/ui/ukhsa/Map/shared/controls/HealthAlertControl'), {
    ssr: false,
  }),
}

export function HealthAlertsMapDialog() {
  const [view] = useQueryState(mapQueryKeys.view, parseAsStringLiteral<'map'>(['map']))
  const [selectedFeatureId, setSelectedFeatureId] = useQueryState(mapQueryKeys.featureId, parseAsString)

  const router = useRouter()

  return (
    <>
      <Dialog
        open={!!view}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            router.back()
          }
        }}
      >
        <DialogContent
          className="p-0 no-js:hidden"
          fullscreen
          closeButton={
            <Link
              href={'/'}
              className="govuk-button govuk-button--secondary ukhsa-map__button absolute z-[1000] inline-flex gap-2"
            >
              <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20">
                <path d="M4.828,11L12.314,18.485L10.899,19.899L1,10L10.899,0.101L12.314,1.515L4.828,9L19,9L19,11L4.828,11Z"></path>
              </svg>
              Exit map
            </Link>
          }
        >
          <DialogHeader aria-hidden className="govuk-visually-hidden">
            <DialogTitle>Weather health alerts map</DialogTitle>
          </DialogHeader>

          <Map>
            <BaseLayer />
            <Choropleth
              featureColours={{
                E45000001: 'green',
                E45000005: 'green',
                E45000009: 'green',
                E45000010: 'green',
                E45000016: 'green',
                E45000017: 'green',
                E45000018: 'green',
                E45000019: 'green',
                E45000020: 'green',
              }}
              selectedFeatureId={selectedFeatureId}
              onSelectFeature={setSelectedFeatureId}
            />
            <HealthAlert open={!!selectedFeatureId} onClose={() => setSelectedFeatureId(null)} />
          </Map>
        </DialogContent>
      </Dialog>
    </>
  )
}
