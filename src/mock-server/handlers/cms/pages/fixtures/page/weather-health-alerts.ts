import { faker } from '@faker-js/faker'

import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const weatherHealthAlertsParentMock: PageResponse<PageType.Composite> = {
  id: 40,
  meta: {
    type: 'composite.CompositePage',
    detail_url: 'http://localhost:3000/api/pages/40/',
    html_url: 'http://localhost:3000/weather-health-alerts',
    slug: 'weather-health-alerts',
    show_in_menus: false,
    seo_title: 'Weather health alerts | UKHSA data dashboard',
    search_description: 'Mocked weather health alerts page description',
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
  seo_priority: 0.8,
  last_updated_at: '2024-07-02T12:44:54.461914+01:00',
  title: 'Weather health alerts',
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
  related_links_layout: 'Sidebar',
}

export const weatherHealthAlertsChildMocks: PageResponse<PageType.Composite>[] = [
  {
    id: 41,
    meta: {
      type: 'composite.CompositePage',
      detail_url: 'http://localhost:3000/api/pages/41/',
      html_url: 'http://localhost:3000/weather-health-alerts/cold',
      slug: 'cold',
      show_in_menus: false,
      seo_title: 'Cold health alerts | UKHSA data dashboard',
      search_description: 'View all cold health alerts currently in place in England',
      first_published_at: '2023-05-12T16:51:07.555450+01:00',
      alias_of: null,
      parent: {
        id: 40,
        meta: {
          type: 'composite.CompositePage',
          detail_url: 'http://localhost:3000/api/pages/40/',
          html_url: null,
        },
        title: 'Weather health alerts',
      },
    },
    seo_change_frequency: 5,
    seo_priority: 0.9,
    last_updated_at: '2024-07-02T12:44:54.461914+01:00',
    title: 'Cold health alerts',
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
          type: 'topic.TopicPageRelatedLink',
        },
        title: 'User guide to use the impact based Weather-Health Alerts',
        body: '',
        url: 'https://assets.publishing.service.gov.uk/media/653f84ff80884d0013f71d1b/User-guide-impact-based-weather-and-health-alerting-system.pdf',
      },
    ],
    related_links_layout: 'Sidebar',
  },
  {
    id: 42,
    meta: {
      type: 'composite.CompositePage',
      detail_url: 'http://localhost:3000/api/pages/42/',
      html_url: 'http://localhost:3000/weather-health-alerts/heat',
      slug: 'heat',
      show_in_menus: false,
      seo_title: 'Heat health alerts | UKHSA data dashboard',
      search_description: 'View all heat health alerts currently in place in England',
      first_published_at: '2023-05-12T16:51:07.555450+01:00',
      alias_of: null,
      parent: {
        id: 40,
        meta: {
          type: 'composite.CompositePage',
          detail_url: 'http://localhost:3000/api/pages/40/',
          html_url: null,
        },
        title: 'Weather health alerts',
      },
    },
    seo_change_frequency: 5,
    seo_priority: 0.9,
    last_updated_at: '2024-07-02T12:44:54.461914+01:00',
    title: 'Heat health alerts',
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
          type: 'topic.TopicPageRelatedLink',
        },
        title: 'User guide to use the impact based Weather-Health Alerts',
        body: '',
        url: 'https://assets.publishing.service.gov.uk/media/653f84ff80884d0013f71d1b/User-guide-impact-based-weather-and-health-alerting-system.pdf',
      },
    ],
    active_announcements: [],
    related_links_layout: 'Sidebar',
  },
]
