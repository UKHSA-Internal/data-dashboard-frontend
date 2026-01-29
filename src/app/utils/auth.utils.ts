export const getCognitoSignoutURL: () => string = () => {
  const getAuthApiBaseUrl = `${process.env.AUTH_DOMAIN ?? ''}`

  const cognitoLogoutUrl = new URL(`${getAuthApiBaseUrl}/logout`)
  cognitoLogoutUrl.searchParams.set('client_id', process.env.AUTH_CLIENT_ID!)
  cognitoLogoutUrl.searchParams.set('logout_uri', process.env.NEXTAUTH_URL)

  return cognitoLogoutUrl.toString()
}
