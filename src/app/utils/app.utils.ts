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
