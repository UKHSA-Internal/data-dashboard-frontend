/**
 * Sign out function that attempts to properly revoke Cognito tokens before clearing NextAuth session.
 *
 * The purpose is to ensure that:
 * 1. The refresh & access tokens are revoked in Cognito first
 * 2. Then the NextAuth session is cleared
 *
 * This should force subsequent logins to always show the login form, as the tokens
 * will be invalidated in Cognito.
 *
 * TODO: Currently, this is not working as expected. Even after revoking the tokens,
 * subsequent logins sometimes skip the login form. This needs investigation to understand
 * why Cognito is still maintaining a valid session despite token revocation.
 */

import { auth, signOut as nextAuthSignOut } from '@/auth'
import { logger } from '@/lib/logger'

import { getAuthApiBaseUrl } from '../helpers'

export async function signOut(options?: { redirectTo?: string; redirect?: true }) {
  try {
    const session = await auth()

    if (!session?.refreshToken) {
      logger.warn('No refresh token available during sign out')
      await nextAuthSignOut(options)
      return
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
      throw new Error('Failed to revoke token')
    }

    // Only proceed with NextAuth sign out if token revocation was successful
    await nextAuthSignOut(options)
  } catch (error) {
    logger.error('Error during sign out:', error)
    // Even if there's an error, try to clear the NextAuth session
    await nextAuthSignOut(options)
  }
}
