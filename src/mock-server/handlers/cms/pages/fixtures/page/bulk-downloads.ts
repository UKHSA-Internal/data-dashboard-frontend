import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const bulkDownloadsPageMock: PageResponse<PageType.Common> = {
  id: 156,
  meta: {
    type: 'common.CommonPage',
    detail_url: 'http://localhost/api/pages/157/',
    html_url: null,
    slug: 'bulk-downloads',
    show_in_menus: true,
    seo_title: 'Bulk downloads | UKHSA data dashboard',
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
  title: 'Bulk downloads',
  date_posted: '2023-08-24',
  body: '<p>The government’s coronavirus dashboard publishes up-to-date statistics about the coronavirus (COVID-19) pandemic in the UK. These statistics are not classed as official statistics because...</p>',
  last_published_at: '2023-08-24T16:53:51.464146+01:00',
  related_links: [],
}
