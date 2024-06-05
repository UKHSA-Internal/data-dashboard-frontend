import { ControlPosition } from 'leaflet'
import { useMap } from 'react-leaflet'
import Control from 'react-leaflet-custom-control'

import { mapId } from '@/app/constants/map.constants'

interface ZoomControlProps {
  position: ControlPosition
  zoomInText?: string
  zoomOutText?: string
}

export const ZoomControl = ({ position, zoomInText = 'Zoom in', zoomOutText = 'Zoom out' }: ZoomControlProps) => {
  const map = useMap()

  return (
    <Control prepend position={position}>
      <button
        aria-controls={mapId}
        className="govuk-button govuk-button--secondary ukhsa-map__button"
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          event.preventDefault()
          map.setZoom(map.getZoom() + 1)
        }}
      >
        <span className="govuk-visually-hidden">{zoomInText}</span>
        <svg aria-hidden focusable="false" width="20" height="20" viewBox="0 0 20 20">
          <rect x="3" y="9" width="14" height="2"></rect>
          <rect x="9" y="3" width="2" height="14"></rect>
        </svg>
      </button>
      <button
        aria-controls={mapId}
        className="govuk-button govuk-button--secondary ukhsa-map__button"
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          event.preventDefault()
          map.setZoom(map.getZoom() - 1)
        }}
      >
        <span className="govuk-visually-hidden">{zoomOutText}</span>
        <svg aria-hidden focusable="false" width="20" height="20" viewBox="0 0 20 20">
          <rect x="3" y="9" width="14" height="2"></rect>
        </svg>
      </button>
    </Control>
  )
}
