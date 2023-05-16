import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'
import { relatedLinksMock } from '../elements'

export const coronavirusPageMock: PageResponse<PageType.Topic> = {
  id: 8,
  meta: {
    type: 'topic.TopicPage',
    detail_url: 'http://localhost/api/pages/8/',
    html_url: null,
    slug: 'coronavirus',
    show_in_menus: false,
    seo_title: '',
    search_description: '',
    first_published_at: '2023-05-15T17:23:02.306556+01:00',
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
  title: 'Coronavirus',
  page_description:
    '<p data-block-key="sud2w">Data and insights from the UKHSA on Coronavirus. <a href="https://www.gov.uk/government/organisations/uk-health-security-agency">See the simple summary for England (opens in a new tab).</a></p>',
  body: [
    {
      type: 'section',
      value: {
        heading: 'Cases',
        content: [
          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'chart_card',
                  value: {
                    title: 'Cases by specimen date',
                    body: 'Number of cases by specimen date. Data for the last 5 days, highlighted in grey, are incomplete.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'new_cases_daily',
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
                        id: '7d8ee647-1e12-4ea5-8051-dacda36d7dc0',
                      },
                    ],
                  },
                  id: 'a937cbb1-b846-4ce8-b334-83ad5988b57a',
                },
              ],
            },
            id: '77efd5de-5b47-4e96-b82a-306ee3a7c1fb',
          },
          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'chart_card',
                  value: {
                    title: '7-day case rates by specimen date',
                    body: 'Rate of cases per 100,000 people in the rolling 7-day period ending on the dates shown.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'new_cases_rolling_rate',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: '',
                          geography_type: '',
                          label: 'Rate of cases per 100,000 population in 7-day period',
                          line_colour: 'BLUE',
                          line_type: 'SOLID',
                        },
                        id: '691a30aa-2446-4462-8ac1-ebada957baf9',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'cases_rate_age_sex',
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
                        id: '978f0155-b57e-48ba-96da-d79aa3c72a9d',
                      },
                    ],
                  },
                  id: '9cc32fa3-8ae3-4a12-b68e-fec49acb5062',
                },
              ],
            },
            id: '50715dbf-7bb8-464f-8b24-98a085fdb1a3',
          },
        ],
      },
      id: '49143d30-a982-44ba-ba94-a8740197b5ee',
    },
    {
      type: 'section',
      value: {
        heading: 'Deaths',
        content: [
          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'chart_card',
                  value: {
                    title: 'Daily deaths with COVID-19 on the death certificate by date of death',
                    body: 'Daily numbers of deaths of people whose death certificate mentioned COVID-19 as one of the causes, and 7-day rolling average. Because of the time it takes for deaths to be registered, there is a lag in reporting of at least 11 days, and data are not shown for the 14 days before the most recent reported date as they are considered incomplete. Data are shown by date of death.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'new_deaths_daily',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: '',
                          geography_type: '',
                          label: 'New deaths daily',
                          line_colour: 'BLUE',
                          line_type: 'SOLID',
                        },
                        id: '9999386d-261c-4ad8-9cbb-2b7a69c70f90',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'new_deaths_7day_avg',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: '',
                          geography_type: '',
                          label: '7 day rolling average',
                          line_colour: 'RED',
                          line_type: 'DASH',
                        },
                        id: 'ba7abe60-02f7-4220-ba64-25e64156f076',
                      },
                    ],
                  },
                  id: 'a1e13a30-0940-4c3d-84f7-dae7fbadb922',
                },
              ],
            },
            id: '2bc8eb3c-4566-44c3-9555-d6f72d1d5d84',
          },
        ],
      },
      id: '71f29803-d48b-43f4-a46f-1d154c82aa86',
    },
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
                    title: 'Bar chart with overlaying line comparing patients \r\nadmitted to hospital with COVID-19',
                    body: 'Daily and total numbers of COVID-19 patients admitted to hospital. The overlaying line shows the 7-day average.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'new_admissions_daily',
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
                        id: 'd6517ed4-2b64-4aac-ad83-831e086b4cab',
                      },
                    ],
                  },
                  id: 'ebc53420-a424-4f92-9311-d34e4114ccc1',
                },
                {
                  type: 'chart_card',
                  value: {
                    title: 'Patients in hospital',
                    body: 'Daily count of confirmed COVID-19 patients in hospital at 8am. The overlaying line shows the 7-day average.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'covid_occupied_beds',
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
                        id: '94b90d9c-de53-4848-8c1b-a0d9850c4c55',
                      },
                    ],
                  },
                  id: 'a828717c-50c1-4cd3-9b95-3b6e1c6fe0d6',
                },
              ],
            },
            id: '28b9df28-8af2-4083-a2ba-5e71de574baf',
          },
          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'chart_card',
                  value: {
                    title: 'Patients in mechanical ventilation beds',
                    body: 'Daily count of COVID-19 patients in mechanical ventilation beds, and 7-day rolling average. Data are not updated every day.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'covid_occupied_MV_beds',
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
                        id: '63319237-a839-4fb3-a1fd-a1d22b73a808',
                      },
                    ],
                  },
                  id: 'f826e4de-5954-43fa-928f-931dfce650ea',
                },
              ],
            },
            id: '4424a010-0823-4ae1-a67d-a21ea4f1dd00',
          },
        ],
      },
      id: '9d870ffd-75b8-4618-afde-5e4a109bbd8c',
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
                    title: 'Total daily number of PCR tests reported',
                    body: 'The daily number of new polymerase chain reaction (PCR) tests reported. Data is shown by specimen date (the date the sample was collected from the person).',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'new_pcr_tests_daily',
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
                        id: '49ad7b15-651c-455f-b261-3fd2b53b4ad0',
                      },
                    ],
                  },
                  id: '46b1ef81-9348-466c-aae9-b0478136d426',
                },
                {
                  type: 'chart_card',
                  value: {
                    title: 'Weekly positivity of people receiving a PCR test',
                    body: 'The percentage positivity of people who received a polymerase chain reaction (PCR) and had at least one positive COVID-19 PCR test result in the same 7 days. Data is shown by specimen date (the date the sample was collected). People tested more than once in the period are only counted once in the denominator. People with more than one positive result in the period are only included once in the numerator.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'positivity_PCR_rolling_sum',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: '',
                          geography_type: '',
                          label: '',
                          line_colour: '',
                          line_type: '',
                        },
                        id: 'e5830390-1928-4097-9894-b8c5621cfab7',
                      },
                    ],
                  },
                  id: '6af570d3-236c-47b6-8464-9c3696a9c78f',
                },
              ],
            },
            id: '9d382c95-5e5a-4fb9-80e8-f8ce17957fc8',
          },
        ],
      },
      id: '1cf1ff5d-c5a4-4e9a-a429-9c453f71e5dc',
    },
    {
      type: 'section',
      value: {
        heading: 'Vaccinations',
        content: [
          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'chart_card',
                  value: {
                    title: 'People aged 50 and over who have received autumn booster vaccinations, by vaccination date',
                    body: 'The number of people aged 50 and over who have received an autumn booster COVID-19 vaccination. Data for the latest 2 days, marked in grey, are incomplete. Data are shown by date of vaccination.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'new_vaccinations_autumn22',
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
                        id: 'c41bb963-ab1a-4a93-a2f0-fa421b3609a7',
                      },
                    ],
                  },
                  id: '671257bb-6523-4505-bbd7-e3ebdad693cc',
                },
                {
                  type: 'chart_card',
                  value: {
                    title: 'Autumn booster vaccination uptake (50+), by vaccination date',
                    body: 'The percentage of people aged 50 and over who have received an autumn booster COVID-19 vaccination. The denominator is the number of people aged 50 and over on the National Immunisation Management Service (NIMS) database.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'vaccinations_percentage_uptake_autumn22',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '50_54',
                          geography: '',
                          geography_type: '',
                          label: '50 to 54 years',
                          line_colour: 'GREEN',
                          line_type: 'SOLID',
                        },
                        id: '08f53934-870e-46d4-9d11-51e31b414c11',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'vaccinations_percentage_uptake_autumn22',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '55_59',
                          geography: '',
                          geography_type: '',
                          label: '55 to 59 years',
                          line_colour: 'GREEN',
                          line_type: 'DASH',
                        },
                        id: 'af3d5181-84eb-4fd0-9cc9-f40e01c4b8df',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'vaccinations_percentage_uptake_autumn22',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '60_64',
                          geography: '',
                          geography_type: '',
                          label: '60 to 64 years',
                          line_colour: 'PURPLE',
                          line_type: 'SOLID',
                        },
                        id: 'f36a94b4-948e-4e25-8ee2-129b789d2724',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'vaccinations_percentage_uptake_autumn22',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '65_69',
                          geography: '',
                          geography_type: '',
                          label: '65 to 69 years',
                          line_colour: 'PURPLE',
                          line_type: 'DASH',
                        },
                        id: '5674822f-6dec-4388-aa6c-2e5366c560ee',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'vaccinations_percentage_uptake_autumn22',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '70_74',
                          geography: '',
                          geography_type: '',
                          label: '70 to 74 years',
                          line_colour: 'ORANGE',
                          line_type: 'SOLID',
                        },
                        id: '6d033690-25e8-4bdd-bac2-6fe1b714f016',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'vaccinations_percentage_uptake_autumn22',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '75_79',
                          geography: '',
                          geography_type: '',
                          label: '75 to 79 years',
                          line_colour: 'ORANGE',
                          line_type: 'DASH',
                        },
                        id: 'da3c0cb9-bd67-426c-a4da-ea6bf692d072',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'vaccinations_percentage_uptake_autumn22',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '80_84',
                          geography: '',
                          geography_type: '',
                          label: '80 to 84 years',
                          line_colour: 'BLUE',
                          line_type: 'SOLID',
                        },
                        id: '8455d4bf-b105-4062-8751-a9d8ce8290c4',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'vaccinations_percentage_uptake_autumn22',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '85_89',
                          geography: '',
                          geography_type: '',
                          label: '85 to 89 years',
                          line_colour: 'BLUE',
                          line_type: 'DASH',
                        },
                        id: '3e0dbfc9-d580-451c-af02-e25cdd827bf2',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'vaccinations_percentage_uptake_autumn22',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '90+',
                          geography: '',
                          geography_type: '',
                          label: '90 years and over',
                          line_colour: 'RED',
                          line_type: 'DASH',
                        },
                        id: '760e6dd2-2434-47e4-a31b-be0810b655fa',
                      },
                    ],
                  },
                  id: '0b2bdc47-bcf7-4ddf-889a-71471a08ac9f',
                },
              ],
            },
            id: '3cec62c9-9b13-4205-8ba7-b5bd450a8302',
          },
          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'chart_card',
                  value: {
                    title: 'People aged 75 and over who have received spring booster vaccinations, by vaccination date',
                    body: 'The number of people aged 75 and over who have received a spring booster COVID-19 vaccination. Data for the latest 2 days, marked in grey, are incomplete. Data are shown by date of vaccination.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'new_vaccinations_spring22',
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
                        id: 'b83e67d5-0234-40e4-8c3e-cb7a1efb8549',
                      },
                    ],
                  },
                  id: '38a88287-6e7d-4e01-8309-75bec95e0d1a',
                },
                {
                  type: 'chart_card',
                  value: {
                    title: 'Spring booster vaccination uptake (75+), by vaccination date',
                    body: 'The percentage of people aged 75 and over who have received a spring booster COVID-19 vaccination. The denominator is the number of people aged 75 and over on the National Immunisation Management Service (NIMS) database.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'vaccinations_percentage_uptake_spring22',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '75_79',
                          geography: '',
                          geography_type: '',
                          label: '75 to 79 years',
                          line_colour: 'GREEN',
                          line_type: 'SOLID',
                        },
                        id: 'b7293a99-3068-416f-85a4-696e0cf9c402',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'vaccinations_percentage_uptake_spring22',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '80_84',
                          geography: '',
                          geography_type: '',
                          label: '80 to 84 years',
                          line_colour: 'BLUE',
                          line_type: 'DASH',
                        },
                        id: '6702853c-f150-4096-9ddd-7d6fb4ccfdde',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'vaccinations_percentage_uptake_spring22',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '85_89',
                          geography: '',
                          geography_type: '',
                          label: '85 to 89 years',
                          line_colour: 'PURPLE',
                          line_type: 'SOLID',
                        },
                        id: 'f27a7a40-069a-4ff3-8b20-c3aa5ef44401',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'COVID-19',
                          metric: 'vaccinations_percentage_uptake_spring22',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '90+',
                          geography: '',
                          geography_type: '',
                          label: '90 years and above',
                          line_colour: 'RED',
                          line_type: 'SOLID',
                        },
                        id: '1f11e3c6-edd8-4387-bfb9-2cea588affdc',
                      },
                    ],
                  },
                  id: 'ad27a0f3-5551-4397-aa32-efa5ddf79a93',
                },
              ],
            },
            id: 'de2ebb2b-02ae-45cd-b2fb-b0f22dd48567',
          },
        ],
      },
      id: '14175b86-36fa-46ee-b0f4-b56dc0a3c70a',
    },
  ],
  symptoms: '<p data-block-key="v7la9">Symptoms text here</p>',
  transmission: '<p data-block-key="ldtik">Transmission text here</p>',
  treatment: '<p data-block-key="8bg6b">Treatment text here</p>',
  prevention: '<p data-block-key="6m4r2">Prevention text here</p>',
  surveillance_and_reporting: '<p data-block-key="zn81b">Surveillance and reporting text here</p>',
  related_links: relatedLinksMock,
  last_published_at: '2023-03-21T10:25:34.452098Z',
}
