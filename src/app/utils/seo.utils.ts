export const NO_INDEX_ROBOTS = 'noindex, nofollow' as const

const authenticationOnlyPaths = new Set(['/start', '/acknowledgement', '/authentication-error', '/logged-out'])

function getPathname(urlOrPath: string): string {
  try {
    return new URL(urlOrPath, 'https://ukhsa-dashboard.invalid').pathname.replace(/\/+$/, '') || '/'
  } catch {
    return urlOrPath.replace(/\/+$/, '') || '/'
  }
}

export function isAuthenticatedOnlyRoute(urlOrPath: string): boolean {
  const pathname = getPathname(urlOrPath)

  return authenticationOnlyPaths.has(pathname) || pathname === '/auth' || pathname.startsWith('/auth/')
}

export function isPageIndexable({ url, isPublic }: { url: string | null | undefined; isPublic?: boolean }): boolean {
  return Boolean(url) && isPublic !== false && !isAuthenticatedOnlyRoute(url ?? '')
}
