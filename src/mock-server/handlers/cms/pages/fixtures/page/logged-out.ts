import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const loggedOutPageMock: PageResponse<PageType.Common> = {
  id: 86,
  meta: {
    type: 'common.CommonPage',
    detail_url: 'http://localhost/api/pages/86/',
    html_url: 'http://localhost/logged-out/',
    slug: 'logged-out',
    show_in_menus: false,
    seo_title: 'Logged out',
    search_description: '',
    first_published_at: '2026-04-27T15:21:52.230984+01:00',
    alias_of: null,
    parent: {
      id: 3,
      meta: {
        type: 'home.LandingPage',
        detail_url: 'http://localhost/api/pages/3/',
        html_url: null,
      },
      title: 'UKHSA Dashboard Root',
    },
  },
  seo_change_frequency: 5,
  seo_priority: 0.1,
  last_updated_at: '2026-04-27T15:21:52.230984+01:00',
  title: 'Logged out',
  body: '<p data-block-key="wn3sp">You have been automatically signed out.</p>',
  last_published_at: '2026-04-27T15:21:52.230984+01:00',
  active_announcements: [],
  related_links: [],
  related_links_layout: 'Footer',
}
