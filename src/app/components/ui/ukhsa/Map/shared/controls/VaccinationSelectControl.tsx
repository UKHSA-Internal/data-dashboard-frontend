'use client'

import { ControlPosition } from 'leaflet'
import Control from 'react-leaflet-custom-control'

import { VaccinationDropdown } from '../../../VaccinationDropdown/VaccinationDropdown'

interface VaccinationSelectControlProps {
  position: ControlPosition
  className?: string
}

export function VaccinationSelectControl({ position, className }: VaccinationSelectControlProps) {
  return (
    <div style={{ position: 'absolute', marginLeft: '107%' }}>
      <Control position={position}>
        <VaccinationDropdown className={className} />
      </Control>
    </div>
  )
}
