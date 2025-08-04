'use client'

import { ControlPosition } from 'leaflet'
import Control from 'react-leaflet-custom-control'

import { TimePeriodDropdown } from '../../../TimePeriodDropdown/TimePeriodDropdown'

interface YearSelectControlProps {
  position: ControlPosition
  className?: string
}

export function YearSelectControl({ position, className }: YearSelectControlProps) {
  return (
    <Control position={position}>
      <TimePeriodDropdown className={className} />
    </Control>
  )
}
