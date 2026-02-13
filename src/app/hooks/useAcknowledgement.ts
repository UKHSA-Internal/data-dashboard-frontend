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
      // Instead of returning an error object, redirect to the same page
      // or handle the error differently (e.g., use cookies/searchParams)
      if (!agreedToTerms) {
        return {
          error: 'You must accept the terms and conditions to continue',
        }
      }
    }

    console.log('User agreed', agreedToTerms)
    redirect('/')
    return { success: true }
  }

  // Default return if no action matches
  return { error: 'Invalid action' }
}
