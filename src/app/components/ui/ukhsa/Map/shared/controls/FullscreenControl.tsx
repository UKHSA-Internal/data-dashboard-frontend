'use client'

import { ControlPosition } from 'leaflet'
import { useCallback, useState } from 'react'
import { useMap } from 'react-leaflet'
import Control from 'react-leaflet-custom-control'

import ExitFullscreenIcon from '@/app/components/ui/ukhsa/Icons/ExitFullscreenIcon'
import FullscreenIcon from '@/app/components/ui/ukhsa/Icons/FullscreenIcon'
import { mapId } from '@/app/constants/map.constants'

interface FullscreenControlProps {
  position: ControlPosition
  enterFullscreenText?: string
  exitFullscreenText?: string
}

export const FullscreenControl = ({
  position,
  enterFullscreenText = 'Enter fullscreen',
  exitFullscreenText = 'Exit fullscreen',
}: FullscreenControlProps) => {
  const map = useMap()
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = useCallback(() => {
    const mapContainer = map.getContainer()

    if (!isFullscreen) {
      // Enter fullscreen
      if (document.fullscreenElement) {
        document.exitFullscreen()
      }

      if (mapContainer.requestFullscreen) {
        mapContainer
          .requestFullscreen()
          .then(() => {
            setIsFullscreen(true)
            // Trigger a resize event to ensure the map adjusts to the new size
            setTimeout(() => {
              map.invalidateSize()
            }, 100)
          })
          .catch((err) => {
            console.error(`Error attempting to enable fullscreen mode: ${err.message}`)
          })
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullscreen(false)
            // Trigger a resize event to ensure the map adjusts to the new size
            setTimeout(() => {
              map.invalidateSize()
            }, 100)
          })
          .catch((err) => {
            console.error(`Error attempting to exit fullscreen mode: ${err.message}`)
          })
      }
    }
  }, [isFullscreen, map])

  // Listen for fullscreen change events (e.g., when user presses ESC)
  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(!!document.fullscreenElement)
    // Trigger a resize event to ensure the map adjusts to the new size
    setTimeout(() => {
      map.invalidateSize()
    }, 100)
  }, [map])

  // Add event listener for fullscreen change
  useState(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  })

  return (
    <Control prepend position={position}>
      <button
        aria-controls={mapId}
        className="govuk-button govuk-button--secondary ukhsa-map__button"
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          event.preventDefault()
          toggleFullscreen()
        }}
      >
        <span className="govuk-visually-hidden">{isFullscreen ? exitFullscreenText : enterFullscreenText}</span>
        {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
      </button>
    </Control>
  )
}
