import { getCmsApiPath, requestOptions } from '../helpers'

/**
 * Response types for the CMS REST endpoint
 * TODO: Add url to endpoint in docs
 */
export type PagesResponse = {
  meta: PagesMeta
  items: Item[]
}

type Item = {
  id: number
  meta: ItemMeta
  title: string
}

type ItemMeta = {
  type: string
  detail_url: string
  html_url: string
  slug: string
  first_published_at: string
}

type PagesMeta = {
  total_count: number
}

/**
 * These are associated with page types within the CMS
 */
export enum PageType {
  Home = 'home.HomePage',
  Common = 'common.CommonPage',
  Topic = 'topic.TopicPage',
}

export const getPages = async (type: PageType): Promise<PagesResponse> => {
  console.log('get pages: ', requestOptions)
  const req = await fetch(`${getCmsApiPath()}/?type=${type}`, requestOptions)
  const res = await req.json()
  if (!req.ok) throw new Error(res.detail)
  return res
}
