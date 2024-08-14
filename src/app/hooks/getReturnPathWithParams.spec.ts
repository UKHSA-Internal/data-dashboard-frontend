import { headers } from 'next/headers'

import { getReturnPathWithParams } from './getReturnPathWithParams'
import { getSearchParams } from './getSearchParams'

jest.mock('next/headers')
jest.mock('./getSearchParams')

describe('getReturnPathWithParams', () => {
  const mockSearchParams = jest.mocked(getSearchParams)
  const mockHeaders = jest.fn()

  ;(headers as jest.Mock).mockImplementation(() => ({
    get: mockHeaders,
  }))

  test('should construct a return URL with returnUrl parameter if "page" is present in search params', () => {
    mockHeaders.mockReturnValue('http://localhost/metrics-documentation?page=6')
    mockSearchParams.mockReturnValue(new URLSearchParams({ page: '6' }))

    const returnUrlBuilder = getReturnPathWithParams()
    const constructedUrl = returnUrlBuilder('/metrics-documentation/parainfluenza-testing-positivity-by-week')

    expect(constructedUrl).toBe(
      `/metrics-documentation/parainfluenza-testing-positivity-by-week?returnUrl=${encodeURIComponent(
        '/metrics-documentation?page=6'
      )}`
    )
  })

  test('should construct a return URL without returnUrl parameter if "page" is not present in search params', () => {
    mockHeaders.mockReturnValue('http://localhost/metrics-documentation')
    mockSearchParams.mockReturnValue(new URLSearchParams())

    const returnUrlBuilder = getReturnPathWithParams()
    const constructedUrl = returnUrlBuilder('/metrics-documentation/parainfluenza-testing-positivity-by-week')

    expect(constructedUrl).toBe(`/metrics-documentation/parainfluenza-testing-positivity-by-week`)
  })
})
