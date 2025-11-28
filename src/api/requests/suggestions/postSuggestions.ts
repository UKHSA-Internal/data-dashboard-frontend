import { z } from 'zod'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import { feedbackSchema } from '@/schemas/feedback.schema'

import { getFeedbackApiBaseUrl } from '../helpers'

export const requestSchema = feedbackSchema

export type RequestParams = z.infer<typeof requestSchema>

export const postSuggestions = async (suggestions: RequestParams) => {
  try {
    console.log(`Post Suggestions - Submitting post suggestions: ${JSON.stringify(suggestions)}`)
    logger.info(`Post Suggestions - Submitting post suggestions: ${JSON.stringify(suggestions)}`)
    const { status } = await client<Response>('suggestions/v2', {
      body: suggestions,
      baseUrl: getFeedbackApiBaseUrl(),
    })

    if (status !== 200) {
      console.log(`Post Suggestions Status Error: ${status}`)
      logger.info(`Post Suggestions Status Error: ${status}`)
      throw new Error('Failed to submit, invalid status code')
    }
    return { success: true }
  } catch (error) {
    console.log(`Post Suggestions Error: ${error}`)
    logger.info(`Post Suggestions Error: ${error}`)
    logger.error(error)
    return { success: false }
  }
}
