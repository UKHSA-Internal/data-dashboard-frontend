import { type JWT } from 'next-auth/jwt'

import { logger } from '@/lib/logger'

import { getAuthApiBaseUrl } from '../helpers'

let isRefreshing = false

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  if (isRefreshing) {
    console.log('🔁 Already refreshing; returning existing token.')
    return token
  }

  const timeInSeconds = Math.floor(Date.now() / 1000)
  isRefreshing = true

  try {
    console.log('🔄 Refreshing access token via endpoint:', `${process.env.AUTH_DOMAIN}/oauth2/token`)

    if (!token.refresh_token) return token

    // Log current token expiry (human-readable)
    if (token.expires_at) {
      console.log(
        `🕗 Current token expiry: ${token.expires_at} (unix:seconds) =>`,
        new Date(token.expires_at * 1000).toUTCString()
      )
    }

    const response = await fetch(`${getAuthApiBaseUrl()}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.AUTH_CLIENT_ID!,
        client_secret: process.env.AUTH_CLIENT_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
      }),
    })

    const tokensOrError = await response.json()
    if (!response.ok) {
      logger.error('Error response from token endpoint: ', tokensOrError)
      throw new Error(`Token refresh failed with status: ${response.status}`)
    }

    // Calculate new expiry in seconds
    const newExpiresAt = tokensOrError?.expires_in + timeInSeconds
    console.log(
      '🕗 New expires_in:',
      tokensOrError?.expires_in,
      'seconds => newExpiresAt:',
      newExpiresAt,
      '=>',
      new Date(newExpiresAt * 1000).toUTCString()
    )

    const newToken: JWT = {
      ...token,
      access_token: tokensOrError?.access_token ?? token?.access_token,
      expires_at: newExpiresAt,
      refresh_token: tokensOrError?.refresh_token ?? token?.refresh_token,
    }

    console.log('✅ Token refreshed successfully!', {
      old_exp: token.expires_at,
      old_exp_readable: token.expires_at ? new Date(token.expires_at * 1000).toUTCString() : undefined,
      new_exp: newToken.expires_at,
      new_exp_readable: newToken.expires_at ? new Date(newToken.expires_at * 1000).toUTCString() : undefined,
    })

    return newToken
  } catch (error) {
    logger.error('Error refreshing token in middleware:', error instanceof Error ? error.message : error)
  } finally {
    isRefreshing = false
  }

  // If something goes wrong, return the old token so we at least have something
  return token
}
