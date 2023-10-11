import robots from './robots'

test('Robots.txt displays correctly', () => {
  expect(robots()).toEqual({
    rules: { allow: '/', disallow: '', userAgent: '*' },
    sitemap: 'https://ukhsa-dashboard.data.gov.uk/sitemap.xml',
  })
})
