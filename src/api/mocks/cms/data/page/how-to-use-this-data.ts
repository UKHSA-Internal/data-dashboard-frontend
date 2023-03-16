import { CommonPage, PageResponse } from '@/api/requests/cms/getPage'

export const howToUseThisDataPageMock: PageResponse<CommonPage> = {
  id: 10,
  meta: {
    type: 'common.CommonPage',
    detail_url: 'http://localhost/api/v2/pages/10/',
    html_url: 'http://localhost/home-page/how-to-use-this-data/',
    slug: 'how-to-use-this-data',
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
  title: 'How to use this data',
  date_posted: '2023-03-16',
  body: '<p>How to use this data CMS page content!</p>',
}
