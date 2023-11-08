import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

import { relatedLinksMock } from '../elements'

// TODO: Deprecate once v2 whats-new is live
export const whatsNewV1PageMock: PageResponse<PageType.Common> = {
  id: 134,
  meta: {
    type: 'common.CommonPage',
    detail_url: 'http://localhost/api/pages/134/',
    html_url: null,
    slug: 'whats-new',
    show_in_menus: true,
    seo_title: "What's new | UKHSA data dashboard",
    search_description:
      'A list of all the new features and key pieces of data which have been added to the UKHSA data dashboard',
    first_published_at: '2023-05-16T11:46:07.719758+01:00',
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
  title: "What's new",
  date_posted: '2023-05-12',
  body: '<h2 data-block-key="z8uie">March 2023</h2><h3 data-block-key="94s66">2 March 2023 (v5)</h3><p data-block-key="58o2q">The primary navigation items have been updated to focus on viruses included in the dashboard in the place of metrics. The primary navigation items now include ‘Home’ ‘Coronavirus’, ‘Influenza’ and ‘Other respiratory viruses’. </p><h3 data-block-key="67tct">1 March 2023 (v5)</h3><p data-block-key="50b5c">The name of the ‘Interactive maps’ page has been updated to ‘Maps’.</p><p data-block-key="a1i7i"></p><h2 data-block-key="bipvm">February 2023</h2><h3 data-block-key="b2l6r">22 February 2023 (v4)</h3><p data-block-key="amg32">The ‘About’ page has been updated to describe respiratory virus data displayed on the dashboard.</p><h3 data-block-key="7bc4f">17 February 2023 (v4)</h3><p data-block-key="du7uj">A secondary navigation menu has been added which includes additional links about the dashboard data.</p><h3 data-block-key="681kk">16 February 2023 (v4)</h3><p data-block-key="bfoej">The primary navigation menu items have now been updated to include a dropdown menu which lists individual respiratory viruses.</p>',
  last_published_at: '2023-05-12T16:22:06.141697+01:00',
  related_links: relatedLinksMock,
}

export const whatsNewParentMock: PageResponse<PageType.WhatsNewParent> = {
  id: 21,
  meta: {
    seo_title: "What's new | UKHSA data dashboard",
    search_description: '',
    type: 'whats_new.WhatsNewParentPage',
    detail_url: 'http://localhost/api/pages/21/',
    html_url: null,
    slug: 'whats-new-v2',
    show_in_menus: false,
    first_published_at: '2023-10-24T16:09:35.359598+01:00',
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
  title: "What's new",
  date_posted: '2023-10-24',
  body: '<p data-block-key="yjvuu">We regularly update the dashboard with new data and features. Here we&#x27;ll show a timeline of changes that have happened outside of the weekly data refresh.</p>',
  related_links: relatedLinksMock,
  last_published_at: '2023-10-24T16:09:35.359598+01:00',
}

export const whatsNewChildMocks: PageResponse<PageType.WhatsNewChild>[] = [
  {
    id: 22,
    meta: {
      seo_title: "What's new child | UKHSA data dashboard",
      search_description: '',
      type: 'whats_new.WhatsNewChildEntry',
      detail_url: 'http://localhost/api/pages/22/',
      html_url: null,
      slug: 'whats-new-v2/soft-launch-of-the-ukhsa-data-dashboard',
      show_in_menus: false,
      first_published_at: '2023-10-24T16:10:44.385654+01:00',
      alias_of: null,
      parent: {
        id: 21,
        meta: {
          type: 'whats_new.WhatsNewParentPage',
          detail_url: 'http://localhost/api/pages/21/',
          html_url: null,
        },
        title: "What's new",
      },
    },
    title: 'Soft launch of the UKHSA data dashboard',
    date_posted: '2023-09-26',
    body: '<p data-block-key="tyozk">The UKHSA data dashboard is an iteration of the <a href="https://coronavirus.data.gov.uk/">Coronavirus (COVID-19) in the UK dashboard</a>. The dashboard is launching with data on respiratory viruses, including COVID-19. It will grow to show data on a wider range of health topics. We’ll use feedback from users during the soft launch to improve the service.</p><p data-block-key="brp7b">Once the UKHSA data dashboard passes the government <a href="https://www.gov.uk/service-manual/service-standard">Service Standard</a> assessment, it will replace the COVID-19 dashboard and be the only UKHSA dashboard for public-facing data (including COVID-19 data).</p><p data-block-key="eq6g0">The UKHSA data dashboard is in the initial phase of the government Service Standard assessment and is still undergoing statistical review. For reporting and analytical purposes, continue to use the COVID-19 dashboard.</p>',
    additional_details: '',
    badge: {
      text: 'New Feature',
      colour: 'GREY',
    },
  },
  {
    id: 23,
    meta: {
      seo_title: "What's new child | UKHSA data dashboard",
      search_description: '',
      type: 'whats_new.WhatsNewChildEntry',
      detail_url: 'http://localhost/api/pages/23/',
      html_url: null,
      slug: 'whats-new-v2/updated-csv-download-and-tabular-data-functionality',
      show_in_menus: false,
      first_published_at: '2023-10-24T17:20:39.627869+01:00',
      alias_of: null,
      parent: {
        id: 21,
        meta: {
          type: 'whats_new.WhatsNewParentPage',
          detail_url: 'http://localhost/api/pages/21/',
          html_url: null,
        },
        title: "What's new",
      },
    },
    title: 'Updated CSV download and tabular data functionality',
    date_posted: '2023-10-04',
    body: '<p data-block-key="3twc0">We’ve added the functionality to download a CSV file of a graph across all pages.</p><p data-block-key="3b1aa">We’ve updated the tabular data to show all the corresponding data points. Additionally, the table is now in descending order, so the most recent data is visible first. We’ve also added the functionality to scroll through the table, so it remains a consistent size on the page.</p>',
    additional_details: '',
    badge: {
      text: 'New Feature',
      colour: 'GREY',
    },
  },
  {
    id: 24,
    meta: {
      seo_title: "What's new child | UKHSA data dashboard",
      search_description: '',
      type: 'whats_new.WhatsNewChildEntry',
      detail_url: 'http://localhost/api/pages/24/',
      html_url: null,
      slug: 'whats-new-v2/other-respiratory-viruses-data-added-to-the-homepage',
      show_in_menus: false,
      first_published_at: '2023-10-24T17:22:25.297408+01:00',
      alias_of: null,
      parent: {
        id: 21,
        meta: {
          type: 'whats_new.WhatsNewParentPage',
          detail_url: 'http://localhost/api/pages/21/',
          html_url: null,
        },
        title: "What's new",
      },
    },
    title: 'Other respiratory viruses data added to the homepage',
    date_posted: '2023-10-05',
    body: '<p data-block-key="n411d">We’ve added data for other respiratory viruses to the homepage of the dashboard. The homepage of the dashboard shows headline positivity figures for:</p><ul><li data-block-key="ebupn">adenovirus</li><li data-block-key="ak17q">human metapneumovirus (hMPV)</li><li data-block-key="6ua0s">parainfluenza</li><li data-block-key="71h21">rhinovirus</li><li data-block-key="8qg4p">respiratory syncytial virus (RSV)</li></ul><p data-block-key="88a0g">Further data can be found on the <a href="https://ukhsa-dashboard.data.gov.uk/topics/other-respiratory-viruses">other respiratory viruses page</a>.</p>',
    additional_details: '<p data-block-key="vsnf1">Nothing to see here yet</p>',
    badge: {
      text: 'Data Issue',
      colour: 'BLUE',
    },
  },
]
