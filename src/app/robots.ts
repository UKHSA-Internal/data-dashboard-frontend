import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  console.log('Sitemap url in robots.txt: ', `${process.env.BASE_URL}/sitemap.xml`)
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '',
    },
    sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  }
}
