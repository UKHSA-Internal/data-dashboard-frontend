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

  if (action === 'disagree') {
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
      if (!agreedToTerms) {
        return {
          error: 'You must accept the terms and conditions to continue',
        }
      }
    }

    redirect('/')
    return { success: true }
  }

  return { error: 'Invalid action' }
}
