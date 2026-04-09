import { z } from 'zod'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

export const searchResultSchema = z.object({
  title: z.string(),
  sub_title: z.string().optional().nullable(),
  meta: z.object({
    type: z.string(),
    detail_url: z.string(),
    html_url: z.string().nullable(),
    slug: z.string(),
    search_description: z.string().optional(),
  }),
})

export const searchResultsSchema = z.object({
  items: z.array(searchResultSchema),
  meta: z.object({
    total_count: z.number(),
  }),
})

export type SearchResponse = z.infer<typeof searchResultsSchema>

export const searchPages = async ({ limit, search }: { limit: string; search: string }) => {
  try {
    const searchParams = new URLSearchParams()
    searchParams.set('fields', 'title')
    searchParams.set('limit', limit)
    searchParams.set('offset', '0')
    searchParams.set('search', search)

    const { data } = await client<SearchResponse>(`proxy/pages/search`, { searchParams })
    const result = searchResultsSchema.safeParse(data)

    if (!result.success) {
      logger.error('Search Zod Validation error: ', result, data)
    }

    return result
  } catch (error) {
    logger.error(error)
    return searchResultsSchema.safeParse(error)
  }
}
