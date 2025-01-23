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

// Helper function to concatenate day, month, and year into a single date field
function updateMemorableDate(formData: FormData): FormData {
  const day = formData.get('enter_a_memorable_date-day')
  const month = formData.get('enter_a_memorable_date-month')
  const year = formData.get('enter_a_memorable_date-year')

  // If day, month, and year are all present, concatenate them into a single field
  if (day && month && year) {
    const memorableDate = `${day}-${month}-${year}`

    // Create a new FormData object based on the existing formData
    const updatedFormData = formData

    // Set the concatenated memorable date and remove the individual day, month, and year fields
    updatedFormData.set('enter_a_memorable_date', memorableDate)
    updatedFormData.delete('enter_a_memorable_date-day')
    updatedFormData.delete('enter_a_memorable_date-month')
    updatedFormData.delete('enter_a_memorable_date-year')

    return updatedFormData
  }

  // Return the formData as is if no date fields are provided
  return formData
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

    formData = updateMemorableDate(formData)

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
    throw error
  }
}
