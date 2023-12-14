import { z } from 'zod'

import { client } from '@/api/api-utils'
import { Body, Meta, RelatedLinks } from '@/api/models/cms/Page'
import { logger } from '@/lib/logger'

import type { PageType } from './getPages'

/**
 * CMS Page endpoint
 */

export type PageResponse<T> = T extends keyof PageTypeToDataMap ? z.infer<PageTypeToDataMap[T]> : never

type PageTypeToDataMap = {
  [PageType.Home]: typeof WithHomeData
  [PageType.Topic]: typeof WithTopicData
  [PageType.Common]: typeof WithCommonData
  [PageType.WhatsNewParent]: typeof WithWhatsNewParentData
  [PageType.WhatsNewChild]: typeof WithWhatsNewChildData
  [PageType.MetricsParent]: typeof WithMetricsParentData
  [PageType.MetricsChild]: typeof WithMetricsChildData
}

const SharedPageData = z.object({
  id: z.number(),
  title: z.string(),
  last_published_at: z.string(),
  related_links: RelatedLinks,
  meta: Meta,
})

const WithHomeData = SharedPageData.extend({
  body: Body,
  page_description: z.string(),
  meta: Meta.extend({
    type: z.literal('home.HomePage'),
  }),
})

const WithTopicData = SharedPageData.extend({
  body: Body,
  page_description: z.string(),
  meta: Meta.extend({
    type: z.literal('topic.TopicPage'),
  }),
  symptoms: z.string().optional(),
  transmission: z.string().optional(),
  treatment: z.string().optional(),
  prevention: z.string().optional(),
  surveillance_and_reporting: z.string().optional(),
})

const WithCommonData = SharedPageData.extend({
  body: z.string(),
  meta: Meta.extend({
    type: z.literal('common.CommonPage'),
  }),
  date_posted: z.string(),
})

const WithWhatsNewParentData = SharedPageData.extend({
  body: z.string(),
  meta: Meta.extend({
    type: z.literal('whats_new.WhatsNewParentPage'),
  }),
  date_posted: z.string(),
})

const WithWhatsNewChildData = SharedPageData.omit({ related_links: true, last_published_at: true }).extend({
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
})

const WithMetricsParentData = SharedPageData.extend({
  body: z.string(),
  meta: Meta.extend({
    type: z.literal('metrics_documentation.MetricsDocumentationParentPage'),
  }),
})

const WithMetricsChildData = SharedPageData.omit({ related_links: true }).extend({
  meta: Meta.extend({
    type: z.literal('metrics_documentation.MetricsDocumentationChildEntry'),
  }),
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

export const responseSchema = z.union([
  WithHomeData,
  WithTopicData,
  WithCommonData,
  WithWhatsNewParentData,
  WithWhatsNewChildData,
  WithMetricsParentData,
  WithMetricsChildData,
])

export const getPage = async <T extends PageType>(id: number) => {
  try {
    const { data } = await client<PageResponse<T>>(`pages/${id}`)
    logger.info(`GET success page/${id}`)
    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
