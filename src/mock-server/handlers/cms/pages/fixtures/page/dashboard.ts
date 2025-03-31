import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const dashboardMock: PageResponse<PageType.Landing> = {
  id: 4,
  meta: {
    seo_title: 'UKHSA data dashboard',
    search_description: 'Overall summary of the respiratory viruses in circulation within the UK',
    type: 'home.LandingPage',
    detail_url: 'http://localhost/api/pages/4/',
    html_url: 'http://localhost/',
    slug: 'dashboard',
    show_in_menus: true,
    first_published_at: '2023-09-06T13:51:55.724310+01:00',
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
  seo_change_frequency: 4,
  seo_priority: 1,
  last_updated_at: '2024-07-02T12:44:54.461914+01:00',
  title: 'UKHSA data dashboard',
  sub_title: '',
  body: [
    {
      type: 'section',
      value: {
        heading: 'COVID-19',
        content: [
          {
            type: 'text_card',
            value: {
              body: '<p data-block-key="6du8j">Summary of COVID-19 data. For more detailed data, go to the <a id="5" linktype="page">COVID-19 page</a>.</p>',
            },
            id: '6a399089-6e24-4010-a484-a12745d38872',
          },
          {
            type: 'headline_numbers_row_card',
            value: {
              columns: [],
            },
            id: 'e285caf4-ae79-4c76-bcb7-426d6e66cb8a',
          },
          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'chart_with_headline_and_trend_card',
                  value: {
                    title: 'Cases',
                    body: 'Positive tests reported in England',
                    tag_manager_event_id: 'positive_tests_reported_in_england',
                    date_prefix: 'Up to',
                    about: 'Sample about text',
                    x_axis: '',
                    y_axis: '',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'COVID-19_cases_casesByDay',
                          chart_type: 'line_with_shaded_section',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: '',
                          age: '',
                          label: '',
                          line_colour: '',
                          line_type: '',
                        },
                        id: 'b0ead98b-4102-48f6-b94e-ff7bcffe1dc4',
                      },
                    ],
                    headline_number_columns: [
                      {
                        type: 'headline_number',
                        value: {
                          topic: 'COVID-19',
                          metric: 'COVID-19_headline_newcases_7daychange',
                          body: 'Last 7 days',
                        },
                        id: '95b24a05-a015-42ed-b258-51c7ccaedbcd',
                      },
                      {
                        type: 'trend_number',
                        value: {
                          topic: 'COVID-19',
                          metric: 'COVID-19_headline_newcases_7daychange',
                          body: '',
                          percentage_metric: 'COVID-19_headline_newcases_7daypercentchange',
                        },
                        id: '8c42a86e-f675-41d0-a65a-633c20ac98e3',
                      },
                    ],
                  },
                  id: 'd9b86415-9734-46be-952a-56182f0c40be',
                },
                {
                  type: 'chart_with_headline_and_trend_card',
                  value: {
                    title: 'Deaths',
                    body: 'Deaths with COVID-19 on the death certificate in England',
                    tag_manager_event_id: 'deaths_with_covid-19_on_death_certificate',
                    date_prefix: 'Up to',
                    about: 'Sample about text',
                    x_axis: '',
                    y_axis: '',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'COVID-19_deaths_ONSRollingMean',
                          chart_type: 'line_with_shaded_section',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: '',
                          age: '',
                          label: '',
                          line_colour: '',
                          line_type: '',
                        },
                        id: 'd3b521d8-a6bb-4960-9db9-864c3d362976',
                      },
                    ],
                    headline_number_columns: [
                      {
                        type: 'headline_number',
                        value: {
                          topic: 'COVID-19',
                          metric: 'COVID-19_headline_ONSdeaths_7daytotals',
                          body: 'Last 7 days',
                        },
                        id: '10c92d4c-bdb1-4bcc-a8a5-d0063dcee095',
                      },
                      {
                        type: 'trend_number',
                        value: {
                          topic: 'COVID-19',
                          metric: 'COVID-19_headline_ONSdeaths_7daychange',
                          body: '',
                          percentage_metric: 'COVID-19_headline_ONSdeaths_7daypercentchange',
                        },
                        id: '41ce6c59-99fe-486a-8225-341a306cc395',
                      },
                    ],
                  },
                  id: 'c18703a1-9b01-417f-8fd8-3e4db35865e5',
                },
              ],
            },
            id: 'a5acbd6c-f9b7-4d36-86f4-005c2d46debc',
          },
        ],
      },
      id: '1f53f495-e8d1-45a3-bd34-5d27878c20fc',
    },
    {
      type: 'section',
      value: {
        heading: 'Influenza',
        content: [
          {
            type: 'text_card',
            value: {
              body: '<p data-block-key="6du8j">Summary of influenza data. For more detailed data, go to the <a id="6" linktype="page">influenza page</a>.</p>',
            },
            id: '53fcc358-f10d-411d-9bd0-9acb3c4d3aae',
          },

          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'chart_with_headline_and_trend_card',
                  value: {
                    title: 'Healthcare',
                    body: 'Weekly hospital admission rates for Influenza',
                    tag_manager_event_id: '',
                    date_prefix: 'Up to',
                    about: 'Sample about text',
                    x_axis: '',
                    y_axis: '',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'influenza_healthcare_ICUHDUadmissionrateByWeek',
                          chart_type: 'bar',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: '',
                          age: '',
                          label: '',
                          line_colour: '',
                          line_type: '',
                        },
                        id: 'c7340640-85c6-4b2e-b3b3-2695576f0355',
                      },
                    ],
                    headline_number_columns: [
                      {
                        type: 'headline_number',
                        value: {
                          topic: 'Influenza',
                          metric: 'influenza_headline_positivityLatest',
                          body: 'Last 7 days',
                        },
                        id: 'a93d4317-3814-41ab-b6f6-a6f0769770a7',
                      },
                    ],
                  },
                  id: '60984a8a-9c76-4e86-94bc-b2a2234b6d53',
                },
                {
                  type: 'chart_with_headline_and_trend_card',
                  value: {
                    title: 'Testing',
                    body: 'Weekly positivity',
                    tag_manager_event_id: '',
                    date_prefix: 'Up to',
                    about: 'Sample about text',
                    x_axis: '',
                    y_axis: '',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'influenza_testing_positivityByWeek',
                          chart_type: 'bar',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: 'England',
                          geography_type: 'Nation',
                          sex: '',
                          age: '',
                          label: '',
                          line_colour: '',
                          line_type: '',
                        },
                        id: 'f1a643ba-ff7e-4118-a0a8-366288468cb0',
                      },
                    ],
                    headline_number_columns: [],
                  },
                  id: '809fc976-3332-4e6c-b902-20a5d39a7f99',
                },
              ],
            },
            id: 'b921e063-5b9e-4fd1-9cf3-764b24a8ae2b',
          },
        ],
      },
      id: '4c03dd17-a62b-4102-a938-557c60d38d9a',
    },
  ],
  last_published_at: '2023-05-10T15:18:06.939535+01:00',
}
