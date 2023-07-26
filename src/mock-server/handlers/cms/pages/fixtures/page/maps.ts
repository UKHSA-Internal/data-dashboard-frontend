import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

import { relatedLinksMock } from '../elements/related-links'

export const mapsPageMock: PageResponse<PageType.Common> = {
  id: 143,
  meta: {
    type: 'common.CommonPage',
    detail_url: 'http://localhost/api/pages/143/',
    html_url: null,
    slug: 'maps',
    show_in_menus: false,
    seo_title: 'Maps | UKHSA data dashboard',
    search_description: 'Geographical illustration of the various topics provided across the UKHSA data dashboard',
    first_published_at: '2023-05-12T16:33:40.460981+01:00',
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
  title: 'Maps',
  date_posted: '2023-05-12',
  body: '<h2 data-block-key="stgdb">Cases</h2><p data-block-key="cedk7">Map data and insights from the UKHSA on Coronavirus cases. See the simple summary for England (opens in a new tab).</p><p data-block-key="oi03">This map shows 7-day case rates per 100,000 people.</p><p data-block-key="ch264">The default view shows data by local authority. Zoom in for more local data.<br/></p><p data-block-key="atglm"><b>Case rate per 100,000 people for 7-day period ending on 15 April 2023:<br/></b></p><p data-block-key="5fuf7"></p><h2 data-block-key="9n79o"><b>Case rates</b></h2><p data-block-key="aonk5">Case rates are shown per 100,000 people for the 7-day period ending on the date shown. We calculate this by dividing the 7-day total by the area population and multiplying by 100,000.</p><p data-block-key="5oos9">This makes it easier to compare cases across areas of different population size.</p><p data-block-key="7u45v">The population used is the mid-2020 population estimate from the Office for National Statistics.</p><p data-block-key="b2f4q">Definitions of cases vary by nation. For example, not all nations include lateral flow testing in their case counts.</p><p data-block-key="8ncrl"></p><h2 data-block-key="5b30o">Data not shown</h2><p data-block-key="bchus">There are 2 reasons why data may not be shown:</p><ul><li data-block-key="f2e5i">for areas with fewer than 3 cases at MSOA level, we do not show data to protect individuals&#x27; identities.</li><li data-block-key="esslq">data may be missing, for example because it is delayed or unavailable. If you zoom in to MSOA level, data for Northern Ireland, Scotland and Wales are not available.</li></ul><p data-block-key="faj5j"></p><h2 data-block-key="fmmat">Map areas</h2><p data-block-key="1e5d8">Find your area by using the postcode search or the zoom. The map shows data for different area types:</p><ul><li data-block-key="dmttu">local authorities. These are divided into Upper Tier Local Authorities (UTLA) and Lower Tier Local Authorities (LTLA) for areas with 2 tiers of local government, such as county council (upper tier) and district council (lower tier).</li><li data-block-key="5e0k0">Middle layer Super Output Areas (MSOA). These areas are smaller than local authorities, so show data at the most local level.</li></ul>',
  last_published_at: '2023-05-12T16:48:31.911722+01:00',
  related_links: relatedLinksMock,
}
