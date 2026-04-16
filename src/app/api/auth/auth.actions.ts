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
