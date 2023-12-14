import { z } from 'zod'

import { client } from '@/api/api-utils'
import { METRICS_DOCUMENTATION_PAGE_SIZE, WHATS_NEW_PAGE_SIZE } from '@/app/constants/app.constants'
import { calculatePageOffset } from '@/app/utils/api.utils'
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
  MetricsParent = 'metrics_documentation.MetricsDocumentationParentPage',
  MetricsChild = 'metrics_documentation.MetricsDocumentationChildEntry',
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
      badge: z
        .object({
          text: z.string(),
          colour: z.string().toLowerCase(),
        })
        .nullable(),
      last_published_at: z.string(),
    })
  ),
})

export const metricsChildResponseSchema = responseSchema.extend({
  items: z.array(
    page.extend({
      page_description: z.string(),
      metric_group: z.string(),
      topic: z.string(),
      metric: z.string(),
      last_published_at: z.string(),
      date_posted: z.string(),
      body: z.array(
        z.object({
          id: z.string(),
          type: z.literal('section'),
          value: z.object({
            title: z.string(),
            body: z.string(),
          }),
        })
      ),
    })
  ),
})

export type MetricsChildPagesResponse = z.infer<typeof metricsChildResponseSchema>

export const getPages = async (type?: PageType, additionalParams?: Record<string, string>) => {
  try {
    const searchParams = new URLSearchParams()
    if (type) searchParams.set('type', type)

    searchParams.set('limit', '100') // TODO: This is a temporary fix to ensure the backend page limit is not hit

    if (additionalParams) {
      for (const key in additionalParams) {
        searchParams.set(key, additionalParams[key])
      }
    }

    const { data } = await client<PagesResponse>('pages', { searchParams })
    logger.info(`GET success pages/?${searchParams.toString()}`)
    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}

export type WhatsNewPagesResponse = z.infer<typeof whatsNewResponseSchema>

export const getWhatsNewPages = async ({ page = 1 }: { page?: number }) => {
  const searchParams = new URLSearchParams()
  searchParams.set('type', PageType.WhatsNewChild)
  searchParams.set('fields', '*')
  searchParams.set('order', '-date_posted')
  searchParams.set('limit', String(WHATS_NEW_PAGE_SIZE))
  searchParams.set('offset', String(calculatePageOffset(page, WHATS_NEW_PAGE_SIZE)))

  try {
    const { data } = await client<WhatsNewPagesResponse>('pages', { searchParams })
    logger.info(`GET success pages/?${searchParams.toString()}`)
    return whatsNewResponseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return whatsNewResponseSchema.safeParse(error)
  }
}

export type MetricsPagesResponse = z.infer<typeof metricsChildResponseSchema>

export const getMetricsPages = async ({ page = 1 }: { page?: number }) => {
  const searchParams = new URLSearchParams()
  searchParams.set('type', PageType.MetricsChild)
  searchParams.set('fields', '*')
  searchParams.set('limit', String(METRICS_DOCUMENTATION_PAGE_SIZE))
  searchParams.set('offset', String(calculatePageOffset(page, METRICS_DOCUMENTATION_PAGE_SIZE)))

  try {
    const { data } = await client<MetricsPagesResponse>('pages', { searchParams })
    logger.info(`GET success pages/?${searchParams.toString()}`)
    return metricsChildResponseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return metricsChildResponseSchema.safeParse(error)
  }
}
