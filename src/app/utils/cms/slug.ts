import { Slug } from '@/app/types'

export function extractRootSlug(slug: Slug) {
  const root = slug[0] ?? ''
  return `/${root}`
}

export function getPathSegments(url: string): Slug {
  if (!url) return []
  const urlObj = new URL(url)
  const path = urlObj.pathname
  const segments = path.split('/').filter((segment) => segment.length > 0)
  return segments
}
