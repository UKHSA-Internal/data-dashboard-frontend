// eslint-disable-next-line no-restricted-imports
import { flag } from '@unleash/nextjs'

import { flags } from '@/app/constants/flags.constants'
import { logger } from '@/lib/logger'

import { isWellKnownEnvironment } from './app.utils'
import { getFeatureFlag } from './flags.utils'

jest.mock('@unleash/nextjs', () => ({
  flag: jest.fn(),
}))

const mockIsSSR = jest.fn(() => false)

jest.mock('./app.utils', () => ({
  get isSSR() {
    return mockIsSSR()
  },
  isWellKnownEnvironment: jest.fn(),
}))

jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}))

const mockCookiesGet = jest.fn()
const mockCookies = jest.fn(() => ({
  get: mockCookiesGet,
}))

jest.mock('next/headers', () => ({
  cookies: () => mockCookies(),
}))

describe('flags.utils', () => {
  const mockFlag = flag as jest.MockedFunction<typeof flag>
  const mockIsWellKnownEnvironment = isWellKnownEnvironment as jest.MockedFunction<typeof isWellKnownEnvironment>

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.UNLEASH_SERVER_API_URL = 'https://unleash.example.com'
    process.env.UNLEASH_SERVER_API_TOKEN = 'test-token'
    process.env.FEATURE_FLAGS_AUTH_KEY = 'test-auth-key'
    mockIsWellKnownEnvironment.mockReturnValue(false)
    mockCookiesGet.mockReturnValue(null)
    mockIsSSR.mockReturnValue(false)
  })

  afterEach(() => {
    delete (process.env as any).UNLEASH_SERVER_API_URL
    delete (process.env as any).UNLEASH_SERVER_API_TOKEN
    delete (process.env as any).FEATURE_FLAGS_AUTH_KEY
    jest.restoreAllMocks()
  })

  test('calls flag with correct parameters when all env vars are set', async () => {
    mockFlag.mockResolvedValue({
      enabled: true,
      variant: {},
      error: null,
    })

    const flagName = flags.exampleFlag
    await getFeatureFlag(flagName)

    expect(mockFlag).toHaveBeenCalledWith(
      flagName,
      {},
      {
        fetchOptions: {
          headers: {
            'x-auth': 'test-auth-key',
          },
          next: {
            revalidate: 0,
          },
        },
      }
    )
  })

  test('returns error response when UNLEASH_SERVER_API_URL is missing', async () => {
    const originalUrl = process.env.UNLEASH_SERVER_API_URL
    delete (process.env as any).UNLEASH_SERVER_API_URL

    const result = await getFeatureFlag(flags.exampleFlag)

    expect(result.enabled).toBe(false)
    expect(result.variant).toEqual({})
    expect(result.error).toBeTruthy()
    expect(logger.error).toHaveBeenCalled()

    if (originalUrl) process.env.UNLEASH_SERVER_API_URL = originalUrl
  })

  test('returns error response when UNLEASH_SERVER_API_TOKEN is missing', async () => {
    const originalToken = process.env.UNLEASH_SERVER_API_TOKEN
    delete (process.env as any).UNLEASH_SERVER_API_TOKEN

    const result = await getFeatureFlag(flags.exampleFlag)

    expect(result.enabled).toBe(false)
    expect(result.variant).toEqual({})
    expect(result.error).toBeTruthy()
    expect(logger.error).toHaveBeenCalled()

    if (originalToken) process.env.UNLEASH_SERVER_API_TOKEN = originalToken
  })

  test('returns error response when FEATURE_FLAGS_AUTH_KEY is missing', async () => {
    const originalKey = process.env.FEATURE_FLAGS_AUTH_KEY
    delete (process.env as any).FEATURE_FLAGS_AUTH_KEY

    const result = await getFeatureFlag(flags.exampleFlag)

    expect(result.enabled).toBe(false)
    expect(result.variant).toEqual({})
    expect(result.error).toBeTruthy()
    expect(logger.error).toHaveBeenCalled()

    if (originalKey) process.env.FEATURE_FLAGS_AUTH_KEY = originalKey
  })

  test('includes switchboard cookie in headers when in SSR and not well-known environment', async () => {
    mockIsSSR.mockReturnValue(true)
    mockIsWellKnownEnvironment.mockReturnValue(false)
    mockFlag.mockResolvedValue({
      enabled: true,
      variant: {},
      error: null,
    })

    mockCookiesGet.mockReturnValue({
      value: 'switchboard-value',
    })

    await getFeatureFlag(flags.exampleFlag)

    expect(mockFlag).toHaveBeenCalled()
    const callArgs = mockFlag.mock.calls[0]
    expect(callArgs?.[2]?.fetchOptions?.headers).toHaveProperty('cookie')
  })

  test('does not include switchboard cookie when in well-known environment', async () => {
    mockIsSSR.mockReturnValue(true)
    mockIsWellKnownEnvironment.mockReturnValue(true)
    mockFlag.mockResolvedValue({
      enabled: true,
      variant: {},
      error: null,
    })

    await getFeatureFlag(flags.exampleFlag)

    expect(mockFlag).toHaveBeenCalledWith(
      expect.any(String),
      {},
      {
        fetchOptions: {
          headers: {
            'x-auth': 'test-auth-key',
          },
          next: {
            revalidate: 0,
          },
        },
      }
    )
  })

  test('handles flag function errors gracefully', async () => {
    mockCookiesGet.mockReturnValue(null)

    const error = new Error('Network error')
    mockFlag.mockRejectedValue(error)

    const result = await getFeatureFlag(flags.exampleFlag)

    expect(result).toEqual({
      enabled: false,
      variant: {},
      error: 'Network error',
    })
    expect(logger.error).toHaveBeenCalledWith(error)
  })

  test('handles non-Error exceptions', async () => {
    mockCookiesGet.mockReturnValue(null)

    mockFlag.mockRejectedValue('String error')

    const result = await getFeatureFlag(flags.exampleFlag)

    expect(result).toEqual({
      enabled: false,
      variant: {},
      error: 'Unknown error',
    })
    expect(logger.error).toHaveBeenCalledWith('String error')
  })
})
