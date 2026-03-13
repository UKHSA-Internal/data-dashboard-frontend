'use server'

import { redirect } from 'next/navigation'

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
    const cognitoLogoutUrl = getCognitoSignoutURL()
    redirect(cognitoLogoutUrl)
  }

  if (action === 'agree') {
    const agreedToTerms = formData.get('acknowledgement')

    if (!agreedToTerms) {
      return {
        error: formData.get('termsOfServiceError') as string,
      }
    }

    redirect('/')
  }

  return { error: 'Invalid action' }
}
