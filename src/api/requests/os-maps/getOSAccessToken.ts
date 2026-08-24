import { logger } from '@/lib/logger'

interface CachedToken {
  accessToken: string
  expiresAt: number
}

let cachedToken: CachedToken | null = null

export const resetOsAccessTokenCache = () => {
  cachedToken = null
}

export const getOSAccessToken = async (): Promise<string> => {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 15_000) {
    return cachedToken.accessToken
  }

  const projectApiKey = process.env.PROJECT_API_KEY
  const projectApiSecret = process.env.PROJECT_API_SECRET

  if (!projectApiKey || !projectApiSecret) {
    throw new Error('Missing PROJECT_API_KEY or PROJECT_API_SECRET')
  }

  const response = await fetch('https://api.os.uk/oauth2/token/v1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${projectApiKey}:${projectApiSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  })

  if (!response.ok) {
    logger.error('OS OAuth token request failed', { status: response.status })
    throw new Error('Failed to obtain OS access token')
  }

  const payload = (await response.json()) as { access_token?: string; expires_in?: number }

  if (!payload.access_token) {
    logger.error('OS OAuth token response was missing access_token')
    throw new Error('Failed to obtain OS access token')
  }

  cachedToken = {
    accessToken: payload.access_token,
    expiresAt: Date.now() + (payload.expires_in ?? 299) * 1000,
  }

  return cachedToken.accessToken
}
