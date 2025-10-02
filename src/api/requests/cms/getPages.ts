import { z } from 'zod'

import { client } from '@/api/utils/api.utils'
import { fallback } from '@/api/utils/zod.utils'
import { calculatePageOffset } from '@/app/utils/api.utils'
import { logger } from '@/lib/logger'

/**
 * Defines API request handlers and Zod schemas for fetching and validating CMS page data.
 * The file structures around the PageType enum, which categorises the types of CMS pages
 * available, and leverages Zod for runtime validation of the API responses to ensure they
 * adhere to expected structures.
 *
 * Key components include:
 * - PageType: An enum that outlines the various CMS page types that can be requested.
 * - Zod Schemas: These are detailed schemas for the expected structure of API responses
 *   for different page queries. They are crucial for validating the shape and type of
 *   fetched data at runtime.
 * - Response Types: TypeScript types inferred from Zod schemas (e.g., PagesResponse,
 *   WhatsNewPagesResponse, MetricsChildPagesResponse) that provide compile-time assurances
 *   about the structure and type of API response data.
 * - API Request Handlers: Functions (`getPages`, `getWhatsNewPages`, `getMetricsPages`)
 *   that perform async requests to the CMS. These functions use the defined Zod schemas
 *   to validate responses and ensure data integrity.
 *
 * The setup facilitates a robust, type-safe interaction with the CMS, leveraging TypeScript
 * for static type checking and Zod for dynamic validation of the response data structure.
 */

export enum PageType {
  Landing = 'home.LandingPage',
  Feedback = 'forms.FormPage',
  Common = 'common.CommonPage',
  Composite = 'composite.CompositePage',
  Topic = 'topic.TopicPage',
  WhatsNewParent = 'whats_new.WhatsNewParentPage',
  WhatsNewChild = 'whats_new.WhatsNewChildEntry',
  MetricsParent = 'metrics_documentation.MetricsDocumentationParentPage',
  MetricsChild = 'metrics_documentation.MetricsDocumentationChildEntry',
}

const page = z.object({
  id: z.number(),
  title: z.string(),
  sub_title: z.string().optional().nullable(),
  // Not every request to the `/pages` endpoint has a `?type=PageType` parameter which is needed to expose the two below fields.
  // We default these with a fallback as to not break the schema.
  seo_change_frequency: z.number().or(fallback(5)),
  seo_priority: z.coerce.number().or(fallback(0.5)),
  meta: z.object({
    type: z.string(),
    detail_url: z.string(),
    html_url: z.string().nullable(),
    slug: z.string(),
    search_description: z.string(),
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

export const getPages = async (additionalParams?: Record<string, string>) => {
  try {
    const limit = 50
    const page = 1
    let allItems: z.infer<typeof responseSchema>['items'] = []
    let totalCount = 0

    // First request to get total count
    const initialSearchParams = new URLSearchParams()
    initialSearchParams.set('limit', String(limit))
    initialSearchParams.set('fields', '*')
    initialSearchParams.set('offset', String(calculatePageOffset(page, limit)))

    if (additionalParams) {
      for (const key in additionalParams) {
        initialSearchParams.set(key, additionalParams[key])
      }
    }

    const { data: initialData } = await client<PagesResponse>('pages', { searchParams: initialSearchParams })
    const initialResult = responseSchema.safeParse(initialData)

    if (!initialResult.success) {
      return initialResult
    }

    totalCount = initialResult.data.meta.total_count
    allItems = [...initialResult.data.items]

    // Calculate total pages needed
    const totalPages = Math.ceil(totalCount / limit)

    // Fetch remaining pages if there are more than 1 page
    if (totalPages > 1) {
      for (let pageNum = 2; pageNum <= totalPages; pageNum++) {
        const searchParams = new URLSearchParams()
        searchParams.set('limit', String(limit))
        searchParams.set('fields', '*')
        searchParams.set('offset', String(calculatePageOffset(pageNum, limit)))

        if (additionalParams) {
          for (const key in additionalParams) {
            searchParams.set(key, additionalParams[key])
          }
        }

        const { data } = await client<PagesResponse>('pages', { searchParams })
        const result = responseSchema.safeParse(data)

        if (result.success) {
          allItems = [...allItems, ...result.data.items]
        }
      }
    }

    // Return combined result
    const combinedResponse = {
      items: allItems,
      meta: {
        total_count: totalCount,
      },
    }

    return responseSchema.safeParse(combinedResponse)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}

export type WhatsNewPagesResponse = z.infer<typeof whatsNewResponseSchema>

export const getWhatsNewPages = async ({
  page = 1,
  showPagination,
  paginationSize = 1,
}: {
  page: number | undefined
  showPagination?: boolean
  paginationSize?: number
}) => {
  const whatsNewPageSize = showPagination ? paginationSize : 1000 // set large value for when pagination is disabled
  const searchParams = new URLSearchParams()
  searchParams.set('type', PageType.WhatsNewChild)
  searchParams.set('fields', '*')
  searchParams.set('order', '-date_posted')
  searchParams.set('limit', String(whatsNewPageSize))
  searchParams.set('offset', String(calculatePageOffset(page, paginationSize)))

  try {
    const { data } = await client<WhatsNewPagesResponse>('pages', { searchParams })
    return whatsNewResponseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return whatsNewResponseSchema.safeParse(error)
  }
}

export type MetricsPagesResponse = z.infer<typeof metricsChildResponseSchema>

interface GetMetricsPagesRequestParams {
  search: string | undefined
  page: number
  showPagination?: boolean
  paginationSize?: number
}

export const getMetricsPages = async ({
  search,
  page = 1,
  showPagination,
  paginationSize = 1,
}: GetMetricsPagesRequestParams) => {
  const metricsDocumentationPageSize = showPagination ? paginationSize : 1000 // set large value for when pagination is disabled

  const searchParams = new URLSearchParams()
  searchParams.set('type', PageType.MetricsChild)
  searchParams.set('fields', '*')
  searchParams.set('limit', String(metricsDocumentationPageSize))
  searchParams.set('offset', String(calculatePageOffset(page, paginationSize)))

  if (search) {
    searchParams.set('search', search)
  }

  try {
    const { data } = await client<MetricsPagesResponse>('pages', { searchParams })
    return metricsChildResponseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return metricsChildResponseSchema.safeParse(error)
  }
}
