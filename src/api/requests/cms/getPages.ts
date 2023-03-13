import { getCmsApiPath } from '../helpers'

/**
 * Response types for the CMS REST endpoint
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
type PagesType = 'topic.TopicPage' | 'topic.TopicIndexPage'

export const getPages = async (
  type: PagesType = 'topic.TopicPage'
): Promise<PagesResponse> => {
  const req = await fetch(`${getCmsApiPath()}/pages/?type=${type}`)
  const res = await req.json()
  return res
}
