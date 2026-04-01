import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const authErrorMock: PageResponse<PageType.AuthError> = {
  id: 85,
  meta: {
    seo_title: 'Authentication Error',
    search_description: '',
    type: 'error.ErrorPage',
    detail_url: 'https://localhost/api/pages/85/',
    html_url: 'https://localhost/authentication-error/',
    slug: 'authentication-error',
    show_in_menus: false,
    first_published_at: '2026-03-30T14:52:12.862944+01:00',
    alias_of: null,
    parent: {
      id: 3,
      meta: {
        type: 'home.UKHSARootPage',
        detail_url: 'https://localhost/api/pages/3/',
        html_url: null,
      },
      title: 'UKHSA Dashboard Root',
    },
  },
  title: 'Failed to sign in',
  seo_change_frequency: 5,
  seo_priority: 0.5,
  last_updated_at: '2026-03-30T14:52:12.862944+01:00',
  last_published_at: '2026-03-30T14:52:12.862944+01:00',
  active_announcements: [],
  error_line: 'An error occurred that meant we were unable to authenticate you.',
  error_text:
    '<p data-block-key="genyw">Reason sign in may have failed:</p><ul><li data-block-key="7tar0">You are not authorised to access the data on this dashboard</li><li data-block-key="5tvaa">Your internet connection may have dropped</li><li data-block-key="ce6si">An unknown error occurred during the sign in process</li></ul>',
  sub_text:
    '<p data-block-key="1bc9h">If you think you have the required authorisation to access the dashboard, please try again and make sure your internet connection is stable. If the problem continues, contact support.</p>',
  related_links_layout: 'Footer',
  related_links: [
    {
      id: 1,
      meta: {
        type: 'error.ErrorPageRelatedLink',
      },
      title: 'Link 1',
      url: 'https://www.google.com',
      body: '<p data-block-key="yjvpv">This is a link</p>',
    },
    {
      id: 2,
      meta: {
        type: 'error.ErrorPageRelatedLink',
      },
      title: 'Link 2',
      url: 'https://www.google.com',
      body: '<p data-block-key="yjvpv">sfsfsdf</p>',
    },
  ],
}
