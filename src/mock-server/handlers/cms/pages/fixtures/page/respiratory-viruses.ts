import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const respiratoryVirusesMock: PageResponse<PageType.Composite> = {
  id: 80,
  meta: {
    seo_title: 'Respiratory viruses | UKHSA data dashboard',
    search_description: 'Respiratory viruses index page',
    type: 'composite.CompositePage',
    detail_url: 'http:/api/pages/80/',
    html_url: 'http://localhost:3000/respiratory-viruses/',
    slug: 'respiratory-viruses',
    show_in_menus: false,
    first_published_at: '2024-09-29T20:51:56.451450+01:00',
    alias_of: null,
    parent: {
      id: 3,
      meta: { type: 'home.UKHSARootPage', detail_url: 'http:/api/pages/3/', html_url: null },
      title: 'UKHSA Dashboard Root',
    },
  },
  title: 'Respiratory viruses',
  seo_change_frequency: 5,
  seo_priority: 0.5,
  last_updated_at: '2024-09-29T20:51:56.451450+01:00',
  body: [
    {
      type: 'internal_page_links',
      value: [
        {
          type: 'page_link',
          value: {
            title: 'COVID-19',
            sub_title: 'COVID-19 is a respiratory infection caused by the SARS-CoV-2-virus.',
            page: 'http://localhost:3000/respiratory-viruses/covid-19/',
          },
          id: 'c36d19c1-3a5e-4fcf-b696-91468c609369',
        },
        {
          type: 'page_link',
          value: {
            title: 'Influenza',
            sub_title: 'Influenza (commonly known as flu) is a respiratory infection.',
            page: 'http://localhost:3000/respiratory-viruses/influenza/',
          },
          id: 'b3375764-0829-494e-9060-a65df5dd53bd',
        },
        {
          type: 'page_link',
          value: {
            title: 'Other respiratory viruses',
            sub_title: 'RSV is one of the common viruses that cause coughs and colds in winter.',
            page: 'http://localhost:3000/respiratory-viruses/other-respiratory-viruses/',
          },
          id: 'd7104a96-3066-4139-80b4-9a4dfb2ed2f9',
        },
      ],
      id: '99c01f1d-0280-4cf4-bd96-39543a6c1ac9',
    },
  ],
  last_published_at: '2024-09-29T20:51:56.451450+01:00',
  related_links: [],
  related_links_layout: 'Sidebar',
  page_description: '',
}
