import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const bulkDownloadsPageMock: PageResponse<PageType.Composite> = {
  id: 156,
  meta: {
    type: 'composite.CompositePage',
    detail_url: 'http://localhost/api/pages/157/',
    html_url: 'http://localhost/bulk-downloads/',
    slug: 'bulk-downloads',
    show_in_menus: true,
    seo_title: 'Bulk downloads | UKHSA data dashboard',
    search_description: 'Mocked bulk downloads page description',
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
  title: 'Bulk downloads',
  body: [
    {
      type: 'text',
      value:
        '<p data-block-key="0od86">You can download all the data from the UKHSA data dashboard charts on this page by clicking the Download button. </p><p data-block-key="ea5ul">This is useful if you want to analyse the data using your own tools. </p><p data-block-key="cqg56">The data is available in a zip file format, which has a size of about 70 kB so it should be quick to download even on slower internet connections.</p>',
      id: '5eeefac8-ca5e-4838-b63d-3ecbbba59eed',
    },
    {
      type: 'internal_button',
      value: {
        text: 'Download',
        button_type: 'BULK_DOWNLOAD',
        endpoint: '/api/bulkdownloads/v1',
        method: 'POST',
      },
      id: '3b750f69-d66f-40e7-aaa4-f67289ec4bde',
    },
  ],
  last_published_at: '2023-08-24T16:53:51.464146+01:00',
  related_links: [],
  related_links_layout: 'Footer',
}
