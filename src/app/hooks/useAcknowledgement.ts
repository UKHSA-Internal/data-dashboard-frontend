'use server'

import { redirect } from 'next/navigation'

import { getSafeReturnPath } from '@/app/utils/acknowledgement.utils'
import { getCognitoSignoutURL } from '@/app/utils/auth.utils'
import { auth, signOut } from '@/auth'
import { auditLog, logger } from '@/lib/logger'

type FormState = {
  error?: string
  success?: boolean
}

export async function handleFormSubmit(_prevState: FormState, formData: FormData): Promise<FormState> {
  const action = formData.get('action')
  const session = await auth()

  if (action === 'disagreed') {
    if (session) {
      auditLog(session.userId ?? '', 'TERMS_OF_SERVICE_REFUSED')
    }

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

    if (session) {
      auditLog(session.userId ?? '', 'TERMS_OF_SERVICE_ACCEPTED')
    }

    redirect(getSafeReturnPath(typeof returnTo === 'string' ? returnTo : null))
  }

  return { error: 'Invalid action' }
}
