import { z } from 'zod'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import { feedbackSchema } from '@/schemas/feedback.schema'

import { getFeedbackApiBaseUrl } from '../helpers'

export const requestSchema = feedbackSchema

export type RequestParams = z.infer<typeof requestSchema>

export const postSuggestions = async (suggestions: RequestParams) => {
  try {
    const { status } = await client<Response>('suggestions/v1', {
      body: JSON.stringify(suggestions),
      baseUrl: getFeedbackApiBaseUrl(),
    })
    if (status !== 200) {
      throw new Error('Failed to submit, invalid status code')
    }
    return { success: true }
  } catch (error) {
    logger.error(error)
    return { success: false }
  }
}
