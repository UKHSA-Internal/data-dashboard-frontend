'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/ukhsa/Dialog/Dialog'
import { ChoroplethRenderer } from '@/app/components/ui/ukhsa/Map/WeatherHealthAlerts/ChoroplethRenderer'
import { Skeleton } from '@/app/components/ui/ukhsa/Skeleton/Skeleton'

const { Map, BaseLayer } = {
  Map: dynamic(() => import('@/app/components/ui/ukhsa/Map/Map'), {
    ssr: false,
    loading: () => <Skeleton className="h-screen" />,
  }),
  BaseLayer: dynamic(() => import('@/app/components/ui/ukhsa/Map/BaseLayer'), {
    ssr: false,
  }),
}

export default function MapDialog() {
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
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
        <Map>
          <BaseLayer
            variant="Default"
            options={{ attribution: '', url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' }}
          />
          <ChoroplethRenderer />
        </Map>
      </DialogContent>
    </Dialog>
  )
}
