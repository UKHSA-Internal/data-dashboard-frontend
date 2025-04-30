'use client'

import { ControlPosition } from 'leaflet'
import Image from 'next/image'
import Control from 'react-leaflet-custom-control'

import logo from '#/assets/images/ukhsa_lesser_arms_stacked_logo.png'

interface LogoLayerProps {
  position: ControlPosition
}

export function UKHSALogoLayer({ position }: LogoLayerProps) {
  return (
    <Control position={position}>
      <div data-testid="logo-layer">
        <Image src={logo} height="125" alt="Logo for the UK Health Security Agency" />
      </div>
    </Control>
  )
}
