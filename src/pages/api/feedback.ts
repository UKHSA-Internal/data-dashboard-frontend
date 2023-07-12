import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'

import { postSuggestions } from '@/api/requests/suggestions/postSuggestions'
import { logger } from '@/lib/logger'
import { feedbackSchema } from '@/schemas/feedback.schema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      throw new Error(`Unsupported request method ${req.method}`)
    }

    // Validate form request body
    const suggestions = await feedbackSchema.parseAsync(req.body)

    // Send results to the backend
    const { success } = await postSuggestions(suggestions)

    if (!success) {
      throw new Error('form submission to backend failed')
    }

    return res.redirect(302, '/feedback/confirmation')
  } catch (error) {
    if (error instanceof ZodError) {
      // For validation errors, we bypass the database insertion and just redirect
      // directly to the confirmation page to simulate a valid submission. This is to satisfy
      // business requirements of having the form completely optional but still submittable...
      return res.redirect(302, '/feedback/confirmation')
    }

    logger.error(error)

    // Anything else, we return an actual error to the ui
    return res.redirect(302, '/feedback/?error=1')
  }
}
