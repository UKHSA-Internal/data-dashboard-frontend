import { faker } from '@faker-js/faker'

import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const accessOurDataParentMock: PageResponse<PageType.Composite> = {
  id: 31,
  meta: {
    type: 'composite.CompositePage',
    detail_url: 'http://localhost:3000/api/pages/31/',
    html_url: 'http://localhost:3000/access-our-data',
    slug: 'access-our-data',
    show_in_menus: true,
    seo_title: 'Access our data | UKHSA data dashboard',
    search_description: 'Mocked Access our data page description',
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
  title: 'Access our data',
  body: [
    {
      type: 'text',
      value:
        '<p data-block-key="zo3gr">Welcome to the developers guide for the UKHSA data dashboard API.</p><p data-block-key="cj8br"></p><p data-block-key="6v1v4">Please see below for instructions initially on how to interact and use our API, as well as swagger API documentation detailing information about each endpoint including parameters and example response.</p>',
      id: 'dc4cfcb9-9f54-4a5f-ad28-1a0edf86c873',
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
  related_links_layout: 'Sidebar',
}

export const accessOurDataChildMocks: PageResponse<PageType.Composite>[] = [
  {
    id: 32,
    meta: {
      type: 'composite.CompositePage',
      detail_url: 'http://localhost:3000/api/pages/32/',
      html_url: 'http://localhost:3000/access-our-data/overview',
      slug: 'overview',
      show_in_menus: false,
      seo_title: 'Overview - Access our data | UKHSA data dashboard',
      search_description: 'Mocked Access our data page description',
      first_published_at: '2023-05-12T16:51:07.555450+01:00',
      alias_of: null,
      parent: {
        id: 31,
        meta: {
          type: 'composite.CompositePage',
          detail_url: 'http://localhost:3000/api/pages/31/',
          html_url: null,
        },
        title: 'Access our data',
      },
    },
    seo_change_frequency: 5,
    seo_priority: 0.5,
    last_updated_at: '2024-07-02T12:44:54.461914+01:00',
    title: 'Overview',
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
    related_links_layout: 'Sidebar',
  },
  {
    id: 33,
    meta: {
      type: 'composite.CompositePage',
      detail_url: 'http://localhost:3000/api/pages/33/',
      html_url: 'http://localhost:3000/access-our-data/what-is-an-api',
      slug: 'what-is-an-api',
      show_in_menus: false,
      seo_title: 'What is an API - Access our data | UKHSA data dashboard',
      search_description: 'Mocked Access our data page description',
      first_published_at: '2023-05-12T16:51:07.555450+01:00',
      alias_of: null,
      parent: {
        id: 31,
        meta: {
          type: 'composite.CompositePage',
          detail_url: 'http://localhost:3000/api/pages/31/',
          html_url: null,
        },
        title: 'Access our data',
      },
    },
    seo_change_frequency: 5,
    seo_priority: 0.5,
    last_updated_at: '2024-07-02T12:44:54.461914+01:00',
    title: 'What is an API',
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
    related_links_layout: 'Sidebar',
  },
  {
    id: 34,
    meta: {
      type: 'composite.CompositePage',
      detail_url: 'http://localhost:3000/api/pages/34/',
      html_url: 'http://localhost:3000/access-our-data/getting-started',
      slug: 'getting-started',
      show_in_menus: false,
      seo_title: 'Getting started - Access our data | UKHSA data dashboard',
      search_description: 'Mocked Access our data page description',
      first_published_at: '2023-05-12T16:51:07.555450+01:00',
      alias_of: null,
      parent: {
        id: 31,
        meta: {
          type: 'composite.CompositePage',
          detail_url: 'http://localhost:3000/api/pages/31/',
          html_url: null,
        },
        title: 'Access our data',
      },
    },
    seo_change_frequency: 5,
    seo_priority: 0.5,
    last_updated_at: '2024-07-02T12:44:54.461914+01:00',
    title: 'Getting started',
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
      {
        type: 'code_block',
        value: {
          heading: 'Setup your first UKHSA data dashboard API call',
          content: [
            {
              type: 'code_snippet',
              value: {
                language: 'javascript',
                code: 'const endpoint =\r\n  "https://api.coronavirus.data.gov.uk/v1/data?" +\r\n  "filters=areaType=nation;areaName=england&" +\r\n  \'structure={"date":"date", "newCases":"newCaseByPublishDate"}\';\r\n\r\nconst getData = async (url) => {\r\n  const { data, status, statusText } = await get(url, { timeout: 1000 });\r\n\r\n  if (status >= 400) throw new Error(statusText);\r\n\r\n  return data;\r\n};',
              },
              id: 'e0b8aeb4-12ef-4b79-b723-071879eae1aa',
            },
            {
              type: 'code_snippet',
              value: {
                language: 'python',
                code: 'ALLOWABLE_BODY_CONTENT_COMPOSITE = StreamField(\r\n    [\r\n        (\r\n            "text",\r\n            RichTextBlock(\r\n                features=AVAILABLE_RICH_TEXT_FEATURES_COMPOSITE,\r\n                help_text=help_texts.REQUIRED_BODY_FIELD,\r\n                required=True\r\n            ),\r\n        ),\r\n        ("button", blocks.ButtonChooserBlock("snippets.button", required=False)),\r\n        ("code_block", sections.CodeExample(help_texts="placeholder code block single example multiple languages possible")),\r\n    ],\r\n    block_counts={"button": {"max_num": 1}},\r\n    use_json_field=True,\r\n)',
              },
              id: 'eed43b5e-4217-49b0-88d1-773c6aec9b07',
            },
          ],
        },
        id: 'dfdc74cb-c780-4f99-a2a1-45e1eb31baab',
      },
    ],
    last_published_at: '2023-08-24T16:53:51.464146+01:00',
    related_links: [],
    related_links_layout: 'Sidebar',
  },
  {
    id: 35,
    meta: {
      type: 'composite.CompositePage',
      detail_url: 'http://localhost:3000/api/pages/35/',
      html_url: 'http://localhost:3000/access-our-data/api-authentication',
      slug: 'api-authentication',
      show_in_menus: false,
      seo_title: 'API Authentication - Access our data | UKHSA data dashboard',
      search_description: 'Mocked Access our data page description',
      first_published_at: '2023-05-12T16:51:07.555450+01:00',
      alias_of: null,
      parent: {
        id: 31,
        meta: {
          type: 'composite.CompositePage',
          detail_url: 'http://localhost:3000/api/pages/31/',
          html_url: null,
        },
        title: 'Access our data',
      },
    },
    seo_change_frequency: 5,
    seo_priority: 0.5,
    last_updated_at: '2024-07-02T12:44:54.461914+01:00',
    title: 'API Authentication',
    body: [
      {
        type: 'text',
        value: '<p>At present the UKHSA data dashboard API requires no authentication for its public facing API</p>',
        id: faker.string.uuid(),
      },
    ],
    last_published_at: '2023-08-24T16:53:51.464146+01:00',
    related_links: [],
    related_links_layout: 'Sidebar',
  },
  {
    id: 36,
    meta: {
      type: 'composite.CompositePage',
      detail_url: 'http://localhost:3000/api/pages/35/',
      html_url: 'http://localhost:3000/access-our-data/data-structure',
      slug: 'data-structure',
      show_in_menus: false,
      seo_title: 'Data structure - Access our data | UKHSA data dashboard',
      search_description: 'Mocked Access our data page description',
      first_published_at: '2023-05-12T16:51:07.555450+01:00',
      alias_of: null,
      parent: {
        id: 31,
        meta: {
          type: 'composite.CompositePage',
          detail_url: 'http://localhost:3000/api/pages/31/',
          html_url: null,
        },
        title: 'Access our data',
      },
    },
    seo_change_frequency: 5,
    seo_priority: 0.5,
    last_updated_at: '2024-07-02T12:44:54.461914+01:00',
    title: 'Data structure',
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
    related_links_layout: 'Sidebar',
  },
]
