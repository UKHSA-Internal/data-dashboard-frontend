import { client } from '@/api/utils/api.utils'
import { renderHook } from '@/config/test-utils'

import { getGlobalBanner } from './getGlobalBanner'

const clientMock = jest.mocked(client)

describe('getGlobalBanner', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('returns banner data when request is successful', async () => {
    clientMock.mockResolvedValueOnce({
      data: {
        active_global_banners: [
          {
            title: 'Test Banner',
            banner_type: 'Information',
            body: 'This is a test banner',
          },
        ],
      },
      status: 200,
    })

    const { result } = renderHook(() => getGlobalBanner())

    expect(await result.current).toEqual([
      {
        title: 'Test Banner',
        banner_type: 'Information',
        body: 'This is a test banner',
      },
    ])
  })

  test('returns empty array when no banner is active', async () => {
    clientMock.mockResolvedValueOnce({
      data: {
        active_global_banners: [],
      },
      status: 200,
    })

    const { result } = renderHook(() => getGlobalBanner())

    expect(await result.current).toBeNull()
  })

  test('returns null when request fails', async () => {
    const { result } = renderHook(() => getGlobalBanner())

    expect(await result.current).toBeNull()
  })

  test('returns null when parse error occurs', async () => {
    clientMock.mockResolvedValueOnce({
      data: {
        invalid_data: 'not matching schema',
      },
      status: 200,
    })

    const { result } = renderHook(() => getGlobalBanner())

    expect(await result.current).toBeNull()
  })
})
