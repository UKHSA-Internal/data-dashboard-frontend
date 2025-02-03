import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

import { relatedLinksMock } from '../elements/related-links'

export const accessibilityStatementPageMock: PageResponse<PageType.Common> = {
  id: 155,
  meta: {
    type: 'common.CommonPage',
    detail_url: 'http://localhost/api/pages/155/',
    html_url: 'http://localhost/accessibility-statement/',
    slug: 'accessibility-statement',
    show_in_menus: false,
    seo_title: 'Accessibility Statement | UKHSA data dashboard',
    search_description: '',
    first_published_at: '2023-05-12T16:51:07.555450+01:00',
    alias_of: null,
    parent: {
      id: 3,
      meta: {
        type: 'home.LandingPage',
        detail_url: 'http://localhost:3000/api/pages/3/',
        html_url: null,
      },
      title: 'UKHSA Dashboard Root',
    },
  },
  seo_change_frequency: 5,
  seo_priority: 0.5,
  last_updated_at: '2024-07-02T12:44:54.461914+01:00',
  title: 'Accessibility statement',
  body: '<p>tbc</p>',
  last_published_at: '2023-08-24T16:53:51.464146+01:00',
  related_links: relatedLinksMock,
  related_links_layout: 'Footer',
}
