/**
 * Sets interactive accessibility attributes dynamically to the underlying Leaflet container element.
 * These attributes are essential for accessibility and can be customized using their <MapContainer /> component.
 * @returns {Function} A callback function to be used as a ref for the Leaflet map.
 * @param {Map | null} node - The Leaflet map instance or null.
 */
import { type Map } from 'leaflet'
import { useCallback } from 'react'

import { mapDescriptionId, mapRole } from '@/app/constants/map.constants'

export const useMapRef = () =>
  useCallback((node: Map | null) => {
    if (node) {
      const container = node.getContainer()
      container.setAttribute('tabindex', '0')
      container.setAttribute('role', mapRole)
      container.setAttribute('aria-describedby', mapDescriptionId)
      container.setAttribute('aria-live', 'assertive')
    }
  }, [])
