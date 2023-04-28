import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'
import { relatedLinksMock } from '../elements'

export const mapsPageMock: PageResponse<PageType.Common> = {
  id: 9,
  meta: {
    type: 'common.CommonPage',
    detail_url: 'http://localhost/api/v2/pages/9/',
    html_url: 'http://localhost/home-page/maps/',
    slug: 'maps',
    show_in_menus: false,
    seo_title: '',
    search_description: '',
    first_published_at: '2023-03-16T09:26:32.597358Z',
    alias_of: null,
    parent: {
      id: 4,
      meta: {
        type: 'home.HomePage',
        detail_url: 'http://localhost/api/v2/pages/4/',
        html_url: 'http://localhost/home-page/',
      },
      title: 'Home page',
    },
  },
  title: 'Maps',
  body: '<p>Maps CMS page content!</p>',
  related_links: relatedLinksMock,
  last_published_at: '2023-03-21T10:25:34.452098Z',
}
