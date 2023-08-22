import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

import { relatedLinksMock } from '../elements/related-links'

export const cookiePolicyPageMock: PageResponse<PageType.Common> = {
  id: 153,
  meta: {
    type: 'common.CommonPage',
    detail_url: 'http://localhost/api/pages/153/',
    html_url: null,
    slug: 'cookie-policy',
    show_in_menus: false,
    seo_title: 'Cookie policy | UKHSA data dashboard',
    search_description: '',
    first_published_at: '2023-05-12T16:51:07.555450+01:00',
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
  title: 'Cookie policy',
  date_posted: '2023-05-12',
  body: '<p data-block-key="4elgr">tbc</p>',
  last_published_at: '2023-05-12T16:53:51.464146+01:00',
  related_links: relatedLinksMock,
}
