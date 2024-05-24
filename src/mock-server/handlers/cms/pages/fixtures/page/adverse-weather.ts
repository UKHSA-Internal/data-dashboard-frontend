import { faker } from '@faker-js/faker'

import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const adverseWeatherParentMock: PageResponse<PageType.Composite> = {
  id: 40,
  meta: {
    type: 'composite.CompositePage',
    detail_url: 'http://localhost/api/pages/40/',
    html_url: null,
    slug: 'adverse-weather',
    show_in_menus: false,
    seo_title: 'Adverse weather | UKHSA data dashboard',
    search_description: 'Mocked adverse weather page description',
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
  title: 'Adverse weather',
  date_posted: '2024-05-23',
  body: [
    {
      type: 'text',
      value:
        '<p>Summary of weather health alerts data in England. For more detailed data, go to the individual event pages. The Weather-Health Alerting System is provided by the UK Health Security Agency (UKHSA) in partnership with the Met Office.</p>',
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
      title: 'Cold weather and Health: supporting vulnerable people',
      body: '',
      url: 'https://www.gov.uk/government/publications/cold-weather-and-health-supporting-vulnerable-people',
    },
    {
      id: 2,
      meta: {
        type: 'topic.TopicPageRelatedLink',
      },
      title: 'User guide to use the impact based Weather-Health Alerts',
      body: '',
      url: 'https://assets.publishing.service.gov.uk/media/653f84ff80884d0013f71d1b/User-guide-impact-based-weather-and-health-alerting-system.pdf',
    },
  ],
}

export const adverseWeatherChildMocks: PageResponse<PageType.Composite>[] = [
  {
    id: 41,
    meta: {
      type: 'composite.CompositePage',
      detail_url: 'http://localhost/api/pages/41/',
      html_url: null,
      slug: 'cold-health-alerts',
      show_in_menus: false,
      seo_title: 'Cold health alerts | UKHSA data dashboard',
      search_description: 'Mocked Cold health alerts page description',
      first_published_at: '2023-05-12T16:51:07.555450+01:00',
      alias_of: null,
      parent: {
        id: 40,
        meta: {
          type: 'composite.CompositePage',
          detail_url: 'http://localhost/api/pages/40/',
          html_url: null,
        },
        title: 'Adverse weather',
      },
    },
    title: 'Cold health alerts',
    date_posted: '2024-05-23',
    body: [
      {
        type: 'text',
        value:
          '<p>The alerting system provides an early warning when adverse temperatures are likely to impact on the health and wellbeing of the population. The Weather-Health Alerting System is provided by the UK Health Security Agency (UKHSA) in partnership with the Met Office. It’s intended to provide early warning to the health and social care sector, the responder community, the voluntary and community sector and government departments when adverse temperatures are likely to impact on the health and wellbeing of the population. The Weather-Health Alerting System is made up of the Heat-Health Alerts (HHA) and the Cold-Health Alerts (CHA). The Weather-Health Alerting System underpins the Adverse Weather and Health Plan.</p>',
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
        title: 'Cold weather and Health: supporting vulnerable people',
        body: '',
        url: 'https://www.gov.uk/government/publications/cold-weather-and-health-supporting-vulnerable-people',
      },
      {
        id: 2,
        meta: {
          type: 'User guide to use the impact based Weather-Health Alerts',
        },
        title:
          'https://assets.publishing.service.gov.uk/media/653f84ff80884d0013f71d1b/User-guide-impact-based-weather-and-health-alerting-system.pdf',
        body: '',
        url: '/',
      },
    ],
  },
  {
    id: 42,
    meta: {
      type: 'composite.CompositePage',
      detail_url: 'http://localhost/api/pages/42/',
      html_url: null,
      slug: 'heat-health-alerts',
      show_in_menus: false,
      seo_title: 'Heat health alerts | UKHSA data dashboard',
      search_description: 'Mocked Heat health alerts page description',
      first_published_at: '2023-05-12T16:51:07.555450+01:00',
      alias_of: null,
      parent: {
        id: 40,
        meta: {
          type: 'composite.CompositePage',
          detail_url: 'http://localhost/api/pages/40/',
          html_url: null,
        },
        title: 'Adverse weather',
      },
    },
    title: 'Heat health alerts',
    date_posted: '2024-05-23',
    body: [
      {
        type: 'text',
        value:
          '<p>The alerting system provides an early warning when adverse temperatures are likely to impact on the health and wellbeing of the population. The Weather-Health Alerting System is provided by the UK Health Security Agency (UKHSA) in partnership with the Met Office. It’s intended to provide early warning to the health and social care sector, the responder community, the voluntary and community sector and government departments when adverse temperatures are likely to impact on the health and wellbeing of the population. The Weather-Health Alerting System is made up of the Heat-Health Alerts (HHA) and the Cold-Health Alerts (CHA). The Weather-Health Alerting System underpins the Adverse Weather and Health Plan.</p>',
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
        title: 'Cold weather and Health: supporting vulnerable people',
        body: '',
        url: 'https://www.gov.uk/government/publications/cold-weather-and-health-supporting-vulnerable-people',
      },
      {
        id: 2,
        meta: {
          type: 'User guide to use the impact based Weather-Health Alerts',
        },
        title:
          'https://assets.publishing.service.gov.uk/media/653f84ff80884d0013f71d1b/User-guide-impact-based-weather-and-health-alerting-system.pdf',
        body: '',
        url: '/',
      },
    ],
  },
]
