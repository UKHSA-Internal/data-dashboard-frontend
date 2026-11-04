'use server'

import { redirect } from 'next/navigation'

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

    if (!agreedToTerms) {
      return {
        error: formData.get('termsOfServiceError') as string,
      }
    }

    if (session) {
      auditLog(session.userId ?? '', 'TERMS_OF_SERVICE_ACCEPTED')
    }

    redirect('/')
  }

  return { error: 'Invalid action' }
}
