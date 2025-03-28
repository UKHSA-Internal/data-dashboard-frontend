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
  const session = await auth()

  if (!session?.refreshToken) {
    logger.warn('No refresh token available during sign out')
    return nextAuthSignOut(options)
  }

  try {
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
      logger.error(`Error revoking token: ${JSON.stringify(errorData)}`)
    }
  } catch (error) {
    logger.error(`Error during token revocation: ${error instanceof Error ? error.message : String(error)}`)
  }

  // Always attempt to clear NextAuth session, regardless of token revocation success
  return nextAuthSignOut(options)
}
