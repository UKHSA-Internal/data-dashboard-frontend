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
  WhatsNewParent = 'whats_new.WhatsNewParentPage',
  WhatsNewChild = 'whats_new.WhatsNewChildEntry',
  MetricsParent = 'metrics.MetricsParentPage',
  MetricsChild = 'metrics.MetricsChildEntry',
}

const page = z.object({
  id: z.number(),
  title: z.string(),
  meta: z.object({
    type: z.string(),
    detail_url: z.string(),
    html_url: z.string().nullable(),
    slug: z.string(),
    show_in_menus: z.boolean(),
    first_published_at: z.string().nullable(),
  }),
})

export const responseSchema = z.object({
  items: z.array(page),
  meta: z.object({
    total_count: z.number(),
  }),
})

export type PagesResponse = z.infer<typeof responseSchema>

export const whatsNewResponseSchema = responseSchema.extend({
  items: z.array(
    page.extend({
      body: z.string(),
      date_posted: z.string(),
      additional_details: z.string(),
      badge: z.object({
        text: z.string(),
        colour: z.string().toLowerCase(),
      }),
    })
  ),
})

export const getPages = async (type?: PageType) => {
  const params = new URLSearchParams()
  if (type) params.set('type', type)
  try {
    const { data } = await client<PagesResponse>(`pages/?${params.toString()}`)
    logger.info(`GET success pages/?${params.toString()}`)
    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}

export type WhatsNewPagesResponse = z.infer<typeof whatsNewResponseSchema>

export const getWhatsNewPages = async () => {
  const params = new URLSearchParams()
  params.set('type', PageType.WhatsNewChild)
  params.set('fields', '*')
  try {
    const { data } = await client<WhatsNewPagesResponse>(`pages/?${params.toString()}`)
    logger.info(`GET success pages/?${params.toString()}`)
    return whatsNewResponseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return whatsNewResponseSchema.safeParse(error)
  }
}
