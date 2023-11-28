import { relatedLinksMock } from '@/mock-server/handlers/cms/pages/fixtures/elements'

import { client } from '../api-utils'

jest.mock('@/lib/logger')

const getPageBySlug = jest.mocked(client)

test('returns page successfully', async () => {
  getPageBySlug.mockResolvedValueOnce({
    status: 200,
    data: {
      id: 21,
      meta: {
        seo_title: "What's new | UKHSA data dashboard",
        search_description: '',
        type: 'whats_new.WhatsNewParentPage',
        detail_url: 'http://localhost/api/pages/21/',
        html_url: null,
        slug: 'whats-new',
        show_in_menus: true,
        first_published_at: '2023-10-24T16:09:35.359598+01:00',
        alias_of: null,
        parent: {
          id: 3,
          meta: {
            type: 'home.HomePage',
            detail_url: 'http://localhost/api/pages/3/',
            html_url: null,
          },
          title: 'UKHSA Dashboard Root',
        },
      },
      title: "What's new",
      date_posted: '2023-10-24',
      body: '<p data-block-key="yjvuu">We regularly update the dashboard with new data and features. Here we&#x27;ll show a timeline of changes that have happened outside of the weekly data refresh.</p>',
      related_links: relatedLinksMock,
      last_published_at: '2023-10-24T16:09:35.359598+01:00',
    },
  })
})
