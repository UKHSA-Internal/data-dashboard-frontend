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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/app/components/ui/ukhsa/Drawer/Drawer'
import { Skeleton } from '@/app/components/ui/ukhsa/Skeleton/Skeleton'
import { mapQueryKeys } from '@/app/constants/map.constants'

const { Map, BaseLayer, Choropleth } = {
  Map: dynamic(() => import('@/app/components/ui/ukhsa/Map/Map'), {
    ssr: false,
    loading: () => <Skeleton className="h-screen" />,
  }),
  BaseLayer: dynamic(() => import('@/app/components/ui/ukhsa/Map/BaseLayer'), {
    ssr: false,
  }),
  Choropleth: dynamic(() => import('@/app/components/ui/ukhsa/Map/Choropleth'), {
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
            <Link href={'/'} className="govuk-button govuk-button--secondary absolute z-[1000] inline-flex gap-2">
              <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20">
                <path d="M10,8.6L15.6,3L17,4.4L11.4,10L17,15.6L15.6,17L10,11.4L4.4,17L3,15.6L8.6,10L3,4.4L4.4,3L10,8.6Z"></path>
              </svg>
              Exit map
            </Link>
          }
        >
          <DialogHeader aria-hidden className="govuk-visually-hidden">
            <DialogTitle>Custom title</DialogTitle>
            <DialogDescription>Custom description</DialogDescription>
          </DialogHeader>

          <Drawer direction="left" open={!!selectedFeatureId}>
            <DrawerContent>
              <DrawerClose className="govuk-button govuk-button--secondary govuk-!-margin-4 flex gap-2">
                <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20">
                  <path d="M4.828,11L12.314,18.485L10.899,19.899L1,10L10.899,0.101L12.314,1.515L4.828,9L19,9L19,11L4.828,11Z"></path>
                </svg>
                Back to map
              </DrawerClose>
              <DrawerHeader>
                <DrawerTitle>Region id: {selectedFeatureId}</DrawerTitle>
                <DrawerDescription>
                  <small className="govuk-body-xs mb-0">Last updated on Thursday, 11 April 2024 at 03:51pm</small>
                </DrawerDescription>
              </DrawerHeader>
              <div className="govuk-!-padding-4">
                <div>
                  <strong className="govuk-!-margin-right-2">Alert status</strong>
                  <div className="govuk-tag govuk-tag--green">Green</div>
                </div>
                <div className="govuk-!-margin-top-3">
                  <strong>Alert description</strong>
                  <p className="govuk-body-s">
                    Significant impacts are expected across the health and social care sector due to the high
                    temperatures, including: observed increase in mortality across the population likely, particularly
                    in the 65+ age group or those with health conditions, but impacts may also be seen in younger age
                    groups; increased demand for remote health care services likely; internal temperatures in care
                    settings (hospitals and care homes) may exceed recommended threshold for clinical risk assessment;
                    impact on ability of services to be delivered due to heat effects on workforce possible and many
                    indoor environments likely to be overheating, risk to vulnerable people living independently in
                    community as well as in care settings; medicines management issues; staffing issues due to external
                    factors (e.g. transport); cross system demand for temporary AC capacity being exceeded possible and
                    other sectors starting to be observe impacts (e.g. travel delays).
                  </p>
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          <Map>
            <BaseLayer
              variant="Default"
              options={{ attribution: '', url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' }}
            />
            <Choropleth selectedFeatureId={selectedFeatureId} onSelectFeature={setSelectedFeatureId} />
          </Map>
        </DialogContent>
      </Dialog>
    </>
  )
}
