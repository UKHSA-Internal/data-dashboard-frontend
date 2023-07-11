import { z } from 'zod'

import { api } from '@/api/api-utils'
import { logger } from '@/lib/logger'
import { feedbackSchema } from '@/schemas/feedback.schema'

import { getApiBaseUrl } from '../helpers'

export const requestSchema = feedbackSchema

type RequestParams = z.infer<typeof requestSchema>

export const postSuggestions = async (suggestions: RequestParams) => {
  try {
    const { status } = await api.post<Response>(`${getApiBaseUrl()}/suggestions/v1`, suggestions)
    if (status !== 200) {
      throw new Error('Failed to submit, invalid status code')
    }
    return { success: true }
  } catch (error) {
    logger.error(error)
    return { success: false }
  }
}
