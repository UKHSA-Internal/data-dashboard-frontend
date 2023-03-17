import { DashboardPage, PageResponse } from '@/api/requests/cms/getPage'
import { relatedLinksMock } from '../elements'

export const dashboardPageMock: PageResponse<DashboardPage> = {
  id: 1,
  meta: {
    type: 'Dashboard',
    detail_url: '',
    html_url: '',
    slug: '',
    show_in_menus: false,
    seo_title: '',
    search_description: '',
    first_published_at: '2023-03-10T10:57:35.324472Z',
    alias_of: null,
    parent: {
      id: 0,
      meta: {
        type: '',
        detail_url: '',
        html_url: '',
      },
      title: '',
    },
  },
  date_posted: '2023-03-10',
  title: 'Respiratory viruses',
  body: 'Data and insights from the UKHSA on respiratory viruses.',
  related_links: relatedLinksMock,
}
