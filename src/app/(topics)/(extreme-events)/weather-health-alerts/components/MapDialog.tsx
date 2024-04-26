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
  DrawerFooter,
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
              <DrawerHeader>
                <DrawerTitle>Region id: {selectedFeatureId}</DrawerTitle>
                <DrawerDescription></DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose
                  className="govuk-button govuk-button--secondary"
                  onClick={() => {
                    setSelectedFeatureId(null)
                  }}
                >
                  Close
                </DrawerClose>
              </DrawerFooter>
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
