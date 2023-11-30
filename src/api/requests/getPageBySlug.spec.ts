import { client } from '../api-utils'
import { relatedLinksMock } from '../mocks/cms/data/elements'
import { PageType } from './cms/getPages'
import { getPageBySlug } from './getPageBySlug'

jest.mock('@/lib/logger')
jest.mock('@/api/api-utils')
const getPages = jest.mocked(client)
const getPage = jest.mocked(client)

test('returns page successfully', async () => {
  getPages.mockResolvedValueOnce({
    status: 200,
    data: {
      items: [
        {
          id: 21,
          meta: {
            type: 'whats_new.WhatsNewParentPage',
            detail_url: 'http://localhost/api/pages/21/',
            html_url: null,
            slug: 'whats-new',
            show_in_menus: true,
            first_published_at: '2023-10-24T16:09:35.359598+01:00',
          },
          title: "What's new",
        },
      ],
    },
  })

  getPage.mockResolvedValueOnce({
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

  const result = await getPageBySlug('whats-new', PageType.WhatsNewParent)

  expect(result).toEqual({
    id: 21,
    title: 'whats-new',
    meta: {
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
  })
})

// getPage with no type, expect error "no page type provided"

// getPage with no slug, expect error "no slug provided"

// page with weird type, error 'could not get pages with type'

// page with no slug, error 'no page found for slug'
