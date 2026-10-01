export const NO_INDEX_ROBOTS = 'noindex, nofollow' as const

const authenticationOnlyPaths = new Set(['/start', '/acknowledgement', '/authentication-error', '/logged-out'])

/**
 * Normalises a URL or path and returns its pathname without trailing slashes.
 *
 * Supports both absolute URLs and relative paths.
 */
function getPathname(urlOrPath: string): string {
  try {
    return new URL(urlOrPath, 'https://ukhsa-dashboard.invalid').pathname.replace(/\/+$/, '') || '/'
  } catch {
    return urlOrPath.replace(/\/+$/, '') || '/'
  }
}

/** Determines whether the supplied route requires authenitcation. */
export function isAuthenticatedOnlyRoute(urlOrPath: string): boolean {
  const pathname = getPathname(urlOrPath)

  return authenticationOnlyPaths.has(pathname) || pathname === '/auth' || pathname.startsWith('/auth/')
}

/**
 * Returns whether a page should be included in search engine indexing.
 *
 * A page is indexable only when it has a URL, is public, and is not an
 * authentication-only route.
 */
export function isPageIndexable({ url, isPublic }: { url: string | null | undefined; isPublic?: boolean }): boolean {
  return Boolean(url) && isPublic !== false && !isAuthenticatedOnlyRoute(url ?? '')
}
