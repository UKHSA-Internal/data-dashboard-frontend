'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'

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
import { useMapContext } from '@/app/context/MapContext'

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
  const [selectedMapFeatureId, setSelectedMapFeatureUrlParam] = useQueryState('fid')

  const searchParams = useSearchParams()
  const router = useRouter()
  const { selectedMapFeature, setSelectedMapFeature } = useMapContext()

  return (
    <>
      <Dialog
        open={searchParams.get('view') === 'map'}
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

          <Drawer direction="left" open={!!selectedMapFeatureId}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{selectedMapFeature?.properties.phec16nm}</DrawerTitle>
                <DrawerDescription>This action cannot be undone.</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <button>Submit</button>
                <DrawerClose
                  className="govuk-button govuk-button--secondary"
                  onClick={() => {
                    setSelectedMapFeatureUrlParam(null)
                  }}
                >
                  Cancel pls
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Map>
            <BaseLayer
              variant="Default"
              options={{ attribution: '', url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' }}
            />
            <Choropleth onClick={setSelectedMapFeature} />
          </Map>
        </DialogContent>
      </Dialog>
    </>
  )
}
