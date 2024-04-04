import { headers } from 'next/headers'

import { useReturnUrlWithParams } from './useReturnUrlWithParams'
import { useSearchParams } from './useSearchParams'

jest.mock('next/headers')
jest.mock('./useSearchParams')

describe('useReturnUrlWithParams', () => {
  const mockSearchParams = jest.mocked(useSearchParams)
  const mockHeaders = jest.fn()

  ;(headers as jest.Mock).mockImplementation(() => ({
    get: mockHeaders,
  }))

  test('should construct a return URL with returnUrl parameter if "page" is present in search params', () => {
    const currentUrl = 'http://localhost/metrics-documentation?page=6'

    mockHeaders.mockReturnValue(currentUrl)
    mockSearchParams.mockReturnValue(new URLSearchParams({ page: '6' }))

    const returnUrlBuilder = useReturnUrlWithParams()
    const constructedUrl = returnUrlBuilder('/metrics-documentation/parainfluenza-testing-positivity-by-week')

    expect(constructedUrl).toBe(
      `http://localhost/metrics-documentation/parainfluenza-testing-positivity-by-week?returnUrl=${encodeURIComponent(
        currentUrl
      )}`
    )
  })

  test('should construct a return URL without returnUrl parameter if "page" is not present in search params', () => {
    const currentUrl = 'http://localhost/metrics-documentation'

    mockHeaders.mockReturnValue(currentUrl)
    mockSearchParams.mockReturnValue(new URLSearchParams())

    const returnUrlBuilder = useReturnUrlWithParams()
    const constructedUrl = returnUrlBuilder('/metrics-documentation/parainfluenza-testing-positivity-by-week')

    expect(constructedUrl).toBe(`http://localhost/metrics-documentation/parainfluenza-testing-positivity-by-week`)
  })
})
