import { SITE_URL } from '../constants/app.constants'

/**
 * Determine if the user is browsing on the production site
 */
export const isProd = () => global.window && window.location.hostname === SITE_URL
