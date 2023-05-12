import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'
import { relatedLinksMock } from '../elements'

export const influenzaPageMock: PageResponse<PageType.Topic> = {
  id: 5,
  meta: {
    type: 'topic.TopicPage',
    detail_url: 'http://localhost/api/pages/5/',
    html_url: null,
    slug: 'influenza',
    show_in_menus: false,
    seo_title: '',
    search_description: '',
    first_published_at: '2023-05-10T11:45:50.555823+01:00',
    alias_of: null,
    parent: {
      id: 6,
      meta: {
        type: 'home.HomePage',
        detail_url: 'http://localhost/api/pages/6/',
        html_url: null,
      },
      title: 'Respiratory viruses',
    },
  },
  title: 'Influenza',
  page_description:
    '<p data-block-key="z3vrp">Data and insights from the UKHSA on Influenza. <a href="https://www.gov.uk/government/organisations/uk-health-security-agency\\">See the simple summary for England (opens in a new tab)</a>.</p>',
  body: [
    {
      type: 'section',
      value: {
        heading: 'Healthcare',
        content: [
          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'chart_card',
                  value: {
                    title:
                      'Chart with overlaying line comparing hospital admission rates of patients admitted to hospital with Influenza',
                    body: 'Weekly admissions rates of patients admitted to hospital with Influenza as a weekly time series, shown as the rate per 100,000 people.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'new_admissions_daily',
                          chart_type: 'line_with_shaded_section',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: '',
                          geography_type: '',
                          label: '',
                          line_colour: '',
                          line_type: '',
                        },
                        id: '81701b20-d761-434c-bfc2-40a028a76618',
                      },
                    ],
                  },
                  id: '946a95ac-605f-41af-af43-f283e1ecf093',
                },
                {
                  type: 'chart_card',
                  value: {
                    title: 'Chart comparing Influenza hospital admission rates by age',
                    body: 'Age breakdown of people admitted to hospital, shown as the rate per 100,000 people.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'covid_occupied_beds',
                          chart_type: 'line_with_shaded_section',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: '',
                          geography_type: '',
                          label: '',
                          line_colour: '',
                          line_type: '',
                        },
                        id: '7f4c5f99-4e16-44cc-96c6-73db1f3589b9',
                      },
                    ],
                  },
                  id: '7086dad7-c5fc-47df-bf5c-c0fe0e628af3',
                },
              ],
            },
            id: '2e93017b-63bb-49d4-90e7-cd7690141df8',
          },
          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'chart_card',
                  value: {
                    title:
                      'Chart with overlaying line comparing ICU admission rates of patients admitted to hospital with Influenza',
                    body: 'Weekly admissions rates of patients admitted to ICU with Influenza as a weekly time series, shown as the rate per 100,000 people.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'admissions_rate_age',
                          chart_type: 'line_with_shaded_section',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: '',
                          geography_type: '',
                          label: '',
                          line_colour: '',
                          line_type: '',
                        },
                        id: 'ae088b86-92b0-4687-8b84-813b2d3aa28a',
                      },
                    ],
                  },
                  id: '792913bf-1359-44d8-95f7-612fbf93f3d2',
                },
                {
                  type: 'chart_card',
                  value: {
                    title: 'Chart comparing Influenza ICU admission rates by age',
                    body: 'Age breakdown of people admitted to ICU, shown as the rate per 100,000 people.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'covid_occupied_MV_beds',
                          chart_type: 'line_with_shaded_section',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: '',
                          geography_type: '',
                          label: '',
                          line_colour: '',
                          line_type: '',
                        },
                        id: '8746d664-b998-4c37-a150-b9a999c87482',
                      },
                    ],
                  },
                  id: 'c1a5af64-7e4f-4b77-b060-e1f6b37aefdf',
                },
              ],
            },
            id: '9294a4aa-eb92-420c-bb93-0248dc7c3055',
          },
        ],
      },
      id: '0a079ecc-2476-4343-8384-22e4e768b9b9',
    },
    {
      type: 'section',
      value: {
        heading: 'Testing',
        content: [
          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'chart_card',
                  value: {
                    title: 'Bar chart with overlaying line comparing positivity for Influenza tests',
                    body: 'Weekly admissions rates of patients admitted to hospital with Influenza as a weekly time series, shown as the rate per 100,000 people.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_positivity',
                          chart_type: 'bar',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: '',
                          geography_type: '',
                          label: '',
                          line_colour: '',
                          line_type: '',
                        },
                        id: 'fbb16f8c-19b4-49fe-8c7a-537aa8d1dc46',
                      },
                    ],
                  },
                  id: '7cc4a05e-15a8-4259-b8cb-2b3e6d27aef3',
                },
                {
                  type: 'chart_card',
                  value: {
                    title: 'Line chart comparing weekly positivity for Influenza \r\ntests by age',
                    body: 'Weekly time series of positivity for people testing positive for Influenza broken down by age.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '0_4',
                          geography: '',
                          geography_type: '',
                          label: '0 to 4 years',
                          line_colour: 'GREEN',
                          line_type: 'SOLID',
                        },
                        id: '38c5abd9-ad5d-4b6f-b04a-9e5a34747b16',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '5_14',
                          geography: '',
                          geography_type: '',
                          label: '5 to 14 years',
                          line_colour: 'GREEN',
                          line_type: 'DASH',
                        },
                        id: '380c7572-6b43-4225-9c7b-0b79a55110e2',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '15_44',
                          geography: '',
                          geography_type: '',
                          label: '15 to 44 years',
                          line_colour: 'PURPLE',
                          line_type: 'SOLID',
                        },
                        id: '84fbe9f8-3902-4e8d-9868-3a84c74ff707',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '45_64',
                          geography: '',
                          geography_type: '',
                          label: '45 to 64 years',
                          line_colour: 'PURPLE',
                          line_type: 'DASH',
                        },
                        id: '4a161076-04a0-4806-862c-8fed057321c9',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '65+',
                          geography: '',
                          geography_type: '',
                          label: '65 years and over',
                          line_colour: 'ORANGE',
                          line_type: 'SOLID',
                        },
                        id: '4bd07665-b362-40cb-b8f0-d827405bbbaf',
                      },
                    ],
                  },
                  id: '38efdc4e-c145-44da-8da6-5da3cb5460c9',
                },
              ],
            },
            id: 'a1820c42-6069-4b9b-8b37-94caa53bddda',
          },
        ],
      },
      id: '0f9dae99-697b-4d7d-8c92-f977ffbcd622',
    },
  ],
  symptoms: '<p data-block-key="v7la9">Symptoms text here</p>',
  transmission: '<p data-block-key="ldtik">Transmission text here</p>',
  treatment: '<p data-block-key="8bg6b">Treatment text here</p>',
  prevention: '<p data-block-key="6m4r2">Prevention text here</p>',
  surveillance_and_reporting: '<p data-block-key="zn81b">Surveillance and reporting text here</p>',
  related_links: relatedLinksMock,
  last_published_at: '2023-05-10T15:18:02.602108+01:00',
}
