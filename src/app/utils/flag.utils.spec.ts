// eslint-disable-next-line no-restricted-imports
import { flag } from '@unleash/nextjs'
import { cookies } from 'next/headers'

import { logger } from '@/lib/logger'

import { isWellKnownEnvironment } from './app.utils'
import { getFeatureFlag } from './flags.utils'

jest.mock('@unleash/nextjs', () => ({
  flag: jest.fn(),
}))

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}))

jest.mock('@/lib/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
  },
}))

jest.mock('./app.utils', () => ({
  isSSR: true,
  isWellKnownEnvironment: jest.fn(() => true),
}))

describe('getFeatureFlag', () => {
  let originalEnv: NodeJS.ProcessEnv

  beforeEach(() => {
    jest.clearAllMocks()
    originalEnv = process.env
    process.env = {
      ...originalEnv,
      UNLEASH_SERVER_API_URL: 'your_unleash_server_api_url',
      UNLEASH_SERVER_API_TOKEN: 'your_unleash_server_api_token',
      FEATURE_FLAGS_AUTH_KEY: 'your_feature_flags_auth_key',
    }
    ;(isWellKnownEnvironment as jest.Mock).mockReturnValue(true)
    jest.mocked(cookies).mockResolvedValue({
      get: jest.fn().mockReturnValue(undefined),
    } as unknown as Awaited<ReturnType<typeof cookies>>)

    // Default flag mock return value
    jest.mocked(flag).mockResolvedValue({
      enabled: false,
      variant: {},
    })
  })

  afterEach(() => {
    process.env = originalEnv
  })

  test('should call the unleash flag function with our custom headers', async () => {
    const flagName = 'adverse-weather'

    await getFeatureFlag(flagName)

    expect(flag).toHaveBeenCalledWith(
      flagName,
      {},
      {
        fetchOptions: {
          headers: {
            'x-auth': process.env.FEATURE_FLAGS_AUTH_KEY,
          },
          next: { revalidate: 0 },
        },
      }
    )
  })

  test('should return flag response when flag request succeeds', async () => {
    const flagName = 'adverse-weather'

    const flagResponse = {
      enabled: true,
      variant: {},
    }

    jest.mocked(flag).mockResolvedValueOnce(flagResponse)

    const result = await getFeatureFlag(flagName)

    expect(result).toEqual(flagResponse)
  })

  test('should return error response when flag request fails', async () => {
    const flagName = 'adverse-weather'

    const errorMessage = 'Flag not found'

    jest.mocked(flag).mockRejectedValueOnce(new Error(errorMessage))

    const result = await getFeatureFlag(flagName)

    expect(logger.error).toHaveBeenCalledWith(new Error(errorMessage))
    expect(result.enabled).toBe(false)
    expect(result.variant).toEqual({})
    expect(result.error).toBe(errorMessage)
  })

  test('returns error response when required env vars are missing', async () => {
    process.env = { ...originalEnv, UNLEASH_SERVER_API_URL: '' }

    const result = await getFeatureFlag('adverse-weather')

    expect(logger.error).toHaveBeenCalled()
    expect(result.enabled).toBe(false)
    expect(result.variant).toEqual({})
    expect(result.error).toBeDefined()
  })

  test('includes switchboard cookie when SSR and not well known environment', async () => {
    ;(isWellKnownEnvironment as jest.Mock).mockReturnValue(false)
    const getMock = jest.fn().mockReturnValue({ value: 'switch-cookie' })
    jest.mocked(cookies).mockResolvedValue({ get: getMock } as unknown as Awaited<ReturnType<typeof cookies>>)

    await getFeatureFlag('adverse-weather')

    expect(cookies).toHaveBeenCalled()
    const [, , options] = jest.mocked(flag).mock.calls[0]
    expect(options?.fetchOptions?.headers).toMatchObject({
      'x-auth': process.env.FEATURE_FLAGS_AUTH_KEY,
      cookie: 'switch-cookie',
    })
  })

  test('does not set cookie header when switchboard cookie missing', async () => {
    ;(isWellKnownEnvironment as jest.Mock).mockReturnValue(false)
    const getMock = jest.fn().mockReturnValue(undefined)
    jest.mocked(cookies).mockResolvedValue({ get: getMock } as unknown as Awaited<ReturnType<typeof cookies>>)

    await getFeatureFlag('adverse-weather')

    const [, , options] = jest.mocked(flag).mock.calls[0]
    expect(options?.fetchOptions?.headers).toMatchObject({
      'x-auth': process.env.FEATURE_FLAGS_AUTH_KEY,
    })
    const headers = options?.fetchOptions?.headers as Record<string, string>
    expect(headers?.cookie).toBeUndefined()
  })
})
