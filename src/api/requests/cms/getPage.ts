import { getCmsApiPath } from '../helpers'

/**
 * Response types for the CMS endpoint
 * TODO: Add url to endpoint in docs
 */
export type PageResponse = {
  id: number
  meta: PageMeta
  title: string
  date_posted: string
  introduction: string
  symptoms: string
  transmission: string
  treatment: string
  prevention: string
  surveillance_and_reporting: string
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

export const getPage = async (id: number): Promise<PageResponse> => {
  const req = await fetch(`${getCmsApiPath()}/pages/${id}`)
  const res = await req.json()
  return res
}
