import { z } from 'zod'
import { api } from '@/api/api-utils'
import { getCmsApiPath } from '../helpers'
import type { PageType } from './getPages'
import { Meta, Body, RelatedLinks } from '@/api/models/cms/Page'
import { logger } from '@/lib/logger'

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
  symptoms: z.string(),
  transmission: z.string(),
  treatment: z.string(),
  prevention: z.string(),
  surveillance_and_reporting: z.string(),
})

const WithCommonData = SharedPageData.extend({
  body: z.string(),
  meta: Meta.extend({
    type: z.literal('common.CommonPage'),
  }),
})

export const responseSchema = z.union([WithHomeData, WithTopicData, WithCommonData])

export const getPage = async <T extends PageType>(id: number) => {
  try {
    const res = await api.get(`${getCmsApiPath()}/${id}`).json<PageResponse<T>>()
    return responseSchema.safeParse(res)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
