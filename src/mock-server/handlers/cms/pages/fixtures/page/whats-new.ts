import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

import { relatedLinksMock } from '../elements/related-links'

export const whatsNewPageMock: PageResponse<PageType.Common> = {
  id: 134,
  meta: {
    type: 'common.CommonPage',
    detail_url: 'http://localhost/api/pages/134/',
    html_url: null,
    slug: 'whats-new',
    show_in_menus: false,
    seo_title: "What's New",
    search_description: '',
    first_published_at: '2023-05-12T14:51:37.489405+01:00',
    alias_of: null,
    parent: {
      id: 127,
      meta: {
        type: 'home.HomePage',
        detail_url: 'http://localhost/api/pages/127/',
        html_url: null,
      },
      title: 'Respiratory viruses',
    },
  },
  title: "What's New",
  date_posted: '2023-05-12',
  body: '<h2 data-block-key="z8uie">March 2023</h2><h3 data-block-key="94s66">2 March 2023 (v5)</h3><p data-block-key="58o2q">The primary navigation items have been updated to focus on viruses included in the dashboard in the place of metrics. The primary navigation items now include ‘Home’ ‘Coronavirus’, ‘Influenza’ and ‘Other respiratory viruses’. </p><h3 data-block-key="67tct">1 March 2023 (v5)</h3><p data-block-key="50b5c">The name of the ‘Interactive maps’ page has been updated to ‘Maps’.</p><p data-block-key="a1i7i"></p><h2 data-block-key="bipvm">February 2023</h2><h3 data-block-key="b2l6r">22 February 2023 (v4)</h3><p data-block-key="amg32">The ‘About’ page has been updated to describe respiratory virus data displayed on the dashboard.</p><h3 data-block-key="7bc4f">17 February 2023 (v4)</h3><p data-block-key="du7uj">A secondary navigation menu has been added which includes additional links about the dashboard data.</p><h3 data-block-key="681kk">16 February 2023 (v4)</h3><p data-block-key="bfoej">The primary navigation menu items have now been updated to include a dropdown menu which lists individual respiratory viruses.</p>',
  last_published_at: '2023-05-12T16:22:06.141697+01:00',
  related_links: relatedLinksMock,
}
