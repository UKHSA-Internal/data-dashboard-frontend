import { MetadataRoute } from 'next'

import { SITE_URL } from './constants/app.constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '',
    },
    sitemap: `https://${SITE_URL}/sitemap.xml`,
  }
}
