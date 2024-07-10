import { Slug } from '@/app/types'

export function extractRootSlug(slug: Slug) {
  const root = slug[0] ?? ''
  return `/${root}`
}
