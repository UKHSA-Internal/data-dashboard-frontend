// eslint-disable-next-line no-restricted-imports
import { flag } from '@unleash/nextjs'
import assert from 'assert'

import { flags } from '@/app/constants/flags.constants'
import { logger } from '@/lib/logger'

import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '../constants/app.constants'
import { isSSR, isWellKnownEnvironment } from './app.utils'

type FeatureFlag = (typeof flags)[keyof typeof flags]

export async function getFeatureFlag(name: FeatureFlag) {
  try {
    assert(process.env.UNLEASH_SERVER_API_URL, 'Missing env var UNLEASH_SERVER_API_URL')
    assert(process.env.UNLEASH_SERVER_API_TOKEN, 'Missing env var UNLEASH_SERVER_API_TOKEN')
    assert(process.env.FEATURE_FLAGS_AUTH_KEY, 'Missing env var FEATURE_FLAGS_AUTH_KEY')

    const headers: HeadersInit = {
      'x-auth': process.env.FEATURE_FLAGS_AUTH_KEY,
    }

    // Send the local mock overrides with all requests
    if (!isWellKnownEnvironment() && isSSR) {
      // Import cookies dynamically only in node environment to not trigger nextjs warnings
      // TODO: Investigate the above. It means currently any client-side requests won't receive dynamically mocked responses
      const { cookies } = await import('next/headers')
      const cookieStore = await cookies()
      const switchBoardCookie = cookieStore.get(UKHSA_SWITCHBOARD_COOKIE_NAME)
      if (switchBoardCookie) {
        headers.cookie = switchBoardCookie.value
      }
    }

    return await flag(
      name,
      {},
      {
        fetchOptions: {
          headers,
          next: {
            revalidate: 0,
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
