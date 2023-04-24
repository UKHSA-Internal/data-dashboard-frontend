export type Meta = {
  type: string
  detail_url: string
  html_url: string | null
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
  html_url: string | null
}
