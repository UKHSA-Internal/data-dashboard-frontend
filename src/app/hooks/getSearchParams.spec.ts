import { headers } from 'next/headers'

import { getSearchParams } from './getSearchParams'

jest.mock('next/headers')

describe('getSearchParams', () => {
  // Mock the headers function
  const mockHeaders = jest.fn()

  beforeAll(() => {
    ;(headers as jest.Mock).mockResolvedValue({
      get: mockHeaders,
    })
  })

  test('should correctly extract search parameters from x-url header', async () => {
    mockHeaders.mockReturnValue('http://example.com?param1=value1&param2=value2')
    const searchParams = await getSearchParams()
    expect(searchParams.get('param1')).toBe('value1')
    expect(searchParams.get('param2')).toBe('value2')
  })

  test('should handle the absence of x-url header', async () => {
    mockHeaders.mockReturnValue(null)
    const searchParams = await getSearchParams()
    expect([...searchParams.entries()]).toEqual([])
  })

  afterEach(() => {
    mockHeaders.mockReset()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })
})
