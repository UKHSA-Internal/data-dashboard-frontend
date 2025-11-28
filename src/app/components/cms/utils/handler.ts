'use server'

import { redirect } from 'next/navigation'

import { postSuggestions } from '@/api/requests/suggestions/postSuggestions'
import { logger } from '@/lib/logger'
import { feedbackSchema } from '@/schemas/feedback.schema'

interface FormError {
  message: string
  errors: FieldError[]
}

export interface FormFields {
  id: number
  meta: { type: 'forms.FormField' }
  clean_name: string
  label: string
  field_type: string
  help_text: string
  required: boolean
  choices: string
  default_value: string
}

interface FieldError {
  clean_name: string
  label: string
}

export async function handler(formFields: FormFields[], prevState: FormError, formData: FormData) {
  try {
    const requiredFields: FieldError[] = []
    const errors: FieldError[] = []
    let isEmptySubmission = false

    // Validate form request body
    //for each form field identify fields that are required
    formFields.map(({ clean_name: cleanName, label, required }) => {
      required ? requiredFields.push({ clean_name: cleanName, label: label }) : null
    })

    // For each required field ensure that the value entered into the form is valid if it is not then add the field name to the errors array
    requiredFields.map((requiredField) => {
      const fieldValue = formData.get(requiredField.clean_name)

      if (fieldValue) {
        fieldValue.toString().length > 0 ? null : errors.push(requiredField)
      } else {
        errors.push(requiredField)
      }
    })

    //if there are errors then return errors to the front end
    if (errors.length > 0) {
      return {
        message: 'Errors have been identified in the form',
        errors: errors,
      }
    }

    const validatedFields = await feedbackSchema.safeParse(Object.fromEntries(formData))

    if (!validatedFields.success) {
      // For validation errors, we bypass the database insertion and just redirect
      // directly to the confirmation page to simulate a valid submission. This is to satisfy
      // business requirements of having the form completely optional but still submittable...
      logger.error('Feedback form validation failed, redirecting to confirmation anyway...')

      redirect('/feedback/confirmation')
    }

    if (requiredFields.length === 0 && errors.length === 0) {
      isEmptySubmission = Array.from(formData.values()).every((value) => value === '')
    }

    if (isEmptySubmission) {
      logger.info(`Empty feedback form submitted, redirecting to confirmation and skipping api request`)
      redirect('/feedback/confirmation')
    } else {
      console.log('Feedback Handler: submitting feedback')
      logger.info(`Feedback submitted successfully, redirecting to confirmation`)

      const { success } = await postSuggestions(validatedFields.data)

      if (!success) {
        return {
          message: 'Unknown error',
          errors: [],
        }
      }

      redirect('/feedback/confirmation')
    }

    // errors - return errors
  } catch (error) {
    console.log(`Feedback Handler - submitting feedback error: ${error}`)
    throw error
  }
}
