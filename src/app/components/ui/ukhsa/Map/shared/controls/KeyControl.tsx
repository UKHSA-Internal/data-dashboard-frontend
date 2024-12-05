'use client'

import { ControlPosition } from 'leaflet'
import { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'
import Control from 'react-leaflet-custom-control'
import { mapId } from '@/app/constants/map.constants'
import { getCssVariableFromColour, getTextColourCssFromColour } from '@/app/utils/weather-health-alert.utils'

interface KeyControlProps {
  position: ControlPosition
  keyItems: String[]
}

export function KeyControl({ position, keyItems }: KeyControlProps) {
  const [text, setText] = useState('')
  const map = useMap()

  // We use a DOM mutation observer to track changes and extract the innerText from
  // the underyling hidden leaflet attribution node
  useEffect(() => {
    const container = map.getContainer().querySelector('.leaflet-control-attribution')

    const observer = new MutationObserver(() => {
      // When the DOM within the container changes, update the Key
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
      <div className="px-2 bg-white" style={{ border: '2px solid black' }}>
        <p className="govuk-heading-m m-0 mb-1">Key</p>
        <div className="grid grid-cols-none gap-2 m-0 mb-1">
          {keyItems.map((colour, index) => {
            return (
              <div key={index} className={'px-6 bg-[' + getCssVariableFromColour(colour) + ']'}>
                <p className={'text-center govuk-body ' + getTextColourCssFromColour(colour) + ' m-0'}>
                  {colour} Alert
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </Control>
  )
}
