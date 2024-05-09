import { Map } from 'leaflet'
import { useMap } from 'react-leaflet'
import { Mock } from 'ts-mockery'

import { renderHook } from '@/config/test-utils'

import { useBaseLayerEsri } from './useBaseLayerEsri' // Adjust the import path as needed

jest.mock('react-leaflet')

describe('useBaseLayerEsri', () => {
  test('removes accessibility attributes correctly', () => {
    const mockRemoveAttribute = jest.fn()

    // Mock React Leaflet useMap instance
    const mockMap = Mock.of<Map>({
      getContainer: jest.fn().mockReturnValue({
        querySelector: jest.fn().mockReturnValue({
          removeAttribute: mockRemoveAttribute,
        }),
      }),
    })

    jest.mocked(useMap).mockReturnValueOnce(mockMap)

    // Render the hook with the mock map instance
    renderHook(() => useBaseLayerEsri())

    // Assertions
    expect(mockMap.getContainer).toHaveBeenCalledTimes(1)
    expect(mockMap.getContainer().querySelector).toHaveBeenCalledWith('canvas[role=region]')
    expect(mockRemoveAttribute).toHaveBeenCalledWith('role')
    expect(mockRemoveAttribute).toHaveBeenCalledWith('aria-label')
    expect(mockRemoveAttribute).toHaveBeenCalledWith('tabindex')
  })

  test('does not remove attributes if the canvas layer is not found', () => {
    // Mock React Leaflet useMap instance
    const mockMap = Mock.of<Map>({
      getContainer: jest.fn().mockReturnValue({
        querySelector: jest.fn().mockReturnValue(null),
      }),
    })

    jest.mocked(useMap).mockReturnValueOnce(mockMap)

    // Render the hook with the mock map instance
    renderHook(() => useBaseLayerEsri())

    // Assertions
    expect(mockMap.getContainer).toHaveBeenCalledTimes(1)
    expect(mockMap.getContainer().querySelector).toHaveBeenCalledWith('canvas[role=region]')
  })
})
