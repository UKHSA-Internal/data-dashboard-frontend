import robots from './robots'

test('Robots.txt displays correctly', () => {
  process.env.BASE_URL = 'https://ukhsa-dashboard.data.gov.uk'

  expect(robots()).toEqual({
    rules: { allow: '/', disallow: '', userAgent: '*' },
    sitemap: 'https://ukhsa-dashboard.data.gov.uk/sitemap.xml',
  })
})
