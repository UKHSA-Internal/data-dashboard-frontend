import { CommonPage, PageResponse } from '@/api/requests/cms/getPage'
import { relatedLinksMock } from '../elements'

export const whatsNewPageMock: PageResponse<CommonPage> = {
  id: 8,
  meta: {
    type: 'common.CommonPage',
    detail_url: 'http://localhost/api/v2/pages/8/',
    html_url: 'http://localhost/home-page/whats-new/',
    slug: 'whats-new',
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
  title: "What's new",
  date_posted: '2023-03-16',
  body: "<p>What's new CMS page content!</p>",
  related_links: relatedLinksMock,
  last_published_at: '2023-03-03T11:15:34.452098Z',
}
