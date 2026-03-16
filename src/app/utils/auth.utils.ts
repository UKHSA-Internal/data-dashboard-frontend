export const getCognitoSignoutURL = (path?: string): string => {
  const getAuthApiBaseUrl = `${process.env.AUTH_DOMAIN ?? ''}`

  const redirectURL = path ? `${process.env.NEXTAUTH_URL + path}` : process.env.NEXTAUTH_URL

  const cognitoLogoutUrl = new URL(`${getAuthApiBaseUrl}/logout`)
  cognitoLogoutUrl.searchParams.set('client_id', process.env.AUTH_CLIENT_ID!)
  cognitoLogoutUrl.searchParams.set('logout_uri', redirectURL)

  return cognitoLogoutUrl.toString()
}
