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

interface AttributionControlProps {
  position: ControlPosition
}

export function AttributionControl({ position }: AttributionControlProps) {
  const [text, setText] = useState('')
  const map = useMap()

  const dialogTrigger = useMemo(
    () => (
      <DialogTrigger aria-controls={mapId} className="govuk-button govuk-button--secondary ukhsa-map__button">
        <span className="govuk-visually-hidden">Copyright information</span>
        <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20">
          <path d="M10,2.5C11.286,2.5 12.52,2.823 13.701,3.469C14.883,4.116 15.811,5.038 16.487,6.235C17.162,7.433 17.5,8.688 17.5,10C17.5,11.305 17.169,12.551 16.506,13.735C15.844,14.92 14.92,15.844 13.735,16.506C12.551,17.169 11.305,17.5 10,17.5C8.695,17.5 7.449,17.169 6.265,16.506C5.08,15.844 4.156,14.92 3.494,13.735C2.831,12.551 2.5,11.305 2.5,10C2.5,8.688 2.838,7.433 3.513,6.235C4.189,5.038 5.117,4.116 6.299,3.469C7.48,2.823 8.714,2.5 10,2.5ZM10,3.978C8.969,3.978 7.978,4.236 7.028,4.752C6.079,5.268 5.333,6.007 4.791,6.97C4.249,7.932 3.978,8.943 3.978,10C3.978,11.044 4.244,12.043 4.776,12.996C5.308,13.949 6.051,14.692 7.004,15.224C7.957,15.756 8.956,16.022 10,16.022C11.044,16.022 12.043,15.756 12.996,15.224C13.949,14.692 14.692,13.949 15.224,12.996C15.756,12.043 16.022,11.044 16.022,10C16.022,8.949 15.751,7.941 15.209,6.975C14.667,6.008 13.921,5.268 12.972,4.752C12.022,4.236 11.031,3.978 10,3.978ZM11.821,11.116L13.398,11.645C13.149,12.467 12.738,13.097 12.164,13.535C11.589,13.972 10.904,14.191 10.108,14.191C8.992,14.191 8.081,13.825 7.376,13.094C6.671,12.363 6.319,11.354 6.319,10.069C6.319,9.227 6.475,8.476 6.789,7.817C7.102,7.157 7.554,6.664 8.145,6.338C8.735,6.012 9.396,5.849 10.127,5.849C10.93,5.849 11.601,6.039 12.139,6.421C12.678,6.803 13.097,7.405 13.398,8.228L11.811,8.6C11.629,8.123 11.392,7.777 11.102,7.562C10.811,7.347 10.467,7.239 10.069,7.239C9.475,7.239 8.988,7.462 8.61,7.91C8.231,8.357 8.042,9.057 8.042,10.01C8.042,10.963 8.228,11.664 8.6,12.115C8.972,12.565 9.419,12.79 9.941,12.79C10.379,12.79 10.757,12.662 11.077,12.404C11.397,12.146 11.645,11.717 11.821,11.116Z"></path>
        </svg>
      </DialogTrigger>
    ),
    []
  )

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
      <Dialog modal>
        {dialogTrigger}
        <DialogContent>
          <DialogHeader aria-hidden className="govuk-visually-hidden">
            <DialogTitle>&copy; Copyright</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[12rem]">
            <p>{text}</p>
            <p>Source: Office for National Statistics licensed under the Open Government Licence v.3.0.</p>
            <p>Contains OS data &copy; Crown copyright and database right 2025.</p>
            <ScrollBar />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Control>
  )
}
