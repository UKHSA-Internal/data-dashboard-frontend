import { getCmsApiPath, requestOptions } from '../helpers'
import type { PageType } from './getPages'
import type { Meta, Body, RelatedLinks } from '@/api/models/cms/Page'

/**
 * CMS Page endpoint
 */
export type PageResponse<T> = T extends PageType.Home
  ? SharedPageData<WithHomeData>
  : T extends PageType.Topic
  ? SharedPageData<WithTopicData>
  : T extends PageType.Common
  ? SharedPageData<WithCommonData>
  : never

type SharedPageData<T extends WithHomeData | WithTopicData | WithCommonData> = {
  id: number
  meta: Meta
  title: string
  last_published_at: string
  related_links: RelatedLinks
} & T

type WithHomeData = {
  body: Body
}

type WithTopicData = {
  body: string
  symptoms: string
  transmission: string
  treatment: string
  prevention: string
  surveillance_and_reporting: string
}

type WithCommonData = {
  body: string
}

export const getPage = async <T extends PageType>(id: number): Promise<PageResponse<T>> => {
  const req = await fetch(`${getCmsApiPath()}/${id}`, requestOptions)
  const res = await req.json()
  if (!req.ok) throw new Error(res.detail)
  return res
}
