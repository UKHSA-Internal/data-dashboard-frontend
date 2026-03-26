import { client } from '@/api/utils/api.utils' // low-level HTTP client
import { allPagesMock } from '@/mock-server/handlers/cms/pages/fixtures/pages'

import sitemap from './sitemap'

test('test sitemap function that builds a list of URLs for search engines', async () => {
  // Simulate CMS pages returned by the API
  const mockClient = jest.mocked(client)
  mockClient.mockResolvedValue({ status: 200, data: allPagesMock })

  // Get URLs from sitemap in a determined order
  const result = await sitemap()
  const urls = [...new Set(result.map((entry) => new URL(entry.url).pathname))].sort()

  // Test URLs against snapshot as a safety net against accidental URL changes
  expect(urls).toMatchSnapshot()

  // Must match any of these
  const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']

  // Only assert key metadata to keep the test lightweight and stable
  for (const entry of result) {
    expect(validFrequencies).toContain(entry.changeFrequency)
    expect(entry.priority).toBeGreaterThanOrEqual(0)
    expect(entry.priority).toBeLessThanOrEqual(1)
  }
})
