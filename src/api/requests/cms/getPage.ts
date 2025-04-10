import { z } from 'zod'

import { Topics } from '@/api/models'
import { Body, CompositeBody, Meta, RelatedLinks, RelatedLinksLayout } from '@/api/models/cms/Page'
import { FormFields } from '@/api/models/cms/Page/FormFields'
import { client } from '@/api/utils/api.utils'
import { fallback } from '@/api/utils/zod.utils'
import { logger } from '@/lib/logger'

import type { PageType } from './getPages'

export type PageResponse<T> = T extends keyof PageTypeToDataMap ? z.infer<PageTypeToDataMap[T]> : never

type PageTypeToDataMap = {
  [PageType.Landing]: typeof WithLandingData
  [PageType.Feedback]: typeof withFeedbackData
  [PageType.Topic]: typeof WithTopicData
  [PageType.Common]: typeof WithCommonData
  [PageType.Composite]: typeof WithCompositeData
  [PageType.WhatsNewParent]: typeof WithWhatsNewParentData
  [PageType.WhatsNewChild]: typeof WithWhatsNewChildData
  [PageType.MetricsParent]: typeof WithMetricsParentData
  [PageType.MetricsChild]: typeof WithMetricsChildData
}

const SharedPageData = z.object({
  id: z.number(),
  title: z.string(),
  meta: Meta,
  last_published_at: z.string(),
  last_updated_at: z.string(),
  seo_change_frequency: z.number(),
  seo_priority: z.coerce.number(),
})

const WithLandingData = SharedPageData.extend({
  sub_title: z.string(),
  body: Body,
  meta: Meta.extend({
    type: z.literal('home.LandingPage'),
  }),
})

const withFeedbackData = SharedPageData.extend({
  meta: Meta.extend({
    type: z.literal('forms.FormPage'),
  }),
  body: z.string(),
  form_fields: FormFields,
  confirmation_slug: z.string(),
  confirmation_panel_title: z.string(),
  confirmation_panel_text: z.string(),
  confirmation_body: z.string(),
})

const WithTopicData = SharedPageData.extend({
  body: Body,
  page_description: z.string(),
  meta: Meta.extend({
    type: z.literal('topic.TopicPage'),
  }),
  enable_area_selector: z.boolean().or(fallback(false)),
  selected_topics: z.array(Topics).or(fallback([])),
  related_links: RelatedLinks,
  related_links_layout: RelatedLinksLayout.or(fallback<RelatedLinksLayout>('Sidebar')),
})

const WithCommonData = SharedPageData.extend({
  body: z.string(),
  meta: Meta.extend({
    type: z.literal('common.CommonPage'),
  }),
  related_links: RelatedLinks,
  related_links_layout: RelatedLinksLayout.or(fallback<RelatedLinksLayout>('Sidebar')),
})

const WithCompositeData = SharedPageData.extend({
  body: CompositeBody,
  meta: Meta.extend({
    type: z.literal('composite.CompositePage'),
  }),
  //TODO: Look into page description on all composite pages
  page_description: z.string().nullable().optional(),
  related_links: RelatedLinks,
  related_links_layout: RelatedLinksLayout.or(fallback<RelatedLinksLayout>('Sidebar')),
})

const WithWhatsNewParentData = SharedPageData.extend({
  body: z.string(),
  show_pagination: z.boolean(),
  pagination_size: z.number(),
  meta: Meta.extend({
    type: z.literal('whats_new.WhatsNewParentPage'),
  }),
  date_posted: z.string(),
})

const WithWhatsNewChildData = SharedPageData.omit({ last_published_at: true }).extend({
  body: z.string(),

  meta: Meta.extend({
    type: z.literal('whats_new.WhatsNewChildEntry'),
  }),
  additional_details: z.string(),
  badge: z
    .object({
      text: z.string(),
      colour: z.string().toLowerCase(),
    })
    .nullable(),
  date_posted: z.string(),
  last_published_at: z.string(),
})

const WithMetricsParentData = SharedPageData.extend({
  body: z.string(),
  show_pagination: z.boolean(),
  pagination_size: z.number(),
  meta: Meta.extend({
    type: z.literal('metrics_documentation.MetricsDocumentationParentPage'),
  }),
})

const WithMetricsChildData = SharedPageData.extend({
  meta: Meta.extend({
    type: z.literal('metrics_documentation.MetricsDocumentationChildEntry'),
  }),
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

export const responseSchema = z.union([
  WithLandingData,
  withFeedbackData,
  WithTopicData,
  WithCommonData,
  WithCompositeData,
  WithWhatsNewParentData,
  WithWhatsNewChildData,
  WithMetricsParentData,
  WithMetricsChildData,
])

/**
 * Fetches and validates page data from the CMS using a specified page ID and type.
 * Leverages TypeScript generics and Zod schemas to ensure the returned data adheres to the expected structure
 * based on the page type. This setup provides compile-time and runtime assurances about data integrity.
 *
 * - PageResponse<T>: Dynamically infers return type based on PageType, ensuring type safety.
 * - PageTypeToDataMap: Maps PageType to corresponding Zod schemas for data validation.
 * - responseSchema: Uses Zod union to validate the API response against expected data structures.
 *
 * Designed to facilitate type-safe API interactions, enhancing data consistency and reliability.
 */

export const getPage = async <T extends PageType>(id: number) => {
  try {
    const searchParams = new URLSearchParams()
    searchParams.set('fields', 'html_url')

    const { data } = await client<PageResponse<T>>(`pages/${id}`, { searchParams })
    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
