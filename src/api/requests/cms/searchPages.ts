import { z } from 'zod'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

export const searchResult = z.object({
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

export const searchResultSchema = z.object({
  items: z.array(searchResult),
  meta: z.object({
    total_count: z.number(),
  }),
})

export type SearchResponse = z.infer<typeof searchResultSchema>

export const searchPages = async ({ search }: { search: string }) => {
  try {
    // First request to get total count and initial items
    const searchParams = new URLSearchParams()
    searchParams.set('fields', 'title')
    searchParams.set('offset', '0')
    searchParams.set('search', search)

    const { data } = await client<SearchResponse>(`proxy/pages/search`, { searchParams })
    const result = searchResultSchema.safeParse(data)

    if (!result.success) {
      logger.error('Search Zod Valibdation error: ', result, data)
    }

    return result
  } catch (error) {
    logger.error(error)
    return searchResultSchema.safeParse(error)
  }
}
