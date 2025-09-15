'use client'

import { ControlPosition } from 'leaflet'
import Control from 'react-leaflet-custom-control'

import { TimePeriodDropdown } from '../../../TimePeriodDropdown/TimePeriodDropdown'
import { VaccinationDropdown } from '../../../VaccinationDropdown/VaccinationDropdown'

interface YearSelectControlProps {
  position: ControlPosition
  className?: string
}

export function CoverControl({ position, className }: YearSelectControlProps) {
  return (
    <Control position={position}>
      <div data-testid="cover-control" className={className}>
        <TimePeriodDropdown />
        <VaccinationDropdown />
      </div>
    </Control>
  )
}
