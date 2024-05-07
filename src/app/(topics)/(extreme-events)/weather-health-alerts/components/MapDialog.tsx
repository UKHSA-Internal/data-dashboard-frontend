'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { parseAsInteger, parseAsStringLiteral, useQueryState } from 'nuqs'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/ukhsa/Dialog/Dialog'
import { Skeleton } from '@/app/components/ui/ukhsa/Skeleton/Skeleton'
import { mapQueryKeys } from '@/app/constants/map.constants'

const { Map, BaseLayer, Choropleth, ChoroplethKeyboardEvents, HealthAlert } = {
  Map: dynamic(() => import('@/app/components/ui/ukhsa/Map/Map'), {
    ssr: false,
    loading: () => <Skeleton className="h-screen" />,
  }),
  BaseLayer: dynamic(() => import('@/app/components/ui/ukhsa/Map/shared/layers/BaseLayerEsri'), {
    ssr: false,
  }),
  Choropleth: dynamic(() => import('@/app/components/ui/ukhsa/Map/shared/layers/ChoroplethLayer'), {
    ssr: false,
  }),
  ChoroplethKeyboardEvents: dynamic(
    () => import('@/app/components/ui/ukhsa/Map/shared/events/ChoroplethKeyboardEvents'),
    {
      ssr: false,
    }
  ),
  HealthAlert: dynamic(() => import('@/app/components/ui/ukhsa/Map/shared/controls/HealthAlertControl'), {
    ssr: false,
  }),
}

export default function MapDialog() {
  const [view] = useQueryState(mapQueryKeys.view, parseAsStringLiteral<'map'>(['map']))
  const [selectedFeatureId, setSelectedFeatureId] = useQueryState(mapQueryKeys.featureId, parseAsInteger)

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
            <DialogTitle>Custom title</DialogTitle>
            <DialogDescription>Custom description</DialogDescription>
          </DialogHeader>

          <Map>
            <BaseLayer apiKey={process.env.NEXT_PUBLIC_ESRI_API_KEY} />
            <Choropleth
              featureColours={{
                1: 'green',
                2: 'green',
                3: 'green',
                4: 'green',
                5: 'green',
                6: 'green',
                7: 'green',
                8: 'green',
                9: 'green',
              }}
              selectedFeatureId={selectedFeatureId}
              onSelectFeature={setSelectedFeatureId}
            >
              <ChoroplethKeyboardEvents allowedKeys={new RegExp('[1-9]')} />
            </Choropleth>
            <HealthAlert open={!!selectedFeatureId} onClose={() => setSelectedFeatureId(null)} />
          </Map>
        </DialogContent>
      </Dialog>
    </>
  )
}
