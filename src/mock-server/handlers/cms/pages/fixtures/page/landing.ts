import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const landingPageMock: PageResponse<PageType.Landing> = {
  id: 79,
  meta: {
    type: 'landing_page.LandingPage',
    detail_url: 'https://http:/api/pages/79/',
    html_url: 'https://http://localhost:3000/landing-page/',
    slug: 'landing-page',
    show_in_menus: false,
    seo_title: 'Home | UKHSA data dashboard',
    search_description: '',
    first_published_at: '2024-09-20T13:06:42.106160+01:00',
    alias_of: null,
    parent: {
      id: 3,
      meta: { type: 'home.UKHSARootPage', detail_url: 'https://http:/api/pages/3/', html_url: null },
      title: 'UKHSA Dashboard Root',
    },
  },
  title: 'Landing page',
  sub_title: 'showing public health data across England',
  body: [
    {
      type: 'section',
      value: {
        heading: 'Respiratory viruses',
        page_link: null,
        content: [
          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'COVID-19',
                    sub_title: 'Cases reported',
                    tag_manager_event_id: '',
                    topic_page: 5,
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
                    sub_title: 'Healthcare admissions rates',
                    tag_manager_event_id: '',
                    topic_page: 6,
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          chart_type: '',
                          topic: 'Influenza',
                          metric: 'influenza_healthcare_ICUHDUadmissionRateByWeek',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          stratum: 'default',
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
                    sub_title: 'Healthcare admissions rates',
                    tag_manager_event_id: '',
                    topic_page: 7,
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
        page_link: 76,
        content: [
          {
            type: 'weather_health_alerts_card',
            value: { title: 'weather health alerts', sub_title: 'Across England', alert_type: 'heat' },
            id: 'd01c65cb-4cd2-4e07-bd6e-71ea0ec04594',
          },
        ],
      },
      id: 'be533e25-ba91-4e86-8a45-1314ed395fb9',
    },
  ],
  last_published_at: '2024-09-20T14:04:30.332316+01:00',
}
