import { faker } from '@faker-js/faker'

import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const whatsNewParentMock: PageResponse<PageType.WhatsNewParent> = {
  id: 21,
  meta: {
    seo_title: "What's new | UKHSA data dashboard",
    search_description: '',
    type: 'whats_new.WhatsNewParentPage',
    detail_url: 'http://localhost/api/pages/21/',
    html_url: 'http://localhost/whats-new/',
    slug: 'whats-new',
    show_in_menus: true,
    first_published_at: '2023-10-24T16:09:35.359598+01:00',
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
  show_pagination: true,
  pagination_size: 10,
  seo_change_frequency: 4,
  seo_priority: 0.7,
  last_updated_at: '2024-07-02T12:44:54.461914+01:00',
  title: "What's new",
  date_posted: '2023-10-24',
  body: '<p data-block-key="yjvuu">We regularly update the dashboard with new data and features. Here we&#x27;ll show a timeline of changes that have happened outside of the weekly data refresh.</p>',
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
      html_url: 'http://localhost/whats-new/soft-launch-of-the-ukhsa-data-dashboard',
      slug: 'soft-launch-of-the-ukhsa-data-dashboard',
      show_in_menus: false,
      first_published_at: '2023-10-24T16:10:44.385654+01:00',
      alias_of: null,
      parent: {
        id: 21,
        meta: {
          type: 'whats_new.WhatsNewParentPage',
          detail_url: 'http://localhost:3000/api/pages/21/',
          html_url: null,
        },
        title: "What's new",
      },
    },
    seo_change_frequency: 5,
    seo_priority: 0.4,
    last_updated_at: '2024-07-02T12:44:54.461914+01:00',
    title: 'Soft launch of the UKHSA data dashboard',
    date_posted: '2023-09-26',
    body: '<p data-block-key="tyozk">The UKHSA data dashboard is an iteration of the <a href="https://coronavirus.data.gov.uk/">Coronavirus (COVID-19) in the UK dashboard</a>. The dashboard is launching with data on respiratory viruses, including COVID-19. It will grow to show data on a wider range of health topics. We’ll use feedback from users during the soft launch to improve the service.</p><p data-block-key="brp7b">Once the UKHSA data dashboard passes the government <a href="https://www.gov.uk/service-manual/service-standard">Service Standard</a> assessment, it will replace the COVID-19 dashboard and be the only UKHSA dashboard for public-facing data (including COVID-19 data).</p><p data-block-key="eq6g0">The UKHSA data dashboard is in the initial phase of the government Service Standard assessment and is still undergoing statistical review. For reporting and analytical purposes, continue to use the COVID-19 dashboard.</p>',
    additional_details: '',
    last_published_at: '2023-10-24T16:09:35.359598+01:00',
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
      html_url: 'http://localhost/whats-new/updated-csv-download-and-tabular-data-functionality',
      slug: 'updated-csv-download-and-tabular-data-functionality',
      show_in_menus: false,
      first_published_at: '2023-10-24T17:20:39.627869+01:00',
      alias_of: null,
      parent: {
        id: 21,
        meta: {
          type: 'whats_new.WhatsNewParentPage',
          detail_url: 'http://localhost:3000/api/pages/21/',
          html_url: null,
        },
        title: "What's new",
      },
    },
    seo_change_frequency: 5,
    seo_priority: 0.4,
    last_updated_at: '2024-07-02T12:44:54.461914+01:00',
    title: 'Updated CSV download and tabular data functionality',
    date_posted: '2023-10-04',
    body: '<p data-block-key="3twc0">We’ve added the functionality to download a CSV file of a graph across all pages.</p><p data-block-key="3b1aa">We’ve updated the tabular data to show all the corresponding data points. Additionally, the table is now in descending order, so the most recent data is visible first. We’ve also added the functionality to scroll through the table, so it remains a consistent size on the page.</p>',
    additional_details: '',
    last_published_at: '2023-10-24T16:09:35.359598+01:00',
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
      html_url: 'http://localhost/whats-new/other-respiratory-viruses-data-added-to-the-homepage',
      slug: 'other-respiratory-viruses-data-added-to-the-homepage',
      show_in_menus: false,
      first_published_at: '2023-10-24T17:22:25.297408+01:00',
      alias_of: null,
      parent: {
        id: 21,
        meta: {
          type: 'whats_new.WhatsNewParentPage',
          detail_url: 'http://localhost:3000/api/pages/21/',
          html_url: null,
        },
        title: "What's new",
      },
    },
    seo_change_frequency: 5,
    seo_priority: 0.4,
    last_updated_at: '2024-07-02T12:44:54.461914+01:00',
    title: 'Other respiratory viruses data added to the homepage',
    date_posted: '2023-10-05',
    body: '<p data-block-key="n411d">We’ve added data for other respiratory viruses to the homepage of the dashboard. The homepage of the dashboard shows headline positivity figures for:</p><ul><li data-block-key="ebupn">adenovirus</li><li data-block-key="ak17q">human metapneumovirus (hMPV)</li><li data-block-key="6ua0s">parainfluenza</li><li data-block-key="71h21">rhinovirus</li><li data-block-key="8qg4p">respiratory syncytial virus (RSV)</li></ul><p data-block-key="88a0g">Further data can be found on the <a href="https://ukhsa-dashboard.data.gov.uk/topics/other-respiratory-viruses">other respiratory viruses page</a>.</p>',
    additional_details: '<p data-block-key="vsnf1">Nothing to see here yet</p>',
    last_published_at: '2023-10-24T16:09:35.359598+01:00',
    badge: {
      text: 'Data Issue',
      colour: 'BLUE',
    },
  },
  // Generate a set of random pages for testing of pagination
  ...Array.from({ length: 30 }).map<PageResponse<PageType.WhatsNewChild>>((item, index) => ({
    id: index * 1000,
    meta: {
      seo_title: `What's new child ${index + 1} | UKHSA data dashboard`,
      search_description: '',
      type: 'whats_new.WhatsNewChildEntry',
      detail_url: 'http://localhost/api/pages/24/',
      html_url: `http://localhost/whats-new/whats-new-child-mock-${index + 1}`,
      slug: `whats-new-child-mock-${index + 1}`,
      show_in_menus: false,
      first_published_at: '2023-10-24T17:22:25.297408+01:00',
      alias_of: null,
      parent: {
        id: 21,
        meta: {
          type: 'whats_new.WhatsNewParentPage',
          detail_url: 'http://localhost:3000/api/pages/21/',
          html_url: null,
        },
        title: "What's new",
      },
    },
    seo_change_frequency: 5,
    seo_priority: 0.4,
    last_updated_at: '2024-07-02T12:44:54.461914+01:00',
    title: `What's new child mock ${index + 1}`,
    date_posted: '2023-03-05',
    body: `<p data-block-key="n411d">${faker.lorem.paragraphs()}</p>`,
    additional_details: `<p data-block-key="vsnf1">${faker.lorem.sentence()}</p>`,
    last_published_at: '2023-10-24T16:09:35.359598+01:00',
    badge: {
      text: 'Data Issue',
      colour: 'BLUE',
    },
  })),
]
