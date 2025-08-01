'use client'

import { ControlPosition } from 'leaflet'
import { useEffect, useMemo, useState } from 'react'
import { useMap } from 'react-leaflet'
import Control from 'react-leaflet-custom-control'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/ukhsa/Dialog/Dialog'
import { ScrollArea, ScrollBar } from '@/app/components/ui/ukhsa/ScrollArea/ScrollArea'
import { mapId } from '@/app/constants/map.constants'
import { TimePeriodDropdown } from '../../../TimePeriodDropdown/TimePeriodDropdown'

interface YearSelectControlProps {
  position: ControlPosition
  className?: string
}

export function YearSelectControl({ position, className }: YearSelectControlProps) {
  const [text, setText] = useState('')
  const map = useMap()

  // We use a DOM mutation observer to track changes and extract the innerText from
  // the underyling hidden leaflet attribution node
  useEffect(() => {
    const container = map.getContainer().querySelector('.leaflet-control-attribution')

    const observer = new MutationObserver(() => {
      // When the DOM within the container changes, update the attribution
      setText((container as HTMLElement).innerText)
    })

    if (container) {
      // Start observing mutations within the container
      observer.observe(container, { childList: true, subtree: true })
    }

    // Clean up observer on unmount
    return () => {
      observer.disconnect()
    }
  }, [map])

  return (
    <Control position={position}>
      <TimePeriodDropdown className={className} />
    </Control>
  )
}
