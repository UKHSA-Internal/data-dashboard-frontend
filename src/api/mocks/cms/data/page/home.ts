import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'
import { relatedLinksMock } from '../elements'

export const homePageMock: PageResponse<PageType.Home> = {
  id: 1,
  meta: {
    type: 'home.HomePage',
    detail_url: 'http://localhost/api/pages/4/',
    html_url: null,
    slug: 'respiratory-viruses',
    show_in_menus: false,
    seo_title: '',
    search_description: '',
    first_published_at: '2023-04-21T15:27:01.338017Z',
    alias_of: null,
    parent: {
      id: 2,
      meta: {
        type: 'wagtailcore.Page',
        detail_url: 'http://localhost/api/pages/2/',
        html_url: null,
      },
      title: 'Welcome to your new Wagtail site!',
    },
  },
  title: 'Respiratory viruses',
  body: [
    {
      type: 'section',
      value: {
        heading: 'Coronavirus',
        content: [
          {
            type: 'text_card',
            value: {
              body: '<p data-block-key="6du8j">The UKHSA dashboard for data and insights on Coronavirus.</p>',
            },
            id: '6a399089-6e24-4010-a484-a12745d38872',
          },
          {
            type: 'headline_numbers_row_card',
            value: {
              columns: [
                {
                  type: 'headline_and_trend_component',
                  value: {
                    title: 'Cases',
                    headline_number: {
                      topic: 'COVID-19',
                      metric: 'new_cases_7days_sum',
                      body: 'Weekly',
                    },
                    trend_number: {
                      topic: 'COVID-19',
                      metric: 'new_cases_7days_change',
                      body: 'Last 7 days',
                      percentage_metric: 'new_cases_7days_change_percentage',
                    },
                  },
                  id: 'e64cc7ea-4551-47f0-b964-941d59cae1bb',
                },
                {
                  type: 'headline_and_trend_component',
                  value: {
                    title: 'Deaths',
                    headline_number: {
                      topic: 'COVID-19',
                      metric: 'new_deaths_7days_sum',
                      body: 'Weekly',
                    },
                    trend_number: {
                      topic: 'COVID-19',
                      metric: 'new_deaths_7days_change',
                      body: 'Last 7 days',
                      percentage_metric: 'new_deaths_7days_change_percentage',
                    },
                  },
                  id: 'fcfcf83f-f2a6-407c-a1f4-6c5978b472f5',
                },
                {
                  type: 'headline_and_trend_component',
                  value: {
                    title: 'Healthcare',
                    headline_number: {
                      topic: 'COVID-19',
                      metric: 'new_admissions_7days',
                      body: 'Patients admitted',
                    },
                    trend_number: {
                      topic: 'COVID-19',
                      metric: 'new_admissions_7days_change',
                      body: 'Last 7 days',
                      percentage_metric: 'new_admissions_7days_change_percentage',
                    },
                  },
                  id: '0a351331-a1ca-4c16-8c6e-5d8a0b38fd3f',
                },
                {
                  type: 'dual_headline_component',
                  value: {
                    title: 'Vaccinations',
                    top_headline_number: {
                      topic: 'COVID-19',
                      metric: 'latest_total_vaccinations_autumn22',
                      body: 'Autumn booster',
                    },
                    bottom_headline_number: {
                      topic: 'COVID-19',
                      metric: 'latest_vaccinations_uptake_autumn22',
                      body: 'Percentage uptake (%)',
                    },
                  },
                  id: 'bb8a9a19-ff0e-4e99-b570-b058e9cdb5a1',
                },
                {
                  type: 'single_headline_component',
                  value: {
                    title: 'Testing',
                    headline_number: {
                      topic: 'COVID-19',
                      metric: 'positivity_7days_latest',
                      body: 'Virus tests positivity (%)',
                    },
                  },
                  id: '4e9d5ead-5394-42cb-b370-e0d0f028140d',
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
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'new_cases_daily',
                          chart_type: 'line_with_shaded_section',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: '',
                          geography_type: '',
                        },
                        id: 'b0ead98b-4102-48f6-b94e-ff7bcffe1dc4',
                      },
                    ],
                    headline_number_columns: [
                      {
                        type: 'headline_number',
                        value: {
                          topic: 'COVID-19',
                          metric: 'new_cases_7days_sum',
                          body: 'Last 7 days',
                        },
                        id: '95b24a05-a015-42ed-b258-51c7ccaedbcd',
                      },
                      {
                        type: 'trend_number',
                        value: {
                          topic: 'COVID-19',
                          metric: 'new_deaths_7days_change',
                          body: '',
                          percentage_metric: 'new_cases_7days_change_percentage',
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
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'new_deaths_daily',
                          chart_type: 'line_with_shaded_section',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: '',
                          geography_type: '',
                        },
                        id: 'd3b521d8-a6bb-4960-9db9-864c3d362976',
                      },
                    ],
                    headline_number_columns: [
                      {
                        type: 'headline_number',
                        value: {
                          topic: 'COVID-19',
                          metric: 'new_deaths_7days_sum',
                          body: 'Last 7 days',
                        },
                        id: '10c92d4c-bdb1-4bcc-a8a5-d0063dcee095',
                      },
                      {
                        type: 'trend_number',
                        value: {
                          topic: 'COVID-19',
                          metric: 'new_deaths_7days_change',
                          body: '',
                          percentage_metric: 'new_deaths_7days_change_percentage',
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
              body: '<p data-block-key="6du8j">The UKHSA dashboard for data and insights on Influenza.</p>',
            },
            id: '53fcc358-f10d-411d-9bd0-9acb3c4d3aae',
          },
          {
            type: 'headline_numbers_row_card',
            value: {
              columns: [
                {
                  type: 'headline_and_trend_component',
                  value: {
                    title: 'Healthcare',
                    headline_number: {
                      topic: 'Influenza',
                      metric: 'weekly_hospital_admissions_rate_latest',
                      body: 'Hospital admission rate (per 100,000)',
                    },
                    trend_number: {
                      topic: 'Influenza',
                      metric: 'weekly_hospital_admissions_rate_change',
                      body: 'Last 7 days',
                      percentage_metric: 'weekly_hospital_admissions_rate_change_percentage',
                    },
                  },
                  id: '1eb03393-1b30-46a8-8c19-8b86aa056b34',
                },
                {
                  type: 'single_headline_component',
                  value: {
                    title: 'Testing',
                    headline_number: {
                      topic: 'Influenza',
                      metric: 'weekly_positivity_latest',
                      body: 'Virus tests positivity (%)',
                    },
                  },
                  id: '8d79205b-df67-4dc1-91ae-8198dfb2155f',
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
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_hospital_admissions_rate',
                          chart_type: 'bar',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: '',
                          geography_type: '',
                        },
                        id: 'c7340640-85c6-4b2e-b3b3-2695576f0355',
                      },
                    ],
                    headline_number_columns: [
                      {
                        type: 'headline_number',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_hospital_admissions_rate_latest',
                          body: 'Last 7 days',
                        },
                        id: 'a93d4317-3814-41ab-b6f6-a6f0769770a7',
                      },
                      {
                        type: 'trend_number',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_hospital_admissions_rate_change',
                          body: '',
                          percentage_metric: 'weekly_hospital_admissions_rate_change_percentage',
                        },
                        id: '7b860dc9-26d1-4d95-924a-c23f866a7eae',
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
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Influenza',
                          metric: 'weekly_positivity_latest',
                          chart_type: 'bar',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: '',
                          geography_type: '',
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
  last_published_at: '2023-03-21T10:25:34.452098Z',
}
