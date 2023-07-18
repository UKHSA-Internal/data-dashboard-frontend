import { z } from 'zod'

import { client } from '@/api/api-utils'
import { logger } from '@/lib/logger'

/**
 * CMS Pages endpoint
 */

export enum PageType {
  Home = 'home.HomePage',
  Common = 'common.CommonPage',
  Topic = 'topic.TopicPage',
}

export type PagesResponse = z.infer<typeof responseSchema>

export const responseSchema = z.object({
  items: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      meta: z.object({
        type: z.string(),
        detail_url: z.string(),
        html_url: z.string().nullable(),
        slug: z.string(),
        first_published_at: z.string().nullable(),
      }),
    })
  ),
  meta: z.object({
    total_count: z.number(),
  }),
})

export const getPages = async (type: PageType) => {
  try {
    const { data } = await client<PagesResponse>(`pages/?type=${type}`)
    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
