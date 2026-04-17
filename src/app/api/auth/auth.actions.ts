/**
 *
 * @description Server action to sign out the user. It calls the signOut API route and then redirects the user to the Cognito logout URL.
 * @returns {Promise<void>} - A promise that resolves when the user is signed out and redirected.
 */

'use server'

import { redirect } from 'next/navigation'

import { signOut } from '@/api/requests/auth/signOut'
import { getCognitoSignoutURL } from '@/app/utils/auth.utils'
import { logger } from '@/lib/logger'

export async function serverSignOut() {
  try {
    await signOut()
  } catch {
    logger.error('issue calling signout.')
  }
  const cognitoLogoutUrl = getCognitoSignoutURL('/start')
  redirect(cognitoLogoutUrl)
}
