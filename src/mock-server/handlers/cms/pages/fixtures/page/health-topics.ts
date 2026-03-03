import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const healthTopicsPageMock: PageResponse<PageType.TopicsList> = {
  id: 200,
  meta: {
    type: 'topics.TopicsListPage',
    detail_url: 'http://localhost/api/pages/200/',
    html_url: 'http://localhost/health-topics/',
    slug: 'health-topics',
    show_in_menus: true,
    seo_title: 'Health topics | UKHSA data dashboard',
    search_description: 'Browse health topics and data on the UKHSA data dashboard',
    first_published_at: '2024-01-10T10:00:00.000000+00:00',
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
  seo_priority: 0.7,
  last_published_at: '2024-01-10T10:00:00.000000+00:00',
  last_updated_at: '2024-01-10T10:00:00.000000+00:00',
  title: 'Health topics',
  page_description:
    '<p>Explore data and insights across a range of health topics from the UK Health Security Agency.</p>',
  body: '<p>This page lists the health topics available on the UKHSA data dashboard. Select a topic to view detailed data and metrics.</p>',
}
