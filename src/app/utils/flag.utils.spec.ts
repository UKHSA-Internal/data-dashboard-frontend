// eslint-disable-next-line no-restricted-imports
import { flag } from '@unleash/nextjs'

import { logger } from '@/lib/logger'

import { getFeatureFlag } from './flags.utils'

jest.mock('@unleash/nextjs', () => ({
  flag: jest.fn(),
}))

jest.mock('@/lib/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
  },
}))

describe('getFeatureFlag', () => {
  let originalEnv: NodeJS.ProcessEnv

  beforeEach(() => {
    originalEnv = process.env
    process.env = {
      ...originalEnv,
      UNLEASH_SERVER_API_URL: 'your_unleash_server_api_url',
      UNLEASH_SERVER_API_TOKEN: 'your_unleash_server_api_token',
      FEATURE_FLAGS_AUTH_KEY: 'your_feature_flags_auth_key',
    }
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
})
