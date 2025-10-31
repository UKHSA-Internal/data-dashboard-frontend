import { Map } from 'leaflet'
import { useMap } from 'react-leaflet'
import { Mock } from 'ts-mockery'

import { geoJsonFeatureId, geoJsonFeatureName } from '@/app/constants/map.constants'
import { act, render, renderHook, waitFor, within } from '@/config/test-utils'

import { FeatureCollection } from '../data/geojson/ukhsa-regions'
import { useChoroplethKeyboardAccessibility } from './useChoroplethKeyboardEvents'

jest.mock('react-leaflet')
jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}))

const features = Mock.of<FeatureCollection['features']>([
  {
    type: 'Feature',
    properties: { [geoJsonFeatureId]: '1', [geoJsonFeatureName]: 'London' },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          [0, 0],
        ],
      ],
    },
  },
])

const mockSetSelectedFeatureId = jest.fn()
const mockMap = {
  getBounds: jest.fn().mockReturnValue({
    intersects: jest.fn(() => true),
  }),
  on: jest.fn(),
  off: jest.fn(),
}

const { useQueryState } = require('nuqs')

jest.mocked(useMap).mockReturnValue(Mock.of<Map>(mockMap))
jest.mocked(useQueryState).mockReturnValue([null, mockSetSelectedFeatureId])

describe('useChoroplethKeyboardAccessibility', () => {
  test('should calculate visible features on mount', () => {
    const { result } = renderHook(() => useChoroplethKeyboardAccessibility(features))

    expect(result.current[1]).toBeInstanceOf(Function)

    const { container } = render(<>{result.current[0]}</>)
    expect(within(container).getByTestId('ukhsa-map-sr')).toHaveTextContent(
      '1 regions highlighted in the map area. Use number keys to select a region.1. London'
    )
  })

  test('should recalculate visible features on map move', () => {
    const { result } = renderHook(() => useChoroplethKeyboardAccessibility(features))

    act(() => {
      result.current[1]() // Recalculate visible features
    })

    expect(mockMap.getBounds).toHaveBeenCalled()
    expect((result.current[0] as any).props.children[0]).toContain('1 regions highlighted')
  })

  test('should generate the correct screen reader text when there are more than maxVisibleRegions', () => {
    const manyFeatures = new Array(10).fill(features[0])
    const { result } = renderHook(() => useChoroplethKeyboardAccessibility(manyFeatures))

    expect((result.current[0] as any).props.children).toContain(
      'There are 10 or more visible regions. Please zoom in to refine results.'
    )
  })

  test('should handle keyboard events to select a feature', async () => {
    renderHook(() => useChoroplethKeyboardAccessibility(features))

    const event = new KeyboardEvent('keydown', { key: '1' })
    act(() => {
      window.dispatchEvent(event)
    })

    await waitFor(() => {
      expect(mockSetSelectedFeatureId).toHaveBeenCalledWith('1')
    })
  })
})
