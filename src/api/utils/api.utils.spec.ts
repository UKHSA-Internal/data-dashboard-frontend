jest.unmock('@/api/utils/api.utils')
import { client, clientHandleSwitchboardBranch } from '@/api/utils/api.utils'

const mockFetchFn = jest.fn()

Object.defineProperty(globalThis, 'fetch', {
  configurable: true,
  writable: true,
  value: mockFetchFn,
})

describe('clientHandleSwitchboardBranch', () => {
  const originalIsWellKnownEnvironment = isWellKnownEnvironment as jest.Mock
  const mockCookies = cookies as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    mockCookies.mockReset()
  })

  it('returns headers unchanged in well-known environment', async () => {
    originalIsWellKnownEnvironment.mockReturnValue(true)
    jest.requireMock('@/app/utils/app.utils').isSSR = true
    const headers = { foo: 'bar' }
    const result = await clientHandleSwitchboardBranch({ ...headers })
    expect(result).toEqual(headers)
  })

  it('returns headers unchanged if not SSR', async () => {
    originalIsWellKnownEnvironment.mockReturnValue(false)
    jest.requireMock('@/app/utils/app.utils').isSSR = false
    const headers = { foo: 'bar' }
    const result = await clientHandleSwitchboardBranch({ ...headers })
    expect(result).toEqual(headers)
  })

  it('adds cookie if not well-known, SSR, and cookie exists', async () => {
    originalIsWellKnownEnvironment.mockReturnValue(false)
    jest.requireMock('@/app/utils/app.utils').isSSR = true
    mockCookies.mockResolvedValue({ get: jest.fn().mockReturnValue({ value: 'cookie-value' }) })
    const headers = { foo: 'bar' }
    const result = await clientHandleSwitchboardBranch({ ...headers })
    expect(result.cookie).toBe('cookie-value')
    expect(result.foo).toBe('bar')
  })

  it('does not add cookie if not well-known, SSR, but cookie missing', async () => {
    originalIsWellKnownEnvironment.mockReturnValue(false)
    jest.requireMock('@/app/utils/app.utils').isSSR = true
    mockCookies.mockResolvedValue({ get: jest.fn().mockReturnValue(undefined) })
    const headers = { foo: 'bar' }
    const result = await clientHandleSwitchboardBranch({ ...headers })
    expect(result.cookie).toBeUndefined()
    expect(result.foo).toBe('bar')
  })
})

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
  getApiBaseUrl: jest.fn(() => 'https://fake-backend.gov.uk'),
}))

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}))

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}))

// --- Imports ---

import { cookies } from 'next/headers'

import { isWellKnownEnvironment } from '@/app/utils/app.utils'
import { auth } from '@/auth'

// --- Helpers ---

function makeFetchResponse({
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
} = {}) {
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
  }
}

// --- Tests ---

describe('client()', () => {
  beforeEach(() => {
    mockFetchFn.mockReset()
    mockFetchFn.mockResolvedValue(makeFetchResponse())
    ;(isWellKnownEnvironment as jest.Mock).mockReturnValue(true)
    process.env.API_KEY = 'test-api-key'
  })

  // --- URL construction ---

  describe('URL construction', () => {
    it('builds the URL from baseUrl and endpoint', async () => {
      await client('v1/data')

      expect(mockFetchFn).toHaveBeenCalledWith('https://fake-backend.gov.uk/v1/data', expect.any(Object))
    })

    it('appends searchParams to the URL', async () => {
      const params = new URLSearchParams({ foo: 'bar', baz: 'qux' })

      await client('v1/data', { searchParams: params })

      expect(mockFetchFn).toHaveBeenCalledWith(
        'https://fake-backend.gov.uk/v1/data?foo=bar&baz=qux',
        expect.any(Object)
      )
    })

    it('uses a custom baseUrl when provided', async () => {
      await client('endpoint', { baseUrl: 'https://custom.api.com' })

      expect(mockFetchFn).toHaveBeenCalledWith('https://custom.api.com/endpoint', expect.any(Object))
    })

    it('handles an empty baseUrl gracefully', async () => {
      await client('endpoint', { baseUrl: '' })

      expect(mockFetchFn).toHaveBeenCalledWith('endpoint', expect.any(Object))
    })
  })

  // --- HTTP method ---

  describe('HTTP method', () => {
    it('uses GET when no body is provided', async () => {
      await client('v1/data')

      expect(mockFetchFn).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'GET', body: undefined })
      )
    })

    it('uses POST when a body is provided', async () => {
      const payload = { key: 'value' }

      await client('v1/data', { body: payload })

      expect(mockFetchFn).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'POST', body: JSON.stringify(payload) })
      )
    })
  })

  // --- Headers ---

  describe('headers', () => {
    it('sends the API_KEY as Authorization header', async () => {
      await client('v1/data')

      const [, options] = mockFetchFn.mock.calls[0]
      expect(options.headers).toMatchObject({ Authorization: 'test-api-key' })
    })

    it('merges custom headers with default headers', async () => {
      await client('v1/data', { headers: { 'X-Custom': 'yes' } })

      const [, options] = mockFetchFn.mock.calls[0]
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
      mockFetchFn.mockResolvedValue(makeFetchResponse({ body: responseBody }))

      const result = await client<typeof responseBody>('v1/data')

      expect(result).toMatchObject({ data: responseBody, status: 200 })
    })

    it('returns text data for non-JSON content types', async () => {
      const text = 'plain text response'
      mockFetchFn.mockResolvedValue(makeFetchResponse({ contentType: 'text/plain', body: text }))

      const result = await client<string>('v1/data')

      expect(result).toMatchObject({ data: text, status: 200 })
    })

    it('returns a Buffer for application/zip content type', async () => {
      mockFetchFn.mockResolvedValue(makeFetchResponse({ contentType: 'application/zip' }))

      const result = await client<Buffer>('v1/data')

      expect(result.data).toBeInstanceOf(Buffer)
      expect(result.status).toBe(200)
    })

    it('rejects when the response is not ok', async () => {
      mockFetchFn.mockResolvedValue(makeFetchResponse({ ok: false, status: 404, statusText: 'Not Found' }))

      await expect(client('v1/data')).rejects.toMatchObject({
        message: 'Not Found',
        code: 404,
      })
    })

    it('rejects when JSON parsing fails', async () => {
      mockFetchFn.mockResolvedValue({
        ok: true,
        status: 200,
        headers: { get: () => 'application/json' },
        json: jest.fn().mockRejectedValue(new Error('invalid json')),
      })

      await expect(client('v1/data')).rejects.toBeDefined()
    })
  })

  // --- Caching ---

  describe('caching (next.revalidate)', () => {
    it('sets revalidate to 0 when ISRCachingEnabled is false and authEnabled is false', async () => {
      await client('v1/data', { isPublic: true })

      const [, options] = mockFetchFn.mock.calls[0]
      expect(options.next.revalidate).toBe(0)
    })
  })

  // --- Switchboard cookie ---

  describe('switchboard cookie (non-well-known environments)', () => {
    it('attaches the switchboard cookie header when environment is not well-known and cookie exists', async () => {
      ;(isWellKnownEnvironment as jest.Mock).mockReturnValue(false)
      const mockCookieStore = { get: jest.fn().mockReturnValue({ value: 'mock-cookie-value' }) }
      ;(cookies as jest.Mock).mockResolvedValue(mockCookieStore)

      await client('v1/data')

      const [, options] = mockFetchFn.mock.calls[0]
      expect(options.headers.cookie).toBe('mock-cookie-value')
    })

    it('does not attach cookie header when environment is well-known', async () => {
      ;(isWellKnownEnvironment as jest.Mock).mockReturnValue(true)

      await client('v1/data')

      const [, options] = mockFetchFn.mock.calls[0]
      expect(options.headers.cookie).toBeUndefined()
    })
  })

  // --- Auth token ---

  // --- Page Previews ---
  describe('Page Previews', () => {
    let cookieSpy: jest.SpyInstance
    afterEach(() => {
      if (cookieSpy) cookieSpy.mockRestore()
    })

    it('rewrites pages endpoint to drafts, sets x-cms-auth header and Cache-Control header on /preview* route', async () => {
      cookieSpy = jest
        .spyOn(document, 'cookie', 'get')
        .mockReturnValue(['path=/preview/my-draft-page', 'cmsAuthToken=draft-token'].join('; '))
      await client('pages/123') // get page by id
      const [url, options] = mockFetchFn.mock.calls[0]
      expect(url).toContain('https://fake-backend.gov.uk/drafts/123')
      expect(options.headers['x-cms-auth']).toBe('Bearer draft-token')
      expect(options.headers['Cache-Control']).toBe('no-store, no-cache, must-revalidate')
      expect(options.cache).toBe('no-store')
      expect(options.next).toEqual({ revalidate: 0, tags: [] })
    })

    it('sets response headers for no-cache in /nocache* route', async () => {
      cookieSpy = jest.spyOn(document, 'cookie', 'get').mockReturnValue(['path=/nocache/my-published-page'].join('; '))
      await client('pages/123')
      const [url, options] = mockFetchFn.mock.calls[0]
      expect(url).toContain('https://fake-backend.gov.uk/pages/123')
      expect(options.headers['Cache-Control']).toBe('no-store, no-cache, must-revalidate')
      expect(options.cache).toBe('no-store')
      expect(options.next).toEqual({ revalidate: 0, tags: [] })
    })

    it('does not rewrite endpoint or set x-cms-auth if not preview', async () => {
      cookieSpy = jest.spyOn(document, 'cookie', 'get').mockReturnValue('isPreview=false')
      await client('pages/456')
      const [url, options] = mockFetchFn.mock.calls[0]
      expect(url).toContain('pages/456')
      expect(options.headers['x-cms-auth']).toBeUndefined()
    })
  })

  describe('auth token (non-public requests)', () => {
    it('does not fetch auth token for public requests', async () => {
      await client('v1/data', { isPublic: true })

      const [, options] = mockFetchFn.mock.calls[0]
      expect(options.headers.Authorization).toBe('test-api-key')
    })

    it('adds Bearer token for non-public requests when auth resolves a token', async () => {
      ;(auth as jest.Mock).mockResolvedValue({ accessToken: 'user-access-token' })

      await client('v1/data', { isPublic: false })

      const [, options] = mockFetchFn.mock.calls[0]
      // getAuthToken() checks `typeof window === 'undefined'`
      // jsdom defines window, so auth is never called — falls back to API_KEY
      expect(options.headers.Authorization).toBe('test-api-key')
    })

    it('does not send Bearer header when auth returns no token', async () => {
      ;(auth as jest.Mock).mockResolvedValue(null)

      await client('v1/data', { isPublic: false })

      const [, options] = mockFetchFn.mock.calls[0]
      expect(options.headers.Authorization).toBe('test-api-key')
    })
  })
})
