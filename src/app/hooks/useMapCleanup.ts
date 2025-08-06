// hooks/useMapCleanup.ts
import { useEffect, useRef } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any*/
export const useMapCleanup = (mapId: string) => {
  const hasCleanedUp = useRef(false)

  const performCleanup = () => {
    if (hasCleanedUp.current) return

    hasCleanedUp.current = true

    if (typeof window !== 'undefined') {
      // Remove global Leaflet reference
      delete (window as any).L

      // Remove any persistent Leaflet CSS classes from DOM elements
      document.body.classList.remove('leaflet-drag-target')
      document.documentElement.classList.remove('leaflet-drag-target')

      // Remove any other leaflet classes that might persist
      const elementsWithLeafletClasses = document.querySelectorAll('[class*="leaflet"]')
      elementsWithLeafletClasses.forEach((element) => {
        // Only clean up elements outside of our map container
        if (!element.closest(`#${mapId}`)) {
          element.className = element.className
            .split(' ')
            .filter((className) => !className.startsWith('leaflet'))
            .join(' ')
        }
      })

      // Store cleanup state in sessionStorage to persist across refreshes
      sessionStorage.setItem('mapCleanupRequired', 'true')
    }
  }

  useEffect(() => {
    // Check if cleanup is required after a refresh
    const cleanupRequired = sessionStorage.getItem('mapCleanupRequired')
    if (cleanupRequired === 'true') {
      sessionStorage.removeItem('mapCleanupRequired')
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        performCleanup()
      }, 50)
    }

    // Handle various navigation scenarios
    const handleBeforeUnload = () => performCleanup()
    const handlePopState = () => performCleanup()
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        performCleanup()
      }
    }

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Component unmount cleanup (for normal navigation)
    return () => {
      setTimeout(() => {
        performCleanup()
      }, 100)

      // Clean up event listeners
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [mapId])
}
