import { z } from 'zod'

import { client } from '@/api/api-utils'
import { Body, Meta, RelatedLinks } from '@/api/models/cms/Page'
import { logger } from '@/lib/logger'

import type { PageType } from './getPages'

/**
 * CMS Page endpoint
 */

export type PageResponse<T> = T extends PageType.Home
  ? z.infer<typeof WithHomeData>
  : T extends PageType.Topic
  ? z.infer<typeof WithTopicData>
  : T extends PageType.Common
  ? z.infer<typeof WithCommonData>
  : T extends PageType.WhatsNewParent
  ? z.infer<typeof WithWhatsNewParentData>
  : T extends PageType.WhatsNewChild
  ? z.infer<typeof WithWhatsNewChildData>
  : T extends PageType.MetricsParent
  ? z.infer<typeof WithMetricsParentData>
  : T extends PageType.MetricsChild
  ? z.infer<typeof WithMetricsChildData>
  : never

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
    type: z.literal('metrics.MetricsParentPage'),
  }),
})

const WithMetricsChildData = SharedPageData.omit({ related_links: true }).extend({
  meta: Meta.extend({
    type: z.literal('metrics.MetricsChildEntry'),
  }),
  description: z.string(),
  category: z.string(),
  topic: z.string(),
  apiName: z.string(),
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
