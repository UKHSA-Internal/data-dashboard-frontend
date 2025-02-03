import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

import { relatedLinksMock } from '../elements/related-links'

export const compliancePageMock: PageResponse<PageType.Common> = {
  id: 156,
  meta: {
    type: 'common.CommonPage',
    detail_url: 'http://localhost/api/pages/156/',
    html_url: 'http://localhost/compliance/',
    slug: 'compliance',
    show_in_menus: false,
    seo_title: 'Compliance | UKHSA data dashboard',
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
  title: 'Compliance',
  body: '<h2>Statement of voluntary application of the Code of Practice for Statistics</h2><p>The government’s coronavirus dashboard publishes up-to-date statistics about the coronavirus (COVID-19) pandemic in the UK. These statistics are not classed as official statistics because...</p>',
  last_published_at: '2023-08-24T16:53:51.464146+01:00',
  related_links: relatedLinksMock,
  related_links_layout: 'Footer',
}
