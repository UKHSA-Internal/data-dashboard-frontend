import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

import { postSuggestions } from '@/api/requests/suggestions/postSuggestions'
import { logger } from '@/lib/logger'
import { feedbackSchema } from '@/schemas/feedback.schema'

export async function POST(req: NextRequest) {
  try {
    logger.info('Feedback: ', JSON.stringify(req))

    // Validate form request body
    const suggestions = await feedbackSchema.parseAsync(req.body)

    // Send results to the backend
    const { success } = await postSuggestions(suggestions)

    if (!success) {
      throw new Error('form submission to backend failed')
    }

    const url = req.nextUrl.clone()
    url.pathname = '/feedback/confirmation'

    return NextResponse.redirect(url, 302)
  } catch (error) {
    if (error instanceof ZodError) {
      const url = req.nextUrl.clone()
      url.pathname = '/feedback/confirmation'

      // For validation errors, we bypass the database insertion and just redirect
      // directly to the confirmation page to simulate a valid submission. This is to satisfy
      // business requirements of having the form completely optional but still submittable...
      return NextResponse.redirect(url, 302)
    }

    logger.error(error)

    const url = req.nextUrl.clone()
    url.pathname = '/feedback'
    url.searchParams.set('error', '1')

    // Anything else, we return an actual error to the ui
    return NextResponse.redirect(url, 302)
  }
}
