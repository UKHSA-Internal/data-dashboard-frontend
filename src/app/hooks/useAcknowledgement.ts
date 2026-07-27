'use server'

import { redirect } from 'next/navigation'

import { getSafeReturnPath } from '@/app/utils/acknowledgement.utils'
import { getCognitoSignoutURL } from '@/app/utils/auth.utils'
import { signOut } from '@/auth'
import { logger } from '@/lib/logger'

type FormState = {
  error?: string
  success?: boolean
}

export async function handleFormSubmit(_prevState: FormState, formData: FormData): Promise<FormState> {
  const action = formData.get('action')

  if (action === 'disagreed') {
    try {
      await signOut({ redirect: false })
    } catch {
      logger.error('issue calling authJS signout.')
    }
    const cognitoLogoutUrl = getCognitoSignoutURL('/start')
    redirect(cognitoLogoutUrl)
  }

  if (action === 'agree') {
    const agreedToTerms = formData.get('acknowledgement')
    const returnTo = formData.get('returnTo')

    if (!agreedToTerms) {
      return {
        error: formData.get('termsOfServiceError') as string,
      }
    }

    redirect(getSafeReturnPath(typeof returnTo === 'string' ? returnTo : null))
  }

  return { error: 'Invalid action' }
}
