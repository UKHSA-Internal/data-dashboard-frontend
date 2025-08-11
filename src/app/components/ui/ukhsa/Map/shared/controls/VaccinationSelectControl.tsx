'use client'

import { ControlPosition } from 'leaflet'
import Control from 'react-leaflet-custom-control'

import { VaccinationDropdown } from '../../../VaccinationDropdown/VaccinationDropdown'

interface VaccinationSelectControlProps {
  position: ControlPosition
  className?: string
}

export function VaccinationSelectControl({ position, className = '' }: VaccinationSelectControlProps) {
  return (
    <Control position={position}>
      <div data-testid="vaccination-select-control">
        <VaccinationDropdown className={className} />
      </div>
    </Control>
  )
}
