import { faker } from '@faker-js/faker'

import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const accessOurDataParentMock: PageResponse<PageType.Composite> = {
  id: 31,
  meta: {
    type: 'composite.CompositePage',
    detail_url: 'http://localhost/api/pages/31/',
    html_url: null,
    slug: 'access-our-data',
    show_in_menus: true,
    seo_title: 'Access our data | UKHSA data dashboard',
    search_description: 'Mocked Access our data page description',
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
  title: 'Access our data',
  date_posted: '2024-02-14',
  body: [
    {
      type: 'text',
      value:
        '<p>Welcome to the Developers Guide for the UKHSA data dashboard API.</p><p>Please see below for instructions initially on how to interact and use our API, as well as swagger API documentation detailing information about each endpoint including parameters and example responses</p>',
      id: faker.string.uuid(),
    },
  ],
  last_published_at: '2023-08-24T16:53:51.464146+01:00',
  related_links: [
    {
      id: 1,
      meta: {
        type: 'topic.TopicPageRelatedLink',
      },
      title: 'View swagger documentation',
      body: '',
      url: 'https://api.dev.ukhsa-dashboard.data.gov.uk/api/swagger/#/',
    },
    {
      id: 2,
      meta: {
        type: 'topic.TopicPageRelatedLink',
      },
      title: 'Contribute to our open source project',
      body: '',
      url: '/',
    },
  ],
}

export const accessOurDataChildMocks: PageResponse<PageType.Composite>[] = [
  {
    id: 32,
    meta: {
      type: 'composite.CompositePage',
      detail_url: 'http://localhost/api/pages/32/',
      html_url: null,
      slug: 'overview',
      show_in_menus: false,
      seo_title: 'Access our data child | UKHSA data dashboard',
      search_description: 'Mocked Access our data page description',
      first_published_at: '2023-05-12T16:51:07.555450+01:00',
      alias_of: null,
      parent: {
        id: 31,
        meta: {
          type: 'composite.CompositePage',
          detail_url: 'http://localhost/api/pages/31/',
          html_url: null,
        },
        title: 'Access our data',
      },
    },
    title: 'Overview',
    date_posted: '2024-02-14',
    body: [
      {
        type: 'text',
        value:
          '<p>The UK Health Security Agency (UKHSA) is responsible for protecting every member of every community from the impact of infectious diseases, chemical, biological, radiological and nuclear incidents and other health threats.</p>' +
          '<p>UKHSA is an executive agency, sponsored by the Department of Health and Social Care</p>' +
          '<p>The UKHSA data dashboard API is designed to support developers and other users to easily extract and save data, that is present in the dashboard. It allows for easy access to data, integration with software, tailed responses for each use case</p>',
        id: faker.string.uuid(),
      },
    ],
    last_published_at: '2023-08-24T16:53:51.464146+01:00',
    related_links: [],
  },
  {
    id: 33,
    meta: {
      type: 'composite.CompositePage',
      detail_url: 'http://localhost/api/pages/33/',
      html_url: null,
      slug: 'what-is-an-api',
      show_in_menus: false,
      seo_title: 'Access our data child | UKHSA data dashboard',
      search_description: 'Mocked Access our data page description',
      first_published_at: '2023-05-12T16:51:07.555450+01:00',
      alias_of: null,
      parent: {
        id: 31,
        meta: {
          type: 'composite.CompositePage',
          detail_url: 'http://localhost/api/pages/31/',
          html_url: null,
        },
        title: 'Access our data',
      },
    },
    title: 'What is an API',
    date_posted: '2024-02-14',
    body: [
      {
        type: 'text',
        value:
          '<p>Application Programming Interface (API) is simply software that sends and receives information back and forth between systems or applications. It is normally used as an interface between two or more systems to allow them to communicate in a commonly agreed format. </p>' +
          '<p>In the case of the UKHSA data dashboard API, we process a very large amount of data from many different sources, including NHS bodies across the UK as well as goverment, we process this data and serve it through our API. UKHSA can then provide meaningful dashboards, built up of a number of different charts & tables of related data.</p>',
        id: faker.string.uuid(),
      },
    ],
    last_published_at: '2023-08-24T16:53:51.464146+01:00',
    related_links: [],
  },
  {
    id: 34,
    meta: {
      type: 'composite.CompositePage',
      detail_url: 'http://localhost/api/pages/34/',
      html_url: null,
      slug: 'getting-started',
      show_in_menus: false,
      seo_title: 'Access our data child | UKHSA data dashboard',
      search_description: 'Mocked Access our data page description',
      first_published_at: '2023-05-12T16:51:07.555450+01:00',
      alias_of: null,
      parent: {
        id: 31,
        meta: {
          type: 'composite.CompositePage',
          detail_url: 'http://localhost/api/pages/31/',
          html_url: null,
        },
        title: 'Access our data',
      },
    },
    title: 'Getting started',
    date_posted: '2024-02-14',
    body: [
      {
        type: 'text',
        value:
          '<h3>What you can do with this API</h3>' +
          '<p>This API is useful for applications that incorporate content from the UKHSA data dasbhoard, and for keeping that content up to date. It provides a more accessible and predictable interface that what can be achieved through scraping HTML pages.</p>' +
          "<h3>What you can't do with this API</h3>" +
          '<p>The content within thie API is limited to data provided in the UKHSA data dashboard, and does not include other websites or areas of gov.uk</p>' +
          '<p>Not all content is available, there will be some selections (such as when filtering by location) that either do not have data yet, or will never have data. UKHSA relies on external data (from NHS/ government sources) for the data dashboard.</p>',
        id: faker.string.uuid(),
      },
    ],
    last_published_at: '2023-08-24T16:53:51.464146+01:00',
    related_links: [],
  },
  {
    id: 35,
    meta: {
      type: 'composite.CompositePage',
      detail_url: 'http://localhost/api/pages/35/',
      html_url: null,
      slug: 'api-authentication',
      show_in_menus: false,
      seo_title: 'Access our data child | UKHSA data dashboard',
      search_description: 'Mocked Access our data page description',
      first_published_at: '2023-05-12T16:51:07.555450+01:00',
      alias_of: null,
      parent: {
        id: 31,
        meta: {
          type: 'composite.CompositePage',
          detail_url: 'http://localhost/api/pages/31/',
          html_url: null,
        },
        title: 'Access our data',
      },
    },
    title: 'API Authentication',
    date_posted: '2024-02-14',
    body: [
      {
        type: 'text',
        value: '<p>At present the UKHSA data dashboard API requires no authentication for its public facing API</p>',
        id: faker.string.uuid(),
      },
    ],
    last_published_at: '2023-08-24T16:53:51.464146+01:00',
    related_links: [],
  },
  {
    id: 36,
    meta: {
      type: 'composite.CompositePage',
      detail_url: 'http://localhost/api/pages/35/',
      html_url: null,
      slug: 'data-structure',
      show_in_menus: false,
      seo_title: 'Access our data child | UKHSA data dashboard',
      search_description: 'Mocked Access our data page description',
      first_published_at: '2023-05-12T16:51:07.555450+01:00',
      alias_of: null,
      parent: {
        id: 31,
        meta: {
          type: 'composite.CompositePage',
          detail_url: 'http://localhost/api/pages/31/',
          html_url: null,
        },
        title: 'Access our data',
      },
    },
    title: 'Data structure',
    date_posted: '2024-02-14',
    body: [
      {
        type: 'text',
        value:
          '<p>The structure of the URL stays the same for each API query, following the filtering selection process. For Example: </p>' +
          '<code>/themes/infectious_disease/sub_themes/respiratory/topics/COVID-19/geography_types/NHS_region/geographies/London/metrics/COVID-19_cases_casesByDay</code>' +
          '<p>The overall category is plural (in this example, themes) which is then followed by the detail selected (in this example, infectious_diseases). You cannot extract all the data across a topic or geography type, the API is designed for you to be selective by data type, topic, geography and metric.</p>',
        id: faker.string.uuid(),
      },
    ],
    last_published_at: '2023-08-24T16:53:51.464146+01:00',
    related_links: [],
  },
]
