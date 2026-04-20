import { authEnabled } from '@/config/constants'

/**
 * Synthesize the isNonPublic flag from isPublic (CMS page property)
 * and the global authEnabled constant (whether this is the public or
 * non-public frontend application.
 */
export const getIsNonPublic = (isPublic: boolean): boolean => authEnabled === true && isPublic === false

export const getCognitoSignoutURL = (path?: string): string => {
  const getAuthApiBaseUrl = `${process.env.AUTH_DOMAIN ?? ''}`

  const redirectURL = path ? `${process.env.NEXTAUTH_URL + path}` : process.env.NEXTAUTH_URL

  const cognitoLogoutUrl = new URL(`${getAuthApiBaseUrl}/logout`)
  cognitoLogoutUrl.searchParams.set('client_id', process.env.AUTH_CLIENT_ID!)
  cognitoLogoutUrl.searchParams.set('logout_uri', redirectURL)

  return cognitoLogoutUrl.toString()
}
