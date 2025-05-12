'use client'

import { ControlPosition } from 'leaflet'
import Control from 'react-leaflet-custom-control'

interface LogoLayerProps {
  position: ControlPosition
}

export function UKHSALogoLayer({ position }: LogoLayerProps) {
  return (
    <Control position={position}>
      <div data-testid="logo-layer">
        <img
          src={'/assets/images/ukhsa_lesser_arms_stacked_logo.png'}
          height={'125px'}
          width={'125px'}
          alt="Logo for the UK Health Security Agency"
        />
      </div>
    </Control>
  )
}
