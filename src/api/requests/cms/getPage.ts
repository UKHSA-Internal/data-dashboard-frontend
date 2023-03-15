import { getCmsApiPath } from '../helpers'

/**
 * Response types for the CMS endpoint
 * TODO: Add url to endpoint in docs
 */
export type PageResponse<T> = {
  id: number
  meta: PageMeta
  title: string
  body: string
  date_posted: string
} & T

export type TopicPage = {
  symptoms: string
  transmission: string
  treatment: string
  prevention: string
  surveillance_and_reporting: string
}

export type DashboardPage = {
  related_links: Array<RelatedLink>
}

type RelatedLink = {
  title: string
  description: string
  link: string
}

type PageMeta = {
  type: string
  detail_url: string
  html_url: string
  slug: string
  show_in_menus: boolean
  seo_title: string
  search_description: string
  first_published_at: string
  alias_of: null
  parent: Parent
}

type Parent = {
  id: number
  meta: ParentMeta
  title: string
}

type ParentMeta = {
  type: string
  detail_url: string
  html_url: string
}

export const getPage = async <T = TopicPage | DashboardPage>(
  id: number
): Promise<PageResponse<T>> => {
  const req = await fetch(`${getCmsApiPath()}/pages/${id}`)
  const res = await req.json()
  return res
}
