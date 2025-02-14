import { auth, signOut as nextAuthSignOut } from '@/auth'
import { logger } from '@/lib/logger'

import { getAuthApiBaseUrl } from '../helpers'

export async function signOut() {
  try {
    const session = await auth()

    if (!session?.refreshToken) {
      return { error: 'No refresh token available' }
    }

    const revokeResponse = await fetch(`${getAuthApiBaseUrl()}/revoke`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${process.env.AUTH_CLIENT_ID}:${process.env.AUTH_CLIENT_SECRET}`).toString(
          'base64'
        )}`,
      },
      body: new URLSearchParams({
        token: session.refreshToken,
        token_type_hint: 'refresh_token',
        client_id: process.env.AUTH_CLIENT_ID!,
        client_secret: process.env.AUTH_CLIENT_SECRET!,
      }).toString(),
    })

    if (!revokeResponse.ok) {
      const errorData = await revokeResponse.json()
      logger.error('Error revoking token:', errorData)
      return { error: 'Failed to revoke token', details: errorData }
    }
  } catch (error) {
    logger.error('Unexpected error in revoke handler:', error)
  }

  await nextAuthSignOut()
}
