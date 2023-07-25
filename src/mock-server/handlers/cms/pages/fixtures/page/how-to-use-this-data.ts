import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

import { relatedLinksMock } from '../elements/related-links'

export const howToUseThisDataPageMock: PageResponse<PageType.Common> = {
  id: 152,
  meta: {
    type: 'common.CommonPage',
    detail_url: 'http://localhost/api/pages/152/',
    html_url: null,
    slug: 'how-to-use-this-data',
    show_in_menus: false,
    seo_title: 'How to use this data | UKHSA data dashboard',
    search_description: 'A guide on how to use the data provided across the UKHSA data dashboard.',
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
  title: 'How to use this data',
  date_posted: '2023-05-12',
  body: '<p data-block-key="4elgr">-</p>',
  last_published_at: '2023-05-12T16:53:51.464146+01:00',
  related_links: relatedLinksMock,
}
