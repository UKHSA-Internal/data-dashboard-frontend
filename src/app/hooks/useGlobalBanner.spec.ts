import { renderHook } from '@testing-library/react'

import { client } from '@/api/utils/api.utils'

import { useGlobalBanner } from './useGlobalBanner'

const clientMock = jest.mocked(client)

describe('useGlobalBanner', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('returns banner data when request is successful', async () => {
    clientMock.mockResolvedValueOnce({
      data: {
        'active-global-banner': {
          title: 'Test Banner',
          banner_type: 'Information',
          body: 'This is a test banner',
        },
      },
      status: 200,
    })

    const { result } = renderHook(() => useGlobalBanner())

    expect(await result.current).toEqual({
      heading: 'Test Banner',
      variant: 'Information',
      body: 'This is a test banner',
    })
  })

  test('returns null when no banner is active', async () => {
    clientMock.mockResolvedValueOnce({
      data: {
        'active-global-banner': null,
      },
      status: 200,
    })

    const { result } = renderHook(() => useGlobalBanner())

    expect(await result.current).toBeNull()
  })

  test('returns null when request fails', async () => {
    const { result } = renderHook(() => useGlobalBanner())

    expect(await result.current).toBeNull()
  })
})
