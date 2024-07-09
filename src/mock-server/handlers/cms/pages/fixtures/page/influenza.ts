import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

import { relatedLinksMock } from '../elements/related-links'

export const influenzaPageMock: PageResponse<PageType.Topic> = {
  id: 111,
  meta: {
    type: 'topic.TopicPage',
    detail_url: 'http://localhost:3000/api/pages/111/',
    html_url: 'http://localhost:3000/dashboard/influenza',
    slug: 'influenza',
    show_in_menus: true,
    seo_title: 'Influenza | UKHSA data dashboard',
    seo_change_frequency: 'Weekly',
    seo_priority: 0.8,
    search_description: 'Detailed summary of Influenza in circulation within the UK',
    first_published_at: '2023-05-16T14:06:43.187457+01:00',
    alias_of: null,
    parent: {
      id: 109,
      meta: {
        type: 'home.HomePage',
        detail_url: 'http://localhost:3000/api/pages/109/',
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
                      'Line chart with overlaying line comparing hospital admission rates of patients admitted to hospital with Influenza',
                    body: 'Weekly admissions rates of patients admitted to hospital with Influenza as a weekly time series, shown as the rate per 100,000 people.',
                    tag_manager_event_id: '',
                    x_axis: null,
                    y_axis: null,
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_hospital_admissions_rate',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '',
                          line_colour: 'BLUE',
                          line_type: 'SOLID',
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
                    title: 'Line chart comparing Influenza hospital admission rates by age',
                    body: 'Age breakdown of people admitted to hospital, shown as the rate per 100,000 people.',
                    tag_manager_event_id: '',
                    x_axis: null,
                    y_axis: null,
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_hospital_admissions_rate_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '0_4',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '0 to 4 years',
                          line_colour: 'GREEN',
                          line_type: 'SOLID',
                        },
                        id: '7f4c5f99-4e16-44cc-96c6-73db1f3589b9',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_hospital_admissions_rate_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '5_14',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '5 to 14 years',
                          line_colour: 'GREEN',
                          line_type: 'DASH',
                        },
                        id: '7487614e-daf5-4efe-9d57-accf227bd46c',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_hospital_admissions_rate_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '15_44',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '15 to 44 years',
                          line_colour: 'PURPLE',
                          line_type: 'SOLID',
                        },
                        id: '639445db-948b-4590-930f-ce37a58c132c',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_hospital_admissions_rate_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '45_54',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '45 to 54 years',
                          line_colour: 'PURPLE',
                          line_type: 'DASH',
                        },
                        id: '996aab0e-cdf6-4569-8d49-4379e0de920f',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_hospital_admissions_rate_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '55_64',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '55 to 64 years',
                          line_colour: 'ORANGE',
                          line_type: 'SOLID',
                        },
                        id: '7b8a91cb-4c22-43d9-969c-c9e660bb206b',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_hospital_admissions_rate_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '65_74',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '65 to 74 years',
                          line_colour: 'ORANGE',
                          line_type: 'DASH',
                        },
                        id: 'd6520f98-3c39-47fc-998e-029bfd09a56e',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_hospital_admissions_rate_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '75_84',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '75 to 84 years',
                          line_colour: 'BLUE',
                          line_type: 'SOLID',
                        },
                        id: 'bef9736d-d1dc-4133-99cd-75d1de49bc40',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_hospital_admissions_rate_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '85+',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '85 years and over',
                          line_colour: 'BLUE',
                          line_type: 'DASH',
                        },
                        id: '3b642efd-48a7-47fb-9de1-271e3401c7f9',
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
                      'Line chart with overlaying line comparing ICU admission rates of patients admitted to hospital with Influenza',
                    body: 'Weekly admissions rates of patients admitted to ICU with Influenza as a weekly time series, shown as the rate per 100,000 people.',
                    tag_manager_event_id: '',
                    x_axis: null,
                    y_axis: null,
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_icuhdu_admissions_rate',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '',
                          line_colour: 'BLUE',
                          line_type: 'SOLID',
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
                    title: 'Line chart comparing Influenza ICU admission rates by age',
                    body: 'Age breakdown of people admitted to ICU, shown as the rate per 100,000 people.',
                    tag_manager_event_id: '',
                    x_axis: null,
                    y_axis: null,
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_icu_admissions_rate_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '0_4',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '0 to 4 years',
                          line_colour: 'GREEN',
                          line_type: 'SOLID',
                        },
                        id: '8746d664-b998-4c37-a150-b9a999c87482',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_icu_admissions_rate_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '5_14',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '5 to 14 years',
                          line_colour: 'GREEN',
                          line_type: 'DASH',
                        },
                        id: '8e2b63e1-64e4-41f0-8f07-3b234c7a1395',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_icu_admissions_rate_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '15_44',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '15 to 44 years',
                          line_colour: 'PURPLE',
                          line_type: 'SOLID',
                        },
                        id: '8ba50aa9-8306-4e6f-be58-18dd97dc96c7',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_icu_admissions_rate_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '45_54',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '45 to 54 years',
                          line_colour: 'PURPLE',
                          line_type: 'DASH',
                        },
                        id: 'd50cb8ad-d2ea-4d8b-aa69-bc9550883f0a',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_icu_admissions_rate_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '55_64',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '55 to 64 years',
                          line_colour: 'ORANGE',
                          line_type: 'SOLID',
                        },
                        id: '07d512b9-6dd7-490f-b980-ee05db6a9367',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_icu_admissions_rate_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '65_74',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '65 to 74 years',
                          line_colour: 'ORANGE',
                          line_type: 'DASH',
                        },
                        id: 'b6befe9b-4631-4b93-98e1-6b10910618df',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_icu_admissions_rate_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '75_84',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '75 to 84 years',
                          line_colour: 'BLUE',
                          line_type: 'SOLID',
                        },
                        id: '39398f23-069a-4b08-b70e-bf7277e8e6d2',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_icu_admissions_rate_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '85+',
                          geography: '',
                          geography_type: '',
                          age: '',
                          sex: null,
                          label: '85 years and over',
                          line_colour: 'BLUE',
                          line_type: 'DASH',
                        },
                        id: 'c1fac52c-d353-4bf7-8b85-9f13e94dff3f',
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
                    tag_manager_event_id: '',
                    x_axis: null,
                    y_axis: null,
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
                          age: '',
                          sex: null,
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
                    tag_manager_event_id: '',
                    x_axis: null,
                    y_axis: null,
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
                          age: '',
                          sex: null,
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
                          age: '',
                          sex: null,
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
                          age: '',
                          sex: null,
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
                          age: '',
                          sex: null,
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
                          age: '',
                          sex: null,
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
  enable_area_selector: true,
  selected_topics: ['Influenza'],
  related_links: relatedLinksMock,
  last_published_at: '2023-05-15T16:26:41.095645+01:00',
}
