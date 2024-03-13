import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const archiveDataPageMock: PageResponse<PageType.Composite> = {
  id: 157,
  meta: {
    type: 'composite.CompositePage',
    detail_url: 'http://localhost/api/pages/157/',
    html_url: null,
    slug: 'covid-19-archive-data-download',
    show_in_menus: false,
    seo_title: 'COVID-19 Archive data download | UKHSA data dashboard',
    search_description: 'Mocked archive data page description',
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
  title: 'COVID-19 Archive data download',
  date_posted: '2023-08-24',
  body: [
    {
      type: 'text',
      value:
        '<p data-block-key="0od86">You can download all the data from the UKHSA data dashboard charts on this page by clicking the Download button. </p><p data-block-key="ea5ul">This is useful if you want to analyse the data using your own tools. </p><p data-block-key="cqg56">The data is available in a zip file format, which has a size of about 70 kB so it should be quick to download even on slower internet connections.</p>',
      id: '5eeefac8-ca5e-4838-b63d-3ecbbba59eed',
    },
    {
      type: 'external_button',
      value: {
        text: 'Download all',
        url: 'https://archive.ukhsa-dashboard.data.gov.uk/coronavirus-dashboard/covid-19-archive.zip',
        icon: '',
        button_type: 'Primary',
      },
      id: 'b1b97fd7-8c46-4cf4-bab1-1a3d7ae5a913',
    },
    {
      type: 'external_button',
      value: {
        text: 'Download cases',
        url: 'https://archive.ukhsa-dashboard.data.gov.uk/coronavirus-dashboard/cases.zip',
        icon: '',
        button_type: 'Secondary',
      },
      id: 'b1b97fd7-8c46-4cf4-bab1-1a3d7ae5a912',
    },
  ],
  last_published_at: '2023-08-24T16:53:51.464146+01:00',
  related_links: [],
}
