import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

import { relatedLinksMock } from '../elements'

export const dashboardMock: PageResponse<PageType.Home> = {
  id: 4,
  meta: {
    seo_title: 'UKHSA data dashboard',
    search_description: 'Overall summary of the respiratory viruses in circulation within the UK',
    type: 'home.HomePage',
    detail_url: 'http://localhost/api/pages/4/',
    html_url: null,
    slug: 'dashboard',
    show_in_menus: true,

    first_published_at: '2023-09-06T13:51:55.724310+01:00',
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
  title: 'UKHSA data dashboard',
  page_description:
    '<p data-block-key="sud2w">The UKHSA data dashboard shows public health data across England. It builds on the success and is an iteration of the <a href="https://coronavirus.data.gov.uk/">COVID-19 in the UK dashboard</a>.</p><p data-block-key="dj8jt">Initially, the dashboard presents data on respiratory viruses. In the future, it will grow to present a wider range of data on public health topics in line with the remit of the UKHSA. Find out more <a id="8" linktype="page">about the UKHSA data dashboard</a>.</p><p data-block-key="21gee"><b>The UKHSA data dashboard is still undergoing statistical review. For reporting and analytical purposes, use the</b> <a href="https://coronavirus.data.gov.uk/"><b>COVID-19 dashboard</b></a><b> and the</b> <a href="https://www.gov.uk/government/statistics/national-flu-and-covid-19-surveillance-reports-2023-to-2024-season"><b>weekly surveillance report</b></a><b>.</b></p>',
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
              columns: [
                {
                  type: 'column',
                  value: {
                    title: 'Cases',
                    rows: [
                      {
                        type: 'headline_number',
                        value: {
                          topic: 'COVID-19',
                          metric: 'COVID-19_headline_newcases_7daytotals',
                          body: 'Weekly',
                        },
                        id: 'eff08341-7bfa-4a3b-b013-527e7b954ce8',
                      },
                      {
                        type: 'trend_number',
                        value: {
                          topic: 'COVID-19',
                          metric: 'COVID-19_headline_newcases_7daychange',
                          body: 'Last 7 days',
                          percentage_metric: 'COVID-19_headline_newcases_7daypercentchange',
                        },
                        id: 'a57a4ad5-6b52-45a6-acfd-2fe208cb5617',
                      },
                    ],
                  },
                  id: 'ff081d2a-e235-4bc2-9b09-220f8fe20494',
                },
                {
                  type: 'column',
                  value: {
                    title: 'Deaths',
                    rows: [
                      {
                        type: 'headline_number',
                        value: {
                          topic: 'COVID-19',
                          metric: 'COVID-19_headline_ONSdeaths_7daytotals',
                          body: 'Weekly',
                        },
                        id: '2e403485-030c-4122-86be-5827a095f30d',
                      },
                      {
                        type: 'trend_number',
                        value: {
                          topic: 'COVID-19',
                          metric: 'COVID-19_headline_ONSdeaths_7daychange',
                          body: 'Last 7 days',
                          percentage_metric: 'COVID-19_headline_ONSdeaths_7daypercentchange',
                        },
                        id: 'ea8603ca-7b4d-4ef5-a8b1-f27a565938b5',
                      },
                    ],
                  },
                  id: '530cf367-092c-40d1-9129-c2274c7836b9',
                },
                {
                  type: 'column',
                  value: {
                    title: 'Healthcare',
                    rows: [
                      {
                        type: 'headline_number',
                        value: {
                          topic: 'COVID-19',
                          metric: 'COVID-19_headline_7DayAdmissions',
                          body: 'Patients admitted',
                        },
                        id: '2f49a215-02e7-4ded-94b1-1a0c2933708b',
                      },
                      {
                        type: 'trend_number',
                        value: {
                          topic: 'COVID-19',
                          metric: 'COVID-19_headline_7DayAdmisionsChange',
                          body: 'Last 7 days',
                          percentage_metric: 'COVID-19_headline_7DayAdmissionsPercentChange',
                        },
                        id: '6c09d01e-82c5-425f-aa07-1bdd22d1eaa8',
                      },
                    ],
                  },
                  id: 'fad2e89a-8a65-44a8-b962-9df59169c0af',
                },
                {
                  type: 'column',
                  value: {
                    title: 'Vaccines',
                    rows: [
                      {
                        type: 'headline_number',
                        value: {
                          topic: 'COVID-19',
                          metric: 'COVID-19_headline_totalvaccines_spring23',
                          body: 'Autumn booster',
                        },
                        id: 'ae3344f7-5b23-4977-bea9-2e1ccd84eb50',
                      },
                    ],
                  },
                  id: '93b6367b-fbb3-47e8-96db-f724d947fa00',
                },
                {
                  type: 'column',
                  value: {
                    title: 'Testing',
                    rows: [
                      {
                        type: 'percentage_number',
                        value: {
                          topic: 'COVID-19',
                          metric: 'COVID-19_headline_positivity_latest',
                          body: 'Virus tests positivity',
                        },
                        id: '36746bcd-1dce-4e5e-81f8-60c8b9994540',
                      },
                    ],
                  },
                  id: '1e3bf214-88e4-4cf4-9b78-3ad7eabb2eaa',
                },
              ],
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
            type: 'headline_numbers_row_card',
            value: {
              columns: [
                {
                  type: 'column',
                  value: {
                    title: 'Healthcare',
                    rows: [
                      {
                        type: 'headline_number',
                        value: {
                          topic: 'Influenza',
                          metric: 'influenza_headline_ICUHDUadmissionrateLatest',
                          body: 'Hospital admission rate (per 100,000)',
                        },
                        id: '0520e9d6-794f-4616-b217-f5ec884a86d8',
                      },
                    ],
                  },
                  id: '0da002a7-d985-417c-b75c-9a4c8a77fa8e',
                },
                {
                  type: 'column',
                  value: {
                    title: 'Testing',
                    rows: [
                      {
                        type: 'percentage_number',
                        value: {
                          topic: 'Influenza',
                          metric: 'influenza_headline_positivityLatest',
                          body: 'Virus tests positivity',
                        },
                        id: '36ec8822-56e2-4513-ac8f-969e84f0d5e8',
                      },
                    ],
                  },
                  id: 'e57ed33f-658a-40be-bfdb-6fa12ee62512',
                },
              ],
            },
            id: '06e1f087-dc2c-42ea-873f-0b1fb1f1b12e',
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
  related_links: relatedLinksMock,
  last_published_at: '2023-05-10T15:18:06.939535+01:00',
}
