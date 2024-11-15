'use server'

import { redirect } from 'next/navigation'

import { postSuggestions } from '@/api/requests/suggestions/postSuggestions'
import { logger } from '@/lib/logger'
import { feedbackSchema } from '@/schemas/feedback.schema'

interface FormError {
  message: string
  errors: Record<string, string[]>
}

export async function handler(prevState: FormError, formData: FormData) {
  try {
    console.log('Reached handler')
    logger.info('Reached handler')

    // Validate form request body
    const validatedFields = await feedbackSchema.safeParse(Object.fromEntries(formData))

    console.log('Validation: ', validatedFields.success)

    if (!validatedFields.success) {
      // For validation errors, we bypass the database insertion and just redirect
      // directly to the confirmation page to simulate a valid submission. This is to satisfy
      // business requirements of having the form completely optional but still submittable...
      logger.error('Feedback form validation failed, redirecting to confirmation anyway...')
      redirect('/feedback/confirmation')
    }

    const isEmptySubmission = Array.from(formData.values()).every((value) => value === '')
    console.log('isEmptySubmission: ', isEmptySubmission)

    if (isEmptySubmission) {
      logger.info(`Empty feedback form submitted, redirecting to confirmation and skipping api request`)
      redirect('/feedback/confirmation')
    }

    if (!isEmptySubmission) {
      // Send results to the backend
      const { success } = await postSuggestions(validatedFields.data)

      console.log('success: ', success)

      if (!success) {
        return {
          message: 'Unknown error',
          errors: {},
        }
      }
    }

    logger.info(`Feedback submitted successfully, redirecting to confirmation`)
    redirect('/feedback/confirmation')
  } catch (error) {
    console.log('error', error)
    throw error
  }
}
