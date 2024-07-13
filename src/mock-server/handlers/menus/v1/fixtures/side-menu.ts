import { faker } from '@faker-js/faker'

import { Response } from '@/api/requests/menus/getMenu'

export const sideMenu: Response = {
  active_menu: [
    {
      type: 'row',
      value: {
        columns: [
          {
            type: 'column',
            value: {
              heading: '',
              links: {
                primary_link: {
                  title: 'Homepage',
                  body: '',
                  page: faker.number.int(),
                  html_url: 'https://my-prefix.dev.ukhsa-dashboard.data.gov.uk/',
                },
                secondary_links: [
                  {
                    type: 'secondary_link',
                    value: {
                      title: 'COVID-19',
                      body: '<p data-block-key="m285q">Flu ICU and HCU admissions and other statistics</p>',
                      page: 6,
                      html_url: 'https://my-prefix.dev.ukhsa-dashboard.data.gov.uk/topics/covid-19/',
                    },
                    id: 'e4411632-4c3f-455a-bcfc-1e8253638f6b',
                  },
                  {
                    type: 'secondary_link',
                    value: {
                      title: 'Influenza',
                      body: '<p data-block-key="m285q">Flu ICU and HCU admissions and other statistics</p>',
                      page: 6,
                      html_url: 'https://my-prefix.dev.ukhsa-dashboard.data.gov.uk/topics/influenza/',
                    },
                    id: 'e4411632-4c3f-455a-bcfc-1e8253638f6b',
                  },
                  {
                    type: 'secondary_link',
                    value: {
                      title: 'Other respiratory viruses',
                      body: '<p data-block-key="m285q">Other common respiratory viruses including adenovirus, hMPV &amp; parainfluenza.</p>',
                      page: 7,
                      html_url: 'https://my-prefix.dev.ukhsa-dashboard.data.gov.uk/topics/other-respiratory-viruses/',
                    },
                    id: 'bf0bdc55-af63-4d34-990d-0a3d19812eee',
                  },
                ],
              },
            },
            id: '039edb87-ebc9-466d-838d-6f4fdf86767a',
          },
        ],
      },
      id: 'd083f3da-b342-4d12-a4b1-3fa4571d514c',
    },
    {
      type: 'row',
      value: {
        columns: [
          {
            type: 'column',
            value: {
              heading: '',
              links: {
                primary_link: {
                  title: 'Weather health alerts',
                  body: '',
                  page: faker.number.int(),
                  html_url: 'https://my-prefix.dev.ukhsa-dashboard.data.gov.uk/weather-health-alerts',
                },
                secondary_links: [],
              },
            },
            id: faker.string.uuid(),
          },
        ],
      },
      id: faker.string.uuid(),
    },
    {
      type: 'row',
      value: {
        columns: [
          {
            type: 'column',
            value: {
              heading: '',
              links: {
                primary_link: {
                  title: 'About',
                  body: '',
                  page: faker.number.int(),
                  html_url: 'https://my-prefix.dev.ukhsa-dashboard.data.gov.uk/about',
                },
                secondary_links: [],
              },
            },
            id: faker.string.uuid(),
          },
        ],
      },
      id: faker.string.uuid(),
    },
    {
      type: 'row',
      value: {
        columns: [
          {
            type: 'column',
            value: {
              heading: '',
              links: {
                primary_link: {
                  title: 'Bulk downloads',
                  body: '',
                  page: faker.number.int(),
                  html_url: 'https://my-prefix.dev.ukhsa-dashboard.data.gov.uk/bulk-downloads',
                },
                secondary_links: [],
              },
            },
            id: faker.string.uuid(),
          },
        ],
      },
      id: faker.string.uuid(),
    },
    {
      type: 'row',
      value: {
        columns: [
          {
            type: 'column',
            value: {
              heading: '',
              links: {
                primary_link: {
                  title: 'Access our data',
                  body: '',
                  page: faker.number.int(),
                  html_url: 'https://my-prefix.dev.ukhsa-dashboard.data.gov.uk/access-our-data',
                },
                secondary_links: [],
              },
            },
            id: faker.string.uuid(),
          },
        ],
      },
      id: faker.string.uuid(),
    },
    {
      type: 'row',
      value: {
        columns: [
          {
            type: 'column',
            value: {
              heading: '',
              links: {
                primary_link: {
                  title: "What's new",
                  body: '',
                  page: faker.number.int(),
                  html_url: 'https://my-prefix.dev.ukhsa-dashboard.data.gov.uk/whats-new',
                },
                secondary_links: [],
              },
            },
            id: faker.string.uuid(),
          },
        ],
      },
      id: faker.string.uuid(),
    },
    {
      type: 'row',
      value: {
        columns: [
          {
            type: 'column',
            value: {
              heading: '',
              links: {
                primary_link: {
                  title: 'Metrics documentation',
                  body: '',
                  page: faker.number.int(),
                  html_url: 'https://my-prefix.dev.ukhsa-dashboard.data.gov.uk/metrics-documentation',
                },
                secondary_links: [],
              },
            },
            id: faker.string.uuid(),
          },
        ],
      },
      id: faker.string.uuid(),
    },
  ],
}
