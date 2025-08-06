import { renderHook } from '@/config/test-utils'

import { useMapCleanup } from './useMapCleanup'

/* eslint-disable @typescript-eslint/no-explicit-any*/

describe('useMapCleanup', () => {
  const mockMapId = 'test-map-id'

  beforeEach(() => {
    // Clear any existing global L object
    delete (window as any).L

    // Reset DOM classes
    document.body.className = ''
    document.documentElement.className = ''

    // Clear document body of any test elements
    document.body.innerHTML = ''

    jest.clearAllTimers()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  test('should not run cleanup on mount', () => {
    // Set up some global Leaflet state
    ;(window as any).L = { map: 'test-leaflet-object' }
    document.body.classList.add('leaflet-drag-target')

    renderHook(() => useMapCleanup(mockMapId))

    // Should not clean up immediately on mount1
    expect((window as any).L).toBeDefined()
    expect(document.body.classList.contains('leaflet-drag-target')).toBe(true)
  })

  test('should clean up global Leaflet reference on unmount', () => {
    // Set up global Leaflet state
    ;(window as any).L = { map: 'test-leaflet-object' }

    const { unmount } = renderHook(() => useMapCleanup(mockMapId))

    unmount()
    jest.advanceTimersByTime(100)

    expect((window as any).L).toBeUndefined()
  })

  test('should remove leaflet-drag-target class from body on unmount', () => {
    document.body.classList.add('leaflet-drag-target', 'other-class')

    const { unmount } = renderHook(() => useMapCleanup(mockMapId))

    unmount()
    jest.advanceTimersByTime(100)

    expect(document.body.classList.contains('leaflet-drag-target')).toBe(false)
    expect(document.body.classList.contains('other-class')).toBe(true)
  })

  test('should remove leaflet-drag-target class from documentElement on unmount', () => {
    document.documentElement.classList.add('leaflet-drag-target', 'html-class')

    const { unmount } = renderHook(() => useMapCleanup(mockMapId))

    unmount()
    jest.advanceTimersByTime(100)

    expect(document.documentElement.classList.contains('leaflet-drag-target')).toBe(false)
    expect(document.documentElement.classList.contains('html-class')).toBe(true)
  })

  test('should remove leaflet classes from elements outside map container', () => {
    // Create elements with leaflet classes
    const outsideElement = document.createElement('div')
    outsideElement.className = 'leaflet-popup leaflet-container other-class'
    document.body.appendChild(outsideElement)

    const mapContainer = document.createElement('div')
    mapContainer.id = mockMapId
    const insideElement = document.createElement('div')
    insideElement.className = 'leaflet-layer leaflet-zoom-hide'
    mapContainer.appendChild(insideElement)
    document.body.appendChild(mapContainer)

    const { unmount } = renderHook(() => useMapCleanup(mockMapId))

    unmount()
    jest.advanceTimersByTime(100)

    // Outside element should have leaflet classes removed
    expect(outsideElement.className).toBe('other-class')

    // Inside element should keep leaflet classes
    expect(insideElement.className).toBe('leaflet-layer leaflet-zoom-hide')
  })

  test('should handle elements with only leaflet classes', () => {
    const element = document.createElement('div')
    element.className = 'leaflet-popup leaflet-container'
    document.body.appendChild(element)

    const { unmount } = renderHook(() => useMapCleanup(mockMapId))

    unmount()
    jest.advanceTimersByTime(100)

    // Should result in empty string, not just spaces
    expect(element.className.trim()).toBe('')
  })

  test('should handle elements with no classes gracefully', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)

    const { unmount } = renderHook(() => useMapCleanup(mockMapId))

    expect(() => {
      unmount()
      jest.advanceTimersByTime(100)
    }).not.toThrow()
  })
})
