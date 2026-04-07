import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

import { relatedLinksMock } from '../elements/related-links'

// The non-public dashboard signup page
export const startPageMock: PageResponse<PageType.Common> = {
  id: 220,
  meta: {
    type: 'common.CommonPage',
    detail_url: 'http://localhost/api/pages/220/',
    html_url: 'http://localhost/start/',
    slug: 'start',
    show_in_menus: false,
    seo_title: 'Sign in | UKHSA data dashboard',
    search_description: 'Sign in to access restricted UKHSA data dashboard content.',
    first_published_at: '2024-01-15T10:00:00.000000+01:00',
    alias_of: null,
    parent: {
      id: 3,
      meta: {
        type: 'home.LandingPage',
        detail_url: 'http://localhost/api/pages/3/',
        html_url: null,
      },
      title: 'UKHSA Dashboard Root',
    },
  },
  seo_change_frequency: 5,
  seo_priority: 0.5,
  last_updated_at: '2025-02-13T17:13:44.241609Z',
  title: 'Sign in to the UKHSA data dashboard',
  body: '<p>The UKHSA Data Dashboard provides secure access to critical public health data and insights.</p><p>To view restricted datasets and reports, you need to sign in with an approved account.</p><h2>How to access</h2><ul><li>Click the button below to sign in using your credentials.</li><li>If you do not have access but believe you should, contact your administrator.</li></ul>',
  last_published_at: '2024-01-15T10:00:00.000000+01:00',
  related_links: relatedLinksMock,
  related_links_layout: 'Footer',
}
