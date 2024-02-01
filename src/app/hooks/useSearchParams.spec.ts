import { headers } from 'next/headers'

import { useSearchParams } from './useSearchParams'

jest.mock('next/headers')

describe('useSearchParams', () => {
  // Mock the headers function
  const mockHeaders = jest.fn()

  beforeAll(() => {
    ;(headers as jest.Mock).mockImplementation(() => ({
      get: mockHeaders,
    }))
  })

  test('should correctly extract search parameters from x-url header', () => {
    mockHeaders.mockReturnValue('http://example.com?param1=value1&param2=value2')
    const searchParams = useSearchParams()
    expect(searchParams.get('param1')).toBe('value1')
    expect(searchParams.get('param2')).toBe('value2')
  })

  test('should handle the absence of x-url header', () => {
    mockHeaders.mockReturnValue(null)
    const searchParams = useSearchParams()
    expect([...searchParams.entries()]).toEqual([])
  })

  afterEach(() => {
    mockHeaders.mockReset()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })
})
