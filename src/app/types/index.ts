export type Slug = string[]

export interface PageParams {
  slug: Slug
}

export type SearchParams = Record<string, string>

export interface PageComponentBaseProps<S extends Record<string, string> = Record<string, string>> {
  slug: Slug
  searchParams: S
}
