import { getReturnPathWithParams } from './getReturnPathWithParams'
import { getSearchParams } from './getSearchParams'

jest.mock('next/headers', () => ({
  headers: jest.fn(),
}))
jest.mock('./getSearchParams', () => ({
  getSearchParams: jest.fn(),
}))

describe('getReturnPathWithParams', () => {
  const mockSearchParams = getSearchParams as jest.MockedFunction<typeof getSearchParams>
  const mockHeaders = jest.fn()

  const { headers } = require('next/headers')
  ;(headers as jest.Mock).mockReturnValue({
    get: mockHeaders,
  })

  test('should construct a return URL with returnUrl parameter if "page" is present in search params', async () => {
    mockHeaders.mockReturnValue('http://localhost/metrics-documentation?page=6')
    mockSearchParams.mockResolvedValue(new URLSearchParams({ page: '6' }))

    const returnUrlBuilder = await getReturnPathWithParams()
    const constructedUrl = returnUrlBuilder('/metrics-documentation/parainfluenza-testing-positivity-by-week')

    expect(constructedUrl).toBe(
      `/metrics-documentation/parainfluenza-testing-positivity-by-week?returnUrl=${encodeURIComponent(
        '/metrics-documentation?page=6'
      )}`
    )
  })

  test('should construct a return URL without returnUrl parameter if "page" is not present in search params', async () => {
    mockHeaders.mockReturnValue('http://localhost/metrics-documentation')
    mockSearchParams.mockResolvedValue(new URLSearchParams())

    const returnUrlBuilder = await getReturnPathWithParams()
    const constructedUrl = returnUrlBuilder('/metrics-documentation/parainfluenza-testing-positivity-by-week')

    expect(constructedUrl).toBe(`/metrics-documentation/parainfluenza-testing-positivity-by-week`)
  })
})
