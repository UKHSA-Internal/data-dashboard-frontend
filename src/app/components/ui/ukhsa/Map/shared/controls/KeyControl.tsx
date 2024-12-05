'use client'

import { ControlPosition } from 'leaflet'
import Control from 'react-leaflet-custom-control'

import { HealthAlertStatus } from '@/api/models/Alerts'
import { getCssVariableFromColour, getTextColourCssFromColour } from '@/app/utils/weather-health-alert.utils'

interface KeyControlProps {
  position: ControlPosition
  keyItems: HealthAlertStatus[]
}

export function KeyControl({ position, keyItems }: KeyControlProps) {
  return (
    <Control position={position}>
      <div className="bg-white px-2" style={{ border: '2px solid black' }}>
        <p className="govuk-heading-m m-0 mb-1">Key</p>
        <div className="m-0 mb-1 grid grid-cols-none gap-2">
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
