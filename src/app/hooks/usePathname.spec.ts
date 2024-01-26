import { headers } from 'next/headers'

import { usePathname } from './usePathname'

jest.mock('next/headers')

describe('usePathname', () => {
  // Mock the headers function
  const mockHeaders = jest.fn()

  beforeAll(() => {
    ;(headers as jest.Mock).mockImplementation(() => ({
      get: mockHeaders,
    }))
  })

  test('should correctly extract pathname from x-url header', () => {
    mockHeaders.mockReturnValue('http://example.com/some/path?param=value')
    const pathname = usePathname()
    expect(pathname).toBe('/some/path')
  })

  test('should return an empty string if x-url header is absent', () => {
    mockHeaders.mockReturnValue(null)
    const pathname = usePathname()
    expect(pathname).toBe('')
  })

  afterEach(() => {
    mockHeaders.mockReset()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })
})
