import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const landingPageMock: PageResponse<PageType.Landing> = {
  id: 79,
  meta: {
    seo_title: 'UKHSA data dashboard',
    search_description: 'Overall summary of the respiratory viruses in circulation within the UK',
    type: 'home.LandingPage',
    detail_url: '/api/pages/79/',
    html_url: 'http://localhost:3000/landing-page',
    slug: 'landing-page',
    show_in_menus: false,
    first_published_at: '2024-09-30T11:41:36.884029+01:00',
    alias_of: null,
    parent: {
      id: 3,
      meta: {
        type: 'home.UKHSARootPage',
        detail_url: '/api/pages/3/',
        html_url: null,
      },
      title: 'UKHSA Dashboard Root',
    },
  },
  title: 'Landing page',
  seo_change_frequency: 5,
  seo_priority: 0.5,
  last_updated_at: '2024-09-30T11:41:36.884029+01:00',
  sub_title: 'showing public health data across England',
  body: [
    {
      type: 'section',
      value: {
        heading: 'Respiratory viruses',
        page_link: null,
        content: [
          {
            type: 'chart_card_section',
            value: {
              cards: [
                {
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'COVID-19',
                    sub_title: 'Cases reported',
                    tag_manager_event_id: '',
                    topic_page: 'http://localhost:3000/topics/covid-19/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'COVID-19_cases_countRollingMean',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          stratum: 'default',
                          chart_type: 'line_single_simplified',
                        },
                        id: '0cb2a953-8737-4978-9886-d3943b76820a',
                      },
                    ],
                  },
                  id: '8b2ca8aa-7bdb-4c47-835c-dc1c09f767cf',
                },
                {
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'Influenza',
                    sub_title: 'Healthcare admission rates',
                    tag_manager_event_id: '',
                    topic_page: 'http://localhost:3000/topics/influenza/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'influenza_healthcare_ICUHDUadmissionRateByWeek',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          stratum: 'default',
                          chart_type: 'line_single_simplified',
                        },
                        id: '7423460c-aa0c-482d-8fd5-ab9c62396657',
                      },
                    ],
                  },
                  id: 'b7b37be5-8bc0-4f88-8310-7a91430b7993',
                },
                {
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'RSV',
                    sub_title: 'Healthcare admission rates',
                    tag_manager_event_id: '',
                    topic_page: 'http://localhost:3000/topics/other-respiratory-viruses/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'RSV',
                          metric: 'RSV_healthcare_admissionRateByWeek',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          stratum: 'default',
                          chart_type: 'line_single_simplified',
                        },
                        id: 'f9eb94ff-0d92-4265-a88b-d52bf73532a5',
                      },
                    ],
                  },
                  id: '0a830ab5-b232-47f1-a5af-f140e0f07c23',
                },
              ],
            },
            id: '40d17855-71e3-424e-a662-2f6930073e59',
          },
        ],
      },
      id: 'c3ec156e-e58b-4976-b0f2-c08c1e933467',
    },
    {
      type: 'section',
      value: {
        heading: 'Weather health alerts',
        page_link: 'http://localhost:3000/weather-health-alerts/',
        content: [
          {
            type: 'weather_health_alert_card',
            value: {
              title: 'Heat health alerts',
              sub_title: 'Across England',
              alert_type: 'heat',
            },
            id: 'd01c65cb-4cd2-4e07-bd6e-71ea0ec04594',
          },
        ],
      },
      id: 'be533e25-ba91-4e86-8a45-1314ed395fb9',
    },
  ],
  last_published_at: '2024-09-30T11:41:36.884029+01:00',
}
