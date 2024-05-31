import { type Map } from 'leaflet'
import { Mock } from 'ts-mockery'

import { mapDescriptionId, mapRole } from '@/app/constants/map.constants'
import { renderHook } from '@/config/test-utils'

import { useMapRef } from './useMapRef'

describe('useMapRef', () => {
  test('sets accessibility attributes correctly', () => {
    // Mock Leaflet map instance
    const mockMap = Mock.of<Map>({
      getContainer: jest.fn().mockReturnValue({
        setAttribute: jest.fn(),
      }),
    })

    // Render the hook with the mock map instance
    const { result } = renderHook(() => useMapRef())
    const refCallback = result.current
    refCallback(mockMap)

    // Assertions
    expect(mockMap.getContainer).toHaveBeenCalledTimes(1)
    expect(mockMap.getContainer().setAttribute).toHaveBeenCalledWith('tabindex', '0')
    expect(mockMap.getContainer().setAttribute).toHaveBeenCalledWith('role', mapRole)
    expect(mockMap.getContainer().setAttribute).toHaveBeenCalledWith('aria-describedby', mapDescriptionId)
    expect(mockMap.getContainer().setAttribute).toHaveBeenCalledWith('aria-live', 'assertive')
  })

  test('does not set attributes if node is null', () => {
    // Mock Leaflet map instance
    const mockMap = {
      getContainer: jest.fn().mockReturnValue({
        setAttribute: jest.fn(),
      }),
    }

    // Render the hook with the null map instance
    const { result } = renderHook(() => useMapRef())
    const refCallback = result.current
    refCallback(null)

    // Assertions
    expect(mockMap.getContainer).not.toHaveBeenCalled()
    expect(mockMap.getContainer().setAttribute).not.toHaveBeenCalled()
  })
})
