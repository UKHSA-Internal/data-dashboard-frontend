import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

import { relatedLinksMock } from '../elements/related-links'

export const cookiesPageMock: PageResponse<PageType.Common> = {
  id: 153,
  meta: {
    type: 'common.CommonPage',
    detail_url: 'http://localhost/api/pages/153/',
    html_url: 'http://localhost/cookies/',
    slug: 'cookies',
    show_in_menus: false,
    seo_title: 'Cookies | UKHSA data dashboard',
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
  title: 'Cookies',
  body: '<p data-block-key="4elgr"><a href="/cookie-policy/?change-settings=1">change</a></p>',
  last_published_at: '2023-05-12T16:53:51.464146+01:00',
  related_links: relatedLinksMock,
  related_links_layout: 'Footer',
}
