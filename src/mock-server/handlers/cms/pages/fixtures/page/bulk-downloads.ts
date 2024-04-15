import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const bulkDownloadsPageMock: PageResponse<PageType.Composite> = {
  id: 156,
  meta: {
    type: 'composite.CompositePage',
    detail_url: 'http://localhost/api/pages/157/',
    html_url: null,
    slug: 'bulk-downloads',
    show_in_menus: true,
    seo_title: 'Bulk downloads | UKHSA data dashboard',
    search_description: 'Mocked bulk downloads page description',
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
  body: [
    {
      type: 'text',
      value:
        '<p data-block-key="0od86">You can download all the data from the UKHSA data dashboard charts on this page by clicking the Download button. </p><p data-block-key="ea5ul">This is useful if you want to analyse the data using your own tools. </p><p data-block-key="cqg56">The data is available in a zip file format, which has a size of about 70 kB so it should be quick to download even on slower internet connections.</p>',
      id: '5eeefac8-ca5e-4838-b63d-3ecbbba59eed',
    },
    // TODO: Remove once button is fully deprecated
    {
      type: 'button',
      value: {
        text: 'Download',
        loading_text: '',
        endpoint: '/api/bulkdownloads/v1',
        method: 'POST',
        button_type: 'DOWNLOAD',
      },
      id: 'b1b97fd7-8c46-4cf4-bab1-1a3d7ae5a912',
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
}
