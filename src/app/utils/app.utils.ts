import { SITE_URL } from '../constants/app.constants'

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

export const getSiteUrl = () =>
  process.env.API_URL.includes('localhost') ? `http://localhost:3000` : process.env.API_URL.replace('private-api.', '')

export const slug2String = (slug: string[]): string => slug.join('/')

export const trimTrailingSlash = (url: string) => url.replace(/\/$/, '')
