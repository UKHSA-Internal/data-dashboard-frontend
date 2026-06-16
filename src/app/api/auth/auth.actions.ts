/**
 * Server action to sign out the user. Revokes the session token,
 * clears the NextAuth session, and redirects to the Cognito logout URL.
 */

'use server'

import { redirect } from 'next/navigation'

import { signOut } from '@/api/requests/auth/signOut'
import { getCognitoSignoutURL } from '@/app/utils/auth.utils'
import { logger } from '@/lib/logger'

export async function serverSignOut(redirectRoute?: string) {
  const route = redirectRoute ? redirectRoute : '/start'
  try {
    await signOut({ redirectRoute: route })
  } catch {
    logger.error('issue calling signout.')
  }
  const cognitoLogoutUrl = getCognitoSignoutURL(route)
  redirect(cognitoLogoutUrl)
}
