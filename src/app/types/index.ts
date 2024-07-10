export type Slug = string[]

export interface PageParams {
  slug: Slug
}

export type SearchParams<T extends string | unknown = unknown> = Partial<T>

export interface PageComponentBaseProps<S extends Record<string, unknown> = Record<string, string>> {
  slug: Slug
  searchParams: Partial<S>
}
