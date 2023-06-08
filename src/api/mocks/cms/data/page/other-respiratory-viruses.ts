import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'
import { relatedLinksMock } from '../elements'

export const otherRespiratoryVirusesPageMock: PageResponse<PageType.Topic> = {
  id: 10,
  meta: {
    type: 'topic.TopicPage',
    detail_url: 'http://localhost/api/pages/10/',
    html_url: null,
    slug: 'other-respiratory-viruses',
    show_in_menus: false,
    seo_title: 'Other respiratory viruses',
    search_description: '',
    first_published_at: '2023-05-12T16:58:42.332020+01:00',
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
  title: 'Other respiratory viruses',
  page_description:
    '<p data-block-key="rjyu9">Data and insights from the UKHSA on other respiratory viruses. <a href="https://www.gov.uk/government/organisations/uk-health-security-agency\\">See the simple summary for England (opens in a new tab)</a>.</p>',
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
                      'Line chart comparing RSV hospital (ICU or HDU) admission rates of positive cases per 100,000 population reported through SARI Watch, England',
                    body: 'RSV SARI Watch surveillance has run from week 40 to week 20. In the 2022 to 2023 season onwards this was extended to run throughout the year, to allow for surveillance of out-of-season trends.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'RSV',
                          metric: 'weekly_overall_hospital_admissions_rate',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '',
                          geography: '',
                          geography_type: '',
                          label: '',
                          line_colour: 'BLUE',
                          line_type: 'SOLID',
                        },
                        id: 'b594dbf2-1455-4c08-ae52-6f63cf42f5da',
                      },
                    ],
                  },
                  id: '3bde7164-dba6-4758-acf2-6922c09b449d',
                },
              ],
            },
            id: 'c5fcf54c-1b0f-4a4e-9011-157e8c654454',
          },
          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'chart_card',
                  value: {
                    title: 'Bar chart comparing RSV hospital admissions count by week',
                    body: 'Weekly admissions rates of patients admitted to hospital with RSV as a weekly time series.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'RSV',
                          metric: 'weekly_hospital_admissions',
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
                        id: '1aaf26a0-4a87-491f-9359-e9a944a630f1',
                      },
                    ],
                  },
                  id: '95375882-5cb9-4e6b-8086-e333426ade6b',
                },
                {
                  type: 'chart_card',
                  value: {
                    title: 'Bar chart comparing weekly RSV ICU/HDU admissions count by week',
                    body: 'Weekly admission rates of patients admitted to ICU/HDU with RSV as a weekly time series.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'RSV',
                          metric: 'weekly_icuhdu_admissions',
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
                        id: 'ea2a0886-cd39-4ead-a3b8-74e827deb3c8',
                      },
                    ],
                  },
                  id: 'a7ff6a90-91ce-48d9-bedf-883638f118cc',
                },
              ],
            },
            id: 'aeca81ff-351f-4cf2-a677-71c38536ab8b',
          },
        ],
      },
      id: '6b9f501d-ca05-486d-b94b-346b8247fd19',
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
                    title: 'Line chart comparing Adenovirus test positivity count by week',
                    body: 'Weekly admissions rates of patients admitted to hospital with Adenovirus as a weekly time series.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Adenovirus',
                          metric: 'weekly_positivity',
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
                        id: '8cb7d64b-c954-42ee-9fdd-4d1a223ef945',
                      },
                    ],
                  },
                  id: '5444836e-61df-4e3c-b8e7-42d998207ced',
                },
                {
                  type: 'chart_card',
                  value: {
                    title: 'Line chart comparing Adenovirus test positivity count by week broken down by age',
                    body: 'Age breakdown of people testing positive for Adenovirus per 100,000 people.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Adenovirus',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '0_4',
                          geography: '',
                          geography_type: '',
                          label: '0 to 4 years',
                          line_colour: 'ORANGE',
                          line_type: 'SOLID',
                        },
                        id: '4a66b485-6650-4795-907c-abea344ea76d',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Adenovirus',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '5_14',
                          geography: '',
                          geography_type: '',
                          label: '5 to 14 years',
                          line_colour: 'ORANGE',
                          line_type: 'DASH',
                        },
                        id: '9315867e-cf51-4940-a3ad-e26028976933',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Adenovirus',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '15_44',
                          geography: '',
                          geography_type: '',
                          label: '15 to 44 years',
                          line_colour: 'GREEN',
                          line_type: 'SOLID',
                        },
                        id: '1285ba99-6987-4d03-8148-90cfd551b490',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Adenovirus',
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
                        id: 'b43595bd-5207-4cdf-a729-8bd6a6533a6d',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Adenovirus',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '65+',
                          geography: '',
                          geography_type: '',
                          label: '65 years and over',
                          line_colour: 'DARK_BLUE',
                          line_type: 'SOLID',
                        },
                        id: '79a3b4e2-5756-4ee0-a942-a04399b7ff17',
                      },
                    ],
                  },
                  id: '111b7f86-bd64-4ade-9a60-fb6b2392f112',
                },
              ],
            },
            id: '72d633e7-aeb8-4e8b-9fca-17291895d0db',
          },
          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'chart_card',
                  value: {
                    title: 'Line chart comparing hMPV test positivity count by week',
                    body: 'Weekly admissions rates of patients admitted to hospital with hMPV as a weekly time series.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'hMPV',
                          metric: 'weekly_positivity',
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
                        id: 'e669f88a-3ee4-4cbd-b07f-a3afc9a2e837',
                      },
                    ],
                  },
                  id: 'f7556f3b-29f8-4be8-989f-69e80b245477',
                },
                {
                  type: 'chart_card',
                  value: {
                    title: 'Line chart comparing hMPV test positivity count by week broken down by age',
                    body: 'Age breakdown of people testing positive for hMPV per 100,000 people.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'hMPV',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '0_4',
                          geography: '',
                          geography_type: '',
                          label: '0 to 4 years',
                          line_colour: 'ORANGE',
                          line_type: 'SOLID',
                        },
                        id: '6594aef4-ae6d-41af-b6b4-de6a56eda6cb',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'hMPV',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '5_14',
                          geography: '',
                          geography_type: '',
                          label: '5 to 14 years',
                          line_colour: 'ORANGE',
                          line_type: 'DASH',
                        },
                        id: 'b3e1456b-e9d3-486a-9625-eb7d0ff75920',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'hMPV',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '15_44',
                          geography: '',
                          geography_type: '',
                          label: '15 to 44 years',
                          line_colour: 'GREEN',
                          line_type: 'SOLID',
                        },
                        id: '8389118e-b484-42c4-8dc2-da4c6c2f6263',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'hMPV',
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
                        id: '71950df7-5ac9-498d-b9b9-6298f1d71d52',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'hMPV',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '65+',
                          geography: '',
                          geography_type: '',
                          label: '65 years and over',
                          line_colour: 'DARK_BLUE',
                          line_type: 'SOLID',
                        },
                        id: '71172c7d-305d-4510-838d-ff7aa5641de3',
                      },
                    ],
                  },
                  id: '840dabb8-ec04-404e-9083-da7551b614b5',
                },
              ],
            },
            id: 'db12ddb1-24e7-4283-afca-2930583ce1c9',
          },
          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'chart_card',
                  value: {
                    title: 'Line chart comparing Parainfluenza test positivity count by week',
                    body: 'Weekly admissions rates of patients admitted to hospital with Parainfluenza as a weekly time series.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Parainfluenza',
                          metric: 'weekly_positivity',
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
                        id: '7c6c22fc-af48-4377-9a30-333d18f927d3',
                      },
                    ],
                  },
                  id: '7d9ff06d-8376-4303-8205-b18953c66a28',
                },
                {
                  type: 'chart_card',
                  value: {
                    title: 'Line chart comparing Parainfluenza test positivity count by week broken down by age',
                    body: 'Age breakdown of people testing positive for Parainfluenza per 100,000 people.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Parainfluenza',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '0_4',
                          geography: '',
                          geography_type: '',
                          label: '0 to 4 years',
                          line_colour: 'ORANGE',
                          line_type: 'SOLID',
                        },
                        id: '93dbc8cc-680f-4e28-8aae-28a07f78370a',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Parainfluenza',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '5_14',
                          geography: '',
                          geography_type: '',
                          label: '5 to 14 years',
                          line_colour: 'ORANGE',
                          line_type: 'DASH',
                        },
                        id: 'd26c4969-8a80-4f98-88b7-d938ece14260',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Parainfluenza',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '15_44',
                          geography: '',
                          geography_type: '',
                          label: '15 to 44 years',
                          line_colour: 'GREEN',
                          line_type: 'SOLID',
                        },
                        id: '38c74599-c405-4eac-b371-47a534282ef8',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Parainfluenza',
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
                        id: 'e9ba8c89-383a-4ce3-a4e3-41f7acfe7aad',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Parainfluenza',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '65+',
                          geography: '',
                          geography_type: '',
                          label: '65 years and over',
                          line_colour: 'DARK_BLUE',
                          line_type: 'SOLID',
                        },
                        id: '550616ce-6ae2-4bf7-a38f-82fc2e8ce88b',
                      },
                    ],
                  },
                  id: 'db4509d8-8edc-41e8-b84f-2a89ed5f29f6',
                },
              ],
            },
            id: '3080a2bb-4cf0-4612-91d3-86defd1d7d43',
          },
          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'chart_card',
                  value: {
                    title: 'Line chart comparing Rhinovirus test positivity count by week',
                    body: 'Weekly admissions rates of patients admitted to hospital with Rhinovirus as a weekly time series.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Rhinovirus',
                          metric: 'weekly_positivity',
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
                        id: '31a1cb1a-69db-4bcd-b4e1-0906a8eacdea',
                      },
                    ],
                  },
                  id: '97f595ff-3dcd-46dd-900c-5143e7ace6e9',
                },
                {
                  type: 'chart_card',
                  value: {
                    title: 'Line chart comparing Rhinovirus test positivity count by week broken down by age',
                    body: 'Age breakdown of people testing positive for Rhinovirus per 100,000 people.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'Rhinovirus',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '0_4',
                          geography: '',
                          geography_type: '',
                          label: '0 to 4 years',
                          line_colour: 'ORANGE',
                          line_type: 'SOLID',
                        },
                        id: 'a4f18431-fd1b-462f-88b7-a78710d3303c',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Rhinovirus',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '5_14',
                          geography: '',
                          geography_type: '',
                          label: '5 to 14 years',
                          line_colour: 'ORANGE',
                          line_type: 'DASH',
                        },
                        id: '516177c2-b058-458a-b685-30b93d758e76',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Rhinovirus',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '15_44',
                          geography: '',
                          geography_type: '',
                          label: '15 to 44 years',
                          line_colour: 'GREEN',
                          line_type: 'SOLID',
                        },
                        id: '5f926e66-cb40-4c76-80e4-e989aa41aa8d',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Rhinovirus',
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
                        id: '1bc40a0e-ce93-481b-a853-7f9472de561a',
                      },
                      {
                        type: 'plot',
                        value: {
                          topic: 'Rhinovirus',
                          metric: 'weekly_positivity_by_age',
                          chart_type: 'line_multi_coloured',
                          date_from: null,
                          date_to: null,
                          stratum: '65+',
                          geography: '',
                          geography_type: '',
                          label: '65 years and over',
                          line_colour: 'DARK_BLUE',
                          line_type: 'SOLID',
                        },
                        id: 'c553c951-6825-4baf-bb4f-64b25a82184b',
                      },
                    ],
                  },
                  id: '5d73fc12-91cb-4bac-86eb-735836628600',
                },
              ],
            },
            id: '937ccc1b-9db4-425d-accf-558f7e72bf56',
          },
          {
            type: 'chart_row_card',
            value: {
              columns: [
                {
                  type: 'chart_card',
                  value: {
                    title: 'Line chart comparing RSV test positivity count by week',
                    body: 'Weekly admissions rates of patients admitted to hospital with RSV as a weekly time series.',
                    chart: [
                      {
                        type: 'plot',
                        value: {
                          topic: 'RSV',
                          metric: 'weekly_positivity',
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
                        id: '5f0bb3f1-8d8f-4950-855b-67deba69ece4',
                      },
                    ],
                  },
                  id: '1fe5aaf7-ebfe-44ad-9438-51bc6c2b1f8c',
                },
              ],
            },
            id: '9d5641b6-5ffa-4998-bf11-298049dc7a46',
          },
        ],
      },
      id: '0086c9ed-1b53-41f6-a6b4-4c2012925ed8',
    },
  ],
  symptoms: '<p data-block-key="v7la9">Symptoms text here</p>',
  transmission: '<p data-block-key="ldtik">Transmission text here</p>',
  treatment: '<p data-block-key="8bg6b">Treatment text here</p>',
  prevention: '<p data-block-key="6m4r2">Prevention text here</p>',
  surveillance_and_reporting: '<p data-block-key="zn81b">Surveillance and reporting text here</p>',
  related_links: relatedLinksMock,
  last_published_at: '2023-05-10T17:27:37.116337+01:00',
}
