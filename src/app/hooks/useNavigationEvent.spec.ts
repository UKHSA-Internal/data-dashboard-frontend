import { act, renderHook } from '@testing-library/react'
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation'

import { useNavigationEvent } from './useNavigationEvent'

// Mocking the next/navigation hooks
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}))

const usePathnameMock = jest.mocked(usePathname)
const useSearchParamsMock = jest.mocked(useSearchParams)

describe('useNavigationEvent', () => {
  it('should call the callback function when pathname changes', () => {
    const onPathnameChange = jest.fn()
    const mockPathname = '/mock-path'
    const mockSearchParams = new URLSearchParams('param=value')

    jest.useFakeTimers()

    // Mock hook behaviors
    usePathnameMock.mockReturnValue(mockPathname)
    useSearchParamsMock.mockReturnValue(mockSearchParams as unknown as ReadonlyURLSearchParams)

    // Render the hook
    const { rerender } = renderHook(() => useNavigationEvent(onPathnameChange))

    // Initial render should not call the callback
    expect(onPathnameChange).not.toHaveBeenCalled()

    const newMockPathname = '/new-mock-path'
    const newMockSearchParams = new URLSearchParams('newParam=newValue')

    // Rerender with new values
    usePathnameMock.mockReturnValue(newMockPathname)
    useSearchParamsMock.mockReturnValue(newMockSearchParams as unknown as ReadonlyURLSearchParams)

    rerender()

    // Asynchronous effect should trigger
    act(() => {
      jest.runAllTimers() // Run any timers used in your effect
    })

    // Callback should be called with the updated URL
    expect(onPathnameChange).toHaveBeenCalledWith(`${newMockPathname}?${newMockSearchParams.toString()}`)
  })
})
