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
  sub_title: 'Showing public health data across England',
  body: [
    {
      type: 'section',
      id: '2b99ceff-c282-4514-bc62-d7e64b81d681',
      value: {
        heading: 'Outbreaks',
        content: [
          {
            type: 'chart_card_section',
            value: {
              cards: [
                {
                  id: '19fb0ff3-a9e7-4aa0-a146-8ddeef50b006',
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'Measles',
                    sub_title: 'Cases by week of symptom onset',
                    tag_manager_event_id: '',
                    topic_page: 'https://ukhsa-dashboard.data.gov.uk/outbreaks/measles/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    y_axis_minimum_value: 1000,
                    y_axis_maximum_value: 7000,
                    chart: [
                      {
                        type: 'plot',
                        id: 'a4a7da74-37ef-4ca4-a579-d4a70806f266',
                        value: {
                          topic: 'Measles',
                          metric: 'measles_cases_casesByOnsetWeekExcludingReportingLag',
                          chart_type: 'line_single_simplified',
                          stratum: 'default',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          date_from: null,
                          date_to: null,
                          use_smooth_lines: false,
                        },
                      },
                    ],
                  },
                },
                {
                  id: 'a9f28d2e-f959-4c5b-a7a0-f02ad8a26bb8',
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'Measles v2',
                    sub_title: 'Cases by week of symptom onset',
                    tag_manager_event_id: '',
                    topic_page: 'https://ukhsa-dashboard.data.gov.uk/outbreaks/measles/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        id: 'a4a7da74-37ef-4ca4-a579-d4a70806f266',
                        value: {
                          topic: 'Measles',
                          metric: 'measles_cases_casesByOnsetWeekExcludingReportingLag',
                          chart_type: 'line_single_simplified',
                          stratum: 'default',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          date_from: null,
                          date_to: null,
                          use_smooth_lines: false,
                        },
                      },
                    ],
                  },
                },
                {
                  id: '1cf80d65-4dda-4eb5-b6c5-a4c36385e817',
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'Problems',
                    sub_title: 'Cases by week of symptom onset',
                    tag_manager_event_id: '',
                    topic_page: 'https://ukhsa-dashboard.data.gov.uk/outbreaks/measles/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        id: 'a4a7da74-37ef-4ca4-a579-d4a70806f266',
                        value: {
                          topic: 'Measles',
                          metric: 'measles_cases_casesByOnsetWeekExcludingReportingLag',
                          chart_type: 'line_single_simplified',
                          stratum: 'default',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          date_from: null,
                          date_to: null,
                          use_smooth_lines: false,
                        },
                      },
                    ],
                  },
                },
              ],
            },
            id: '4a22671d-dc07-46eb-b781-0285ef1847a9',
          },
        ],
        page_link: 'https://ukhsa-dashboard.data.gov.uk/outbreaks/',
      },
    },
    {
      type: 'section',
      id: '9dfe8cf9-b4b6-4cc2-ac77-d5b63c640497',
      value: {
        heading: 'Respiratory viruses',
        content: [
          {
            type: 'chart_card_section',
            value: {
              cards: [
                {
                  id: 'c49837c7-f173-4e92-bbfd-7e36fc496738',
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'Influenza',
                    sub_title: 'Healthcare admission rates',
                    tag_manager_event_id: '',
                    topic_page: 'https://ukhsa-dashboard.data.gov.uk/respiratory-viruses/influenza/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        id: '22e7a544-8ae7-4033-be4e-5aeaf4ebf754',
                        value: {
                          topic: 'Influenza',
                          metric: 'influenza_testing_positivityByWeek',
                          chart_type: 'line_single_simplified',
                          stratum: 'default',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          date_from: null,
                          date_to: null,
                          use_smooth_lines: false,
                        },
                      },
                    ],
                  },
                },
                {
                  id: 'c51e15a5-1e99-497b-8ae4-c57978e71a08',
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'Respiratory syncytial virus (RSV)',
                    sub_title: 'Healthcare admission rates',
                    tag_manager_event_id: '',
                    topic_page:
                      'https://ukhsa-dashboard.data.gov.uk/respiratory-viruses/respiratory-syncytial-virus-rsv/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        id: 'a37b7ff5-c0e9-48ec-8cd4-f03b384f7577',
                        value: {
                          topic: 'RSV',
                          metric: 'RSV_testing_positivityByWeek',
                          chart_type: 'line_single_simplified',
                          stratum: 'default',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          date_from: null,
                          date_to: null,
                          use_smooth_lines: false,
                        },
                      },
                    ],
                  },
                },
                {
                  id: 'aa584788-3d7e-465f-8c34-cacef4fb4e7e',
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'COVID-19',
                    sub_title: 'Cases Reported',
                    tag_manager_event_id: '',
                    topic_page: 'https://ukhsa-dashboard.data.gov.uk/respiratory-viruses/covid-19/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        id: '745f044b-054a-4b25-b7f5-a76ba8408eaf',
                        value: {
                          topic: 'COVID-19',
                          metric: 'COVID-19_testing_positivity7DayRolling',
                          chart_type: 'line_single_simplified',
                          stratum: 'default',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          date_from: null,
                          date_to: null,
                          use_smooth_lines: false,
                        },
                      },
                    ],
                  },
                },
                {
                  id: 'c49837c7-f173-4e92-bbfd-7e36fc496738',
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'Influenza v2',
                    sub_title: 'Testing positivity',
                    tag_manager_event_id: '',
                    topic_page: 'https://ukhsa-dashboard.data.gov.uk/respiratory-viruses/influenza/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        id: '22e7a544-8ae7-4033-be4e-5aeaf4ebf754',
                        value: {
                          topic: 'Influenza',
                          metric: 'influenza_testing_positivityByWeek',
                          chart_type: 'line_single_simplified',
                          stratum: 'default',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          date_from: null,
                          date_to: null,
                          use_smooth_lines: false,
                        },
                      },
                    ],
                  },
                },
                {
                  id: 'c51e15a5-1e99-497b-8ae4-c57978e71a08',
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'Respiratory syncytial virus (RSV) v2',
                    sub_title: 'Testing positivity',
                    tag_manager_event_id: '',
                    topic_page:
                      'https://ukhsa-dashboard.data.gov.uk/respiratory-viruses/respiratory-syncytial-virus-rsv/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        id: 'a37b7ff5-c0e9-48ec-8cd4-f03b384f7577',
                        value: {
                          topic: 'RSV',
                          metric: 'RSV_testing_positivityByWeek',
                          chart_type: 'line_single_simplified',
                          stratum: 'default',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          date_from: null,
                          date_to: null,
                          use_smooth_lines: false,
                        },
                      },
                    ],
                  },
                },
                {
                  id: 'aa584788-3d7e-465f-8c34-cacef4fb4e7e',
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'COVID-19 v2',
                    sub_title: 'Testing positivity',
                    tag_manager_event_id: '',
                    topic_page: 'https://ukhsa-dashboard.data.gov.uk/respiratory-viruses/covid-19/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        id: '745f044b-054a-4b25-b7f5-a76ba8408eaf',
                        value: {
                          topic: 'COVID-19',
                          metric: 'COVID-19_testing_positivity7DayRolling',
                          chart_type: 'line_single_simplified',
                          stratum: 'default',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          date_from: null,
                          date_to: null,
                          use_smooth_lines: false,
                        },
                      },
                    ],
                  },
                },
              ],
            },
            id: '5e48a4b3-3fbc-45a6-8966-b24c99aef0c4',
          },
        ],
        page_link: 'https://ukhsa-dashboard.data.gov.uk/respiratory-viruses/',
      },
    },
    {
      type: 'section',
      id: '77df3ae2-90b8-4567-b3e0-ae314bc21a78',
      value: {
        heading: 'Healthcare-associated infections (HCAI)',
        content: [
          {
            type: 'chart_card_section',
            value: {
              cards: [
                {
                  id: '25545753-b56b-44fa-b17a-b7533b60b1b0',
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'Escherichia coli (E. coli)',
                    sub_title: 'Bloodstream infections by month',
                    tag_manager_event_id: '',
                    topic_page:
                      'https://ukhsa-dashboard.data.gov.uk/healthcare-associated-infections-hcai/healthcare-associated-infections/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        id: 'bf18b95a-0eea-48a1-bcf3-13f6e1d24bcb',
                        value: {
                          topic: 'E-coli',
                          metric: 'e-coli_cases_countsByOnsetType',
                          chart_type: 'line_single_simplified',
                          stratum: 'Total cases',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          date_from: null,
                          date_to: null,
                          use_smooth_lines: false,
                        },
                      },
                    ],
                  },
                },
                {
                  id: '69403084-257f-47d8-a44e-70e249caed00',
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'Clostridioides difficile (C. difficile)',
                    sub_title: 'Bloodstream infections by month',
                    tag_manager_event_id: '',
                    topic_page:
                      'https://ukhsa-dashboard.data.gov.uk/healthcare-associated-infections-hcai/healthcare-associated-infections/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        id: '58c0dea2-9b3e-43b9-8a18-c8016953b620',
                        value: {
                          topic: 'C-difficile',
                          metric: 'c-difficile_cases_countsByOnsetType',
                          chart_type: 'line_single_simplified',
                          stratum: 'Total cases',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          date_from: null,
                          date_to: null,
                          use_smooth_lines: false,
                        },
                      },
                    ],
                  },
                },
                {
                  id: '4350201d-0fbf-496c-b996-6c1c3a1eef28',
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'Meticillin-susceptible Staphylococcus aureus (MSSA)',
                    sub_title: 'Bloodstream infections by month',
                    tag_manager_event_id: '',
                    topic_page:
                      'https://ukhsa-dashboard.data.gov.uk/healthcare-associated-infections-hcai/healthcare-associated-infections/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        id: '13b4076b-f2c3-4f1b-8fed-d786a81c5f15',
                        value: {
                          topic: 'MSSA',
                          metric: 'MSSA_cases_countsByOnsetType',
                          chart_type: 'line_single_simplified',
                          stratum: 'Total cases',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          date_from: null,
                          date_to: null,
                          use_smooth_lines: false,
                        },
                      },
                    ],
                  },
                },
                {
                  id: '25545753-b56b-44fa-b17a-b7533b60b1b0',
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'Escherichia coli (E. coli)',
                    sub_title: 'Bloodstream infections by month',
                    tag_manager_event_id: '',
                    topic_page:
                      'https://ukhsa-dashboard.data.gov.uk/healthcare-associated-infections-hcai/healthcare-associated-infections/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        id: 'bf18b95a-0eea-48a1-bcf3-13f6e1d24bcb',
                        value: {
                          topic: 'E-coli',
                          metric: 'e-coli_cases_countsByOnsetType',
                          chart_type: 'line_single_simplified',
                          stratum: 'Total cases',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          date_from: null,
                          date_to: null,
                          use_smooth_lines: false,
                        },
                      },
                    ],
                  },
                },
                {
                  id: '69403084-257f-47d8-a44e-70e249caed00',
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'Clostridioides difficile (C. difficile)',
                    sub_title: 'Bloodstream infections by month',
                    tag_manager_event_id: '',
                    topic_page:
                      'https://ukhsa-dashboard.data.gov.uk/healthcare-associated-infections-hcai/healthcare-associated-infections/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        id: '58c0dea2-9b3e-43b9-8a18-c8016953b620',
                        value: {
                          topic: 'C-difficile',
                          metric: 'c-difficile_cases_countsByOnsetType',
                          chart_type: 'line_single_simplified',
                          stratum: 'Total cases',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          date_from: null,
                          date_to: null,
                          use_smooth_lines: false,
                        },
                      },
                    ],
                  },
                },
                {
                  id: '4350201d-0fbf-496c-b996-6c1c3a1eef28',
                  type: 'simplified_chart_with_link',
                  value: {
                    title: 'Meticillin-susceptible Staphylococcus aureus (MSSA)',
                    sub_title: 'Bloodstream infections by month',
                    tag_manager_event_id: '',
                    topic_page:
                      'https://ukhsa-dashboard.data.gov.uk/healthcare-associated-infections-hcai/healthcare-associated-infections/',
                    x_axis: 'date',
                    y_axis: 'metric',
                    chart: [
                      {
                        type: 'plot',
                        id: '13b4076b-f2c3-4f1b-8fed-d786a81c5f15',
                        value: {
                          topic: 'MSSA',
                          metric: 'MSSA_cases_countsByOnsetType',
                          chart_type: 'line_single_simplified',
                          stratum: 'Total cases',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: 'all',
                          age: 'all',
                          date_from: null,
                          date_to: null,
                          use_smooth_lines: false,
                        },
                      },
                    ],
                  },
                },
              ],
            },
            id: 'fbfc1861-375a-4720-a13b-71b2c85ce91a',
          },
        ],
        page_link: 'https://ukhsa-dashboard.data.gov.uk/healthcare-associated-infections-hcai/',
      },
    },
    {
      type: 'section',
      id: '7962648a-9493-463e-a9e9-067bfbdaea4c',
      value: {
        heading: 'Weather and climate risks',
        content: [
          {
            type: 'weather_health_alert_card',
            value: { title: 'Cold health alerts', sub_title: 'Alerts in England', alert_type: 'cold' },
            id: '65c80b21-26ff-4f0e-98f7-757a131276f2',
          },
        ],
        page_link: 'https://ukhsa-dashboard.data.gov.uk/weather-health-alerts/',
      },
    },
  ],
  last_published_at: '2024-09-30T11:41:36.884029+01:00',
}
