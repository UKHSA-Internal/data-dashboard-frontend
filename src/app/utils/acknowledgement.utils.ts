export const ACKNOWLEDGEMENT_STORAGE_KEY = 'ukhsa_acknowledgement_accepted'
export const ACKNOWLEDGEMENT_PATH = '/acknowledgement'
export const PRIVATE_HOME_PATH = '/'
export const START_PATH = '/start'

type AcknowledgementMarker = {
  accepted: true
  acceptedAt: string
}

export function hasAcknowledgementMarker() {
  if (typeof window === 'undefined') return false

  try {
    const marker = window.localStorage.getItem(ACKNOWLEDGEMENT_STORAGE_KEY)
    if (!marker) return false

    const parsed = JSON.parse(marker) as Partial<AcknowledgementMarker>
    return parsed.accepted === true && typeof parsed.acceptedAt === 'string'
  } catch {
    return false
  }
}

export function setAcknowledgementMarker() {
  if (typeof window === 'undefined') return

  const marker: AcknowledgementMarker = {
    accepted: true,
    acceptedAt: new Date().toISOString(),
  }

  window.localStorage.setItem(ACKNOWLEDGEMENT_STORAGE_KEY, JSON.stringify(marker))
}

export function clearAcknowledgementMarker() {
  if (typeof window === 'undefined') return

  window.localStorage.removeItem(ACKNOWLEDGEMENT_STORAGE_KEY)
}

export function isSafeInternalPath(path: string | null | undefined): path is string {
  if (!path) return false
  if (!path.startsWith('/')) return false
  if (path.startsWith('//')) return false

  try {
    const url = new URL(path, 'http://localhost')
    return url.origin === 'http://localhost' && url.pathname !== ACKNOWLEDGEMENT_PATH
  } catch {
    return false
  }
}

export function getSafeReturnPath(returnTo: string | null | undefined): string {
  return isSafeInternalPath(returnTo) ? returnTo : PRIVATE_HOME_PATH
}

export function getAcknowlegementRedirectPath(returnTo: string) {
  const redirectPath = new URLSearchParams({ returnTo }).toString()
  return `${ACKNOWLEDGEMENT_PATH}?${redirectPath}`
}
