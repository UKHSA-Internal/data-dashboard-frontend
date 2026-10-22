'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, useEffect, useMemo, useSyncExternalStore } from 'react'

import {
  ACKNOWLEDGEMENT_PATH,
  clearAcknowledgementMarker,
  getAcknowlegementRedirectPath,
  hasAcknowledgementMarker,
  PRIVATE_HOME_PATH,
  START_PATH,
} from '@/app/utils/acknowledgement.utils'

const PUBLIC_AUTH_PATHS = ['/start', '/auth/signin', '/auth/signout', '/auth/error', '/authentication-error']

function isPublicAuthPath(pathname: string) {
  return PUBLIC_AUTH_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))
}

function buildCurrentPath(pathname: string, searchParams: URLSearchParams) {
  const queryString = searchParams.toString()
  return queryString ? `${pathname}?${queryString}` : pathname
}

function subscribeToStorageChange(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange)
  return () => window.removeEventListener('storage', onStoreChange)
}

export function AcknowledgementRouteGuard({
  children,
  isAuthenticated,
}: {
  readonly children: ReactNode
  readonly isAuthenticated: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentPath = useMemo(() => buildCurrentPath(pathname, searchParams), [pathname, searchParams])
  const isAcknowledgementPath = pathname === ACKNOWLEDGEMENT_PATH
  const hasAcceptedAcknowledgement = useSyncExternalStore(
    subscribeToStorageChange,
    () => (isAuthenticated ? hasAcknowledgementMarker() : false),
    () => (isAuthenticated ? null : false)
  )

  useEffect(() => {
    if (hasAcceptedAcknowledgement === null) return

    if (!isAuthenticated) {
      clearAcknowledgementMarker()

      if (isAcknowledgementPath) {
        router.replace(START_PATH)
      }

      return
    }

    if (isAcknowledgementPath) {
      if (hasAcceptedAcknowledgement) {
        router.replace(PRIVATE_HOME_PATH)
      }

      return
    }

    if (isPublicAuthPath(pathname)) {
      if (hasAcceptedAcknowledgement && pathname === START_PATH) {
        router.replace(PRIVATE_HOME_PATH)
        return
      }

      if (!hasAcceptedAcknowledgement && pathname === START_PATH) {
        router.replace(ACKNOWLEDGEMENT_PATH)
      }

      return
    }

    if (!hasAcceptedAcknowledgement) {
      router.replace(getAcknowlegementRedirectPath(currentPath))
    }
  }, [currentPath, hasAcceptedAcknowledgement, isAcknowledgementPath, isAuthenticated, pathname, router, searchParams])

  if (hasAcceptedAcknowledgement === null) return null

  if (!isAuthenticated) {
    return isAcknowledgementPath ? null : children
  }

  if (isAcknowledgementPath) {
    return hasAcceptedAcknowledgement ? null : children
  }

  if (isPublicAuthPath(pathname)) {
    return pathname === START_PATH ? null : children
  }

  if (!hasAcceptedAcknowledgement) return null

  return children
}
