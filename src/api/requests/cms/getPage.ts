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

export const responseSchema = z.union([WithHomeData, WithTopicData, WithCommonData])

export const getPage = async <T extends PageType>(id: number) => {
  try {
    const { data } = await client<PageResponse<T>>(`pages/${id}`)
    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
