import { SITE_URL } from '../constants/app.constants'

export const isSSR = typeof window === 'undefined'

/**
 * Determine if the user is browsing on the production site
 */
export const isProd = () => global.window && window.location.hostname === SITE_URL

/**
 * Converts a string into a snake-case slug format
 */

export const toSlug = (text: string | null) => {
  if (!text) return ''
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

/**
 * Determine if the provided url is a deployed environment
 */
export const isWellKnownEnvironment = () => {
  const url = getSiteUrl()
  return url.includes('ukhsa-dashboard.data.gov.uk')
}

/**
 * We use the API url to determine the WKE to avoid injecting additional envrionment variables
 */
export const getSiteUrl = () => {
  const baseUrl = process.env.BASE_URL
  if (!baseUrl) throw new Error('Missing environment variable: BASE_URL')
  return baseUrl
}

export const slug2String = (slug: string[]): string => slug.join('/')

export const trimTrailingSlash = (url: string) => url.replace(/\/$/, '')
