import { useEffect } from 'react'
/* eslint-disable @typescript-eslint/no-explicit-any*/

export const useMapCleanup = (mapId: string) => {
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          delete (window as any).L
          document.body.classList.remove('leaflet-drag-target')
          document.documentElement.classList.remove('leaflet-drag-target')

          const elementsWithLeafletClasses = document.querySelectorAll('[class*="leaflet"]')
          elementsWithLeafletClasses.forEach((element) => {
            if (!element.closest(`#${mapId}`)) {
              element.className = element.className
                .split(' ')
                .filter((className) => !className.startsWith('leaflet'))
                .join(' ')
            }
          })
        }, 100)
      }
    }
  }, [mapId])
}
