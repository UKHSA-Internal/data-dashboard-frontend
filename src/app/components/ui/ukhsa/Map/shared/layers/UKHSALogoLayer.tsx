'use client'

import { ControlPosition } from 'leaflet'
import Image from 'next/image'
import logo from 'public/assets/images/UKHSA_Lesser_Arms_Stacked_RGB.png'
import Control from 'react-leaflet-custom-control'

interface LogoLayerProps {
  position: ControlPosition
}

export function UKHSALogoLayer({ position }: LogoLayerProps) {
  return (
    <Control position={position}>
      <div>
        <Image src={logo} height="125" alt="Logo for the UK Health Security Agency" />
      </div>
    </Control>
  )
}
;``
