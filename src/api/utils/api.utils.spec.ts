import { client } from './api.utils'

// --- Mocks ---

jest.mock('@/app/constants/app.constants', () => ({
  UKHSA_SWITCHBOARD_COOKIE_NAME: 'ukhsa-switchboard',
}))

jest.mock('@/app/utils/app.utils', () => ({
  isSSR: true,
  isWellKnownEnvironment: jest.fn(),
}))

jest.mock('@/config/constants', () => ({
  authEnabled: false,
  cacheFetchTags: { public: 'public' },
  ISRCachingEnabled: false,
  nonPublicCacheRevalidationInterval: 60,
  publicCacheRevalidationInterval: 300,
}))

jest.mock('../requests/helpers', () => ({
  getApiBaseUrl: jest.fn(() => 'http://localhost/mock-page/'),
}))

const { isWellKnownEnvironment } = require('@/app/utils/app.utils')

// Helper to create a mock Response
function mockResponse({
  ok = true,
  status = 200,
  statusText = 'OK',
  contentType = 'application/json',
  body = {},
}: {
  ok?: boolean
  status?: number
  statusText?: string
  contentType?: string
  body?: unknown
} = {}): Response {
  return {
    ok,
    status,
    statusText,
    headers: {
      get: (key: string) => (key === 'Content-Type' ? contentType : null),
    },
    json: jest.fn().mockResolvedValue(body),
    text: jest.fn().mockResolvedValue(typeof body === 'string' ? body : JSON.stringify(body)),
    arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
  } as unknown as Response
}

// --- Tests ---

describe('client()', () => {
  let mockFetch: jest.SpyInstance

  beforeEach(() => {
    // jest.spyOn binds to the same global.fetch reference the module uses at call time,
    // unlike `global.fetch = jest.fn()` which only replaces it after module load.
    mockFetch = jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse() as any)
    ;(isWellKnownEnvironment as jest.Mock).mockReturnValue(true)
    process.env.API_KEY = 'test-api-key'
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  // --- URL construction ---

  describe('URL construction', () => {
    it('builds the URL from baseUrl and endpoint', async () => {
      await client('v1/data')

      expect(mockFetch).toHaveBeenCalledWith('http://localhost/mock-page/v1/data', expect.any(Object))
    })

    it('appends searchParams to the URL', async () => {
      const params = new URLSearchParams({ foo: 'bar', baz: 'qux' })

      await client('v1/data', { searchParams: params })

      expect(mockFetch).toHaveBeenCalledWith('http://localhost/mock-page/v1/data?foo=bar&baz=qux', expect.any(Object))
    })

    it('uses a custom baseUrl when provided', async () => {
      await client('endpoint', { baseUrl: 'https://custom.api.com' })

      expect(mockFetch).toHaveBeenCalledWith('https://custom.api.com/endpoint', expect.any(Object))
    })

    it('handles an empty baseUrl gracefully', async () => {
      await client('endpoint', { baseUrl: '' })

      expect(mockFetch).toHaveBeenCalledWith('endpoint', expect.any(Object))
    })
  })

  // --- HTTP method ---

  describe('HTTP method', () => {
    it('uses GET when no body is provided', async () => {
      await client('v1/data')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'GET', body: undefined })
      )
    })

    it('uses POST when a body is provided', async () => {
      const payload = { key: 'value' }

      await client('v1/data', { body: payload })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'POST', body: JSON.stringify(payload) })
      )
    })
  })

  // --- Headers ---

  describe('headers', () => {
    it('sends the API_KEY as Authorization header', async () => {
      await client('v1/data')

      const [, options] = mockFetch.mock.calls[0]
      expect(options.headers).toMatchObject({ Authorization: 'test-api-key' })
    })

    it('merges custom headers with default headers', async () => {
      await client('v1/data', { headers: { 'X-Custom': 'yes' } })

      const [, options] = mockFetch.mock.calls[0]
      expect(options.headers).toMatchObject({
        'X-Custom': 'yes',
        'content-type': 'application/json',
      })
    })
  })

  // --- Response parsing ---

  describe('response parsing', () => {
    it('returns parsed JSON data on a successful JSON response', async () => {
      const responseBody = { id: 1, name: 'Test' }
      mockFetch.mockResolvedValue(mockResponse({ body: responseBody }) as any)

      const result = await client<typeof responseBody>('v1/data')

      expect(result).toMatchObject({ data: responseBody, status: 200 })
    })

    it('returns text data for non-JSON content types', async () => {
      const text = 'plain text response'
      mockFetch.mockResolvedValue(mockResponse({ contentType: 'text/plain', body: text }) as any)

      const result = await client<string>('v1/data')

      expect(result).toMatchObject({ data: text, status: 200 })
    })

    it('returns a Buffer for application/zip content type', async () => {
      mockFetch.mockResolvedValue(mockResponse({ contentType: 'application/zip' }) as any)

      const result = await client<Buffer>('v1/data')

      expect(result.data).toBeInstanceOf(Buffer)
      expect(result.status).toBe(200)
    })

    it('rejects when the response is not ok', async () => {
      mockFetch.mockResolvedValue(mockResponse({ ok: false, status: 404, statusText: 'Not Found' }) as any)

      await expect(client('v1/data')).rejects.toMatchObject({
        message: 'Not Found',
        code: 404,
      })
    })

    it('rejects when JSON parsing fails', async () => {
      const failingResponse = {
        ok: true,
        status: 200,
        headers: { get: () => 'application/json' },
        json: jest.fn().mockRejectedValue(new Error('invalid json')),
      } as unknown as Response
      mockFetch.mockResolvedValue(failingResponse as any)

      await expect(client('v1/data')).rejects.toBeDefined()
    })
  })

  // --- Caching ---

  describe('caching (next.revalidate)', () => {
    // No jest.resetModules() here — that was clearing the mock mid-suite
    it('sets revalidate to 0 when ISRCachingEnabled is false and authEnabled is false', async () => {
      await client('v1/data', { isPublic: true })

      const [, options] = mockFetch.mock.calls[0]
      expect(options.next.revalidate).toBe(0)
    })
  })

  // --- Switchboard cookie ---

  describe('switchboard cookie (non-well-known environments)', () => {
    it('attaches the switchboard cookie header when environment is not well-known and cookie exists', async () => {
      ;(isWellKnownEnvironment as jest.Mock).mockReturnValue(false)

      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: 'mock-cookie-value' }),
      }
      jest.doMock('next/headers', () => ({
        cookies: jest.fn().mockResolvedValue(mockCookieStore),
      }))

      await client('v1/data')

      const [, options] = mockFetch.mock.calls[0]
      expect(options.headers.cookie).toBe('mock-cookie-value')
    })

    it('does not attach cookie header when environment is well-known', async () => {
      ;(isWellKnownEnvironment as jest.Mock).mockReturnValue(true)

      await client('v1/data')

      const [, options] = mockFetch.mock.calls[0]
      expect(options.headers.cookie).toBeUndefined()
    })
  })

  // --- Auth token ---

  describe('auth token (non-public requests)', () => {
    it('does not fetch auth token for public requests', async () => {
      await client('v1/data', { isPublic: true })

      const [, options] = mockFetch.mock.calls[0]
      expect(options.headers.Authorization).toBe('test-api-key')
    })

    it('adds Bearer token for non-public requests when auth resolves a token', async () => {
      jest.doMock('@/auth', () => ({
        auth: jest.fn().mockResolvedValue({ accessToken: 'user-access-token' }),
      }))

      await client('v1/data', { isPublic: false })

      const [, options] = mockFetch.mock.calls[0]
      expect(options.headers.Authorization).toBe('Bearer user-access-token')
    })
  })
})
