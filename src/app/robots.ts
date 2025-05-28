import { MetadataRoute } from 'next'

import { authEnabled } from '@/config/constants'

import { SITE_URL } from './constants/app.constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: authEnabled ? '' : '/',
      disallow: authEnabled ? '/' : '',
    },
    sitemap: `https://${SITE_URL}/sitemap.xml`,
  }
}
