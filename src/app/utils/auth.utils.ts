import { authEnabled } from '@/config/constants'

/**
 * Synthesize the isNonPublic flag from isPublic (CMS page property)
 * and the global authEnabled constant (whether this is the public or
 * non-public frontend application).
 */
export function getIsNonPublic(isPublic?: boolean): boolean {
  // Be defensive: Rather have it non-public
  if (isPublic === undefined || isPublic === null) {
    return true
  }

  return authEnabled && !isPublic
}

/**
 * Generate the Cognito logout URL with query parameters for client_id and logout_uri.
 */
export const getCognitoSignoutURL = (path?: string): string => {
  const getAuthApiBaseUrl = `${process.env.AUTH_DOMAIN ?? ''}`

  const redirectURL = path ? `${process.env.NEXTAUTH_URL + path}` : process.env.NEXTAUTH_URL

  const cognitoLogoutUrl = new URL(`${getAuthApiBaseUrl}/logout`)
  cognitoLogoutUrl.searchParams.set('client_id', process.env.AUTH_CLIENT_ID!)
  cognitoLogoutUrl.searchParams.set('logout_uri', redirectURL)

  return cognitoLogoutUrl.toString()
}
