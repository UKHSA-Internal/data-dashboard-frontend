// eslint-disable-next-line no-restricted-imports
import { flag } from '@unleash/nextjs'
import assert from 'assert'

import { flags } from '@/app/constants/flags.constants'
import { logger } from '@/lib/logger'

type FeatureFlag = (typeof flags)[keyof typeof flags]

export async function getFeatureFlag(name: FeatureFlag) {
  try {
    assert(process.env.UNLEASH_SERVER_API_URL, 'Missing env var UNLEASH_SERVER_API_URL')
    assert(process.env.UNLEASH_SERVER_API_TOKEN, 'Missing env var UNLEASH_SERVER_API_TOKEN')
    assert(process.env.FEATURE_FLAGS_AUTH_KEY, 'Missing env var FEATURE_FLAGS_AUTH_KEY')

    return await flag(
      name,
      {},
      {
        fetchOptions: {
          headers: {
            'x-auth': process.env.FEATURE_FLAGS_AUTH_KEY,
          },
        },
      }
    )
  } catch (error) {
    logger.error(error)

    const message = error instanceof Error ? error.message : 'Unknown error'

    const errorResponse: Awaited<ReturnType<typeof flag>> = {
      enabled: false,
      variant: {},
      error: message,
    }

    return errorResponse
  }
}
