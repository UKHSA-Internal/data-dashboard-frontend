import { client } from '@/api/utils/api.utils'
import { allPagesMock } from '@/mock-server/handlers/cms/pages/fixtures/pages'

import sitemap from './sitemap'

const getPages = jest.mocked(client)

test('Sitemap displays correctly', async () => {
  // Mock date as some sitemap pages have their last modified date generated at build time
  jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

  getPages.mockResolvedValueOnce({
    status: 200,
    data: allPagesMock,
  })

  expect(await sitemap()).toMatchSnapshot()
})
