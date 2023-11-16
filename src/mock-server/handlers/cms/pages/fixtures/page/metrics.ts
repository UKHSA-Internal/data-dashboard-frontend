import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

import { relatedLinksMock } from '../elements'

export const metricsParentMock: PageResponse<PageType.MetricsParent> = {
  id: 25,
  meta: {
    seo_title: 'Metrics documentation | UKHSA data dashboard',
    search_description: '',
    type: 'metrics.MetricsParentPage',
    detail_url: 'http://localhost/api/pages/25/',
    html_url: null,
    slug: 'metrics',
    show_in_menus: true,
    first_published_at: '2023-10-24T16:09:35.359598+01:00',
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
  title: 'Metrics documentation',
  body: '<p>Metrics documentation description...</p>',
  related_links: relatedLinksMock,
  last_published_at: '2023-10-24T16:09:35.359598+01:00',
}

export const metricsChildMocks: PageResponse<PageType.MetricsChild>[] = [
  {
    id: 26,
    meta: {
      seo_title: 'Metrics child | UKHSA data dashboard',
      search_description: '',
      type: 'metrics.MetricsChildEntry',
      detail_url: 'http://localhost/api/pages/26/',
      html_url: null,
      slug: 'cumulative-cases-by-specemin-date',
      show_in_menus: false,
      first_published_at: '2023-10-24T16:10:44.385654+01:00',
      alias_of: null,
      parent: {
        id: 21,
        meta: {
          type: 'metrics.MetricsParentPage',
          detail_url: 'http://localhost/api/pages/25/',
          html_url: null,
        },
        title: 'Metrics documentation',
      },
    },
    title: 'Cumulative cases by specemin date',
    description: 'Child page',
    category: 'Cases',
    topic: 'COVID-19',
    apiName: 'new_cases_7days_sum',
    last_published_at: '2023-10-24T16:09:35.359598+01:00',
  },
]
