import sitemap from './sitemap'

test('Sitemap displays correctly', () => {
  expect(sitemap()).toEqual([
    {
      changeFrequency: 'weekly',
      lastModified: expect.any(Date),
      priority: 1,
      url: 'https://ukhsa-dashboard.data.gov.uk/',
    },
    {
      changeFrequency: 'weekly',
      lastModified: expect.any(Date),
      priority: 0.8,
      url: 'https://ukhsa-dashboard.data.gov.uk/topics/covid-19',
    },
    {
      changeFrequency: 'weekly',
      lastModified: expect.any(Date),
      priority: 0.8,
      url: 'https://ukhsa-dashboard.data.gov.uk/topics/influenza',
    },
    {
      changeFrequency: 'weekly',
      lastModified: expect.any(Date),
      priority: 0.8,
      url: 'https://ukhsa-dashboard.data.gov.uk/topics/other-respiratory-viruses',
    },
    {
      changeFrequency: 'weekly',
      lastModified: expect.any(Date),
      priority: 0.7,
      url: 'https://ukhsa-dashboard.data.gov.uk/about',
    },
    {
      changeFrequency: 'weekly',
      lastModified: expect.any(Date),
      priority: 0.7,
      url: 'https://ukhsa-dashboard.data.gov.uk/whats-new',
    },
    {
      changeFrequency: 'weekly',
      lastModified: expect.any(Date),
      priority: 0.7,
      url: 'https://ukhsa-dashboard.data.gov.uk/whats-coming',
    },
    {
      changeFrequency: 'weekly',
      lastModified: expect.any(Date),
      priority: 0.7,
      url: 'https://ukhsa-dashboard.data.gov.uk/feedback',
    },
    {
      changeFrequency: 'monthly',
      lastModified: expect.any(Date),
      priority: 0.5,
      url: 'https://ukhsa-dashboard.data.gov.uk/cookies',
    },
    {
      changeFrequency: 'monthly',
      lastModified: expect.any(Date),
      priority: 0.5,
      url: 'https://ukhsa-dashboard.data.gov.uk/accessibility-statement',
    },
    {
      changeFrequency: 'monthly',
      lastModified: expect.any(Date),
      priority: 0.5,
      url: 'https://ukhsa-dashboard.data.gov.uk/compliance',
    },
    {
      changeFrequency: 'monthly',
      lastModified: expect.any(Date),
      priority: 0.2,
      url: 'https://ukhsa-dashboard.data.gov.uk/browse',
    },
  ])
})
